```c
#include <stdio.h>

void main()
{
  char *a;
  char c[] = "abc";
  a = &c[0];
  printf("%c", *a); //a
  printf("%c", *(a+1)); //b
}
```
- 指针不能直接指向数组，但是他可以指向数组中的元素。然后通过指针方法数组中的元素
