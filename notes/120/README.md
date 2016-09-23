```c
#include <stdio.h>

void main(){
  int c;

  c = getchar(); //当buffer为空时，前台表现为：输入。

  while(c != EOF){ //如果获得-1就退出，ctrl+c为 -1
    putchar(c); //打印
    c = getchar(); //取出buffer中的一个字符
  }
```
