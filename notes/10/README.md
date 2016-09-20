#编译安装apache
###1. 下载apache,和需要的软件
```shell
wget http://mirrors.cnnic.cn/apache//httpd/httpd-2.4.12.tar.gz
wget wget http://mirror.bit.edu.cn/apache//apr/apr-1.5.1.tar.gz
wget http://mirror.bit.edu.cn/apache//apr/apr-util-1.5.4.tar.gz
wget ftp://ftp.csx.cam.ac.uk/pub/software/programming/pcre/pcre-8.35.tar.gz
yum install -y gcc gcc-c++
```
###2. 安装apr
```shell
# cd apr-1.5.1
# ./configure &amp;&amp; make &amp;&amp; make install
```
###3. 安装apr-util
```shell
# cd apr-util-1.5.4
# ./configure --prefix=/usr/local/apr-util --with-apr=/usr/local/apr/bin/apr-1-config &amp;&amp; make &amp;&amp; make install #使用刚刚编译安装的apr
```
###4. 安装pcre
```shell
# cd pcre-8.35
# ./configure &amp;&amp; make &amp;&amp; make install
```
###5. 安装apache
```shell
# ./configure --prefix=/usr/local/httpd --with-apr=/usr/local/apr --with-apr-util=/usr/local/apr-util &amp;&amp; make &amp;&amp; make install
```

###6. 启动apache
```shell
# APACHE_HOME/bin/httpd
```
