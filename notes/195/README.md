sqlplus启动时会执行2个文件
  - $ORACLE_HOME/sqlplus/admin/glogin.sql
  - $ORACLE_HOME/sqlplus/admin/login.sql

* 他们的作用是一样的但是login.sql文件中命令的优先级会高于glogin.sql中
