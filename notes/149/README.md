```c
#include <stdio.h>

int test;
void abc(void);

void main()
{
    extern int test;
    abc();
    printf("%d", test);
}

void abc(void)
{
    extern int test;
    test = 2;
}
```
