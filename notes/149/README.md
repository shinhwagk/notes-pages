```c
#include <stdio.h>

#define MAXLINE 1000

int getline_(void);

void copy(void);

int max;
char longest[MAXLINE];
char line[MAXLINE];

void main()
{
  int len;

  extern int max;
  extern char longest[];

  max = 0;

  while ((len = getline_()) > 0)
  {
    if (len > max)
    {
      max = len;
      copy();
    }
  }

  if (max > 0)
  {
    printf("%s", longest);
  }
}

int getline_(void) //获得一行数据
{
  int c, i;
  extern char line[];
  for (i = 0; i < MAXLINE - 1 && (c = getchar()) != EOF && c != '\n'; ++i) //3个终端条件，如果长度超出MAXLINE，或者等于-1，或者等于换行符
  {
    line[i] = c;
  }

  if (c == '\n')
  {
    line[i] = c;
    ++i;
  }

  line[i] = '\n';
  return i;
}

void copy(void) //拷贝数组
{
  int i;
  extern char line[], longest[];
  i = 0;
  while ((longest[i] = line[i]) != '\0')
  {
    ++i;
  }
}
```
