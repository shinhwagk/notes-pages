```sql
update (select a.a,b.a new_a
          from tab1 a,tab2 b
          where a.id = b.id)
set a = new_a;
```
