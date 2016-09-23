```c
#include <stdio.h>

main(){
  int fahr, celsiue;
  int lower, upper, step;

  lower = 0;
  upper = 300;
  step  = 20;

  fahr = lower;

  while(fahr <= upper){
    celsiue = 5 * (fahr - 32) / 9;
    printf("%d\t%d\n" ,fahr,celsiue);
    fahr = fahr + step;
  }
}
```
