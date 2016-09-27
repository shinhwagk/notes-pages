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
    for (i = 0; s[i] != '\0'; i++)//从s字符串第一个字符开始匹配
    {
        for (j = i, k = 0; t[k] != '\0' && s[j] == t[k]; j++, k++)//匹配到在t中某个位置的字符后，就接着匹配t和s中各自接下去的字符
            ;
        if (k > 0 && t[k] == '\0') //判断这一轮t字符串匹配完毕后是否配到t字符串的结尾，如果是，说明t字符串属于s字符串的一部分,如果没有匹配到结尾，说明这次循环匹配没有成功，接着从s字符串下一个字符开始匹配
            return i;
    }
    return -1;
}
```
