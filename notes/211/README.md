```sql
insert [all | first] 
  when col > 100 then 
    into tab1
  when col > 300 then 
    into tab2
  else
    into tab3
select * from tab;
```
- all 查询中的每一条记录会匹配所有的条件，只要满足就插入，不管之前是否匹配中。
- fisrt 匹配中条件中一个后，就不再匹配后面的条件。
