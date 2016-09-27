```c
#include <stdio.h>

void main()
{
    int c = 10;
    do
    {
        c -= 1;
    } while (c >= 1);
}
```
- 先执行do中的语句 然后求while 表达式，如果为真，再执行do中的语句
