```c
#include <stdio.h>

int strindex(char[], char[]);

void main()
{
    char str[] = "abccc";
    int i;
    i = strindex("abcytr", "cytr");
    printf("%d", i);
}

int strindex(char s[], char t[])
{
    int i, j, k;
    for (i = 0; s[i] != '\0'; i++)
    {
        for (j = i, k = 0; t[k] != '\0' && s[j] == t[k]; j++, k++)//s字符串第一个字符，在t中匹配到后，就着匹配t和s中第二个字符
            ;
        if (k > 0 && t[k] == '\0') //判断是否t字符串匹配到结尾，也就是完全是t字符串的一部分,如果没有匹配到结尾，说明这次循环匹配没有成功，接着循环
            return i;
    }
    return -1;
}
```
