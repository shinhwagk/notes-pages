```c
#include <stdio.h>

#define MAXLINE 1000

int getline_(char line[], int maxline);

void copy(char to[], char from[]);

void main()
{
  int len;
  int max;
  char line[MAXLINE];
  char longest[MAXLINE];

  max = 0;

  while ((len = getline_(line, MAXLINE)) > 0)
  {
    if (len > max)
    {
      max = len;
      copy(longest, line);
    }
  }

  if (max > 0)
  {
    printf("%s", longest);
  }
}

int getline_(char s[], int lim) //获得一行数据
{
  int c, i;
  for (i = 0; i < lim - 1 && (c = getchar()) != EOF && c != '\n'; ++i) //3个终端条件，如果长度超出MAXLINE，或者等于-1，或者等于换行符
  {
    s[i] = c;
  }

  if (c == '\n')
  {
    s[i] = c;
    ++i;
  }

  s[i] = '\n';
  return i;
}

void copy(char to[], char from[])//拷贝数组
{
  int i;
  i = 0;
  while ((to[i] = from[i]) != '\0')
  {
    ++i;
  }
}

```
