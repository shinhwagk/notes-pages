```sql
update tab
set (a,b) = (select a ,b from tab2 where tab2.id = tab.id);
```
