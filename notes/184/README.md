```c
#include <stdio.h>
#include <math.h>

void main()
{
    int c = 0;
    switch(c){
        case 1:
            printf("1");
            break;
        case 2:
            printf("2");
            break;
        default:
            printf("default");
    }
}
```
- 默认情况下一个case被命中会接着匹配下面的case，除非显示的加入break跳出.
