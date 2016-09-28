- 当使用另一个select语句来生成结果中的某一列时，这个查询只能返回一行一列的值。这个种类的子查询称为标量子查询。
```sql
select 
  (select a from tab2 where tab2.a = tab1.a)
from tab1;
```
