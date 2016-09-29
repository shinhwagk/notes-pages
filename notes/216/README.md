```sql
merge int tab1 t1
using (select id,a,b,c from tab2) t2
on (t1.id = t2.id)
when matched then
  update set t1.a = t2.a where t1.a = "a"
  delete where (t2.c > 111)
when not matched then
  insert (t1.a,t2.b) values(t2.a,t2.b)
  where (t2.c < 111);
```
