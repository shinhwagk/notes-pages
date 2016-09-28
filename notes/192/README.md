```c
#include <stdio.h>

void main()
{
  int c = 1;
  int *p;//声明一个指针变量，可以指向int
  p = &c;//把c的地址赋给指针p
  printf("%d", *p);//打印p指针指向的对象*p
}
```
