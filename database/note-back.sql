create database note_back;

drop table labels;
CREATE TABLE labels (
  data json not null,
  name varchar(20) GENERATED ALWAYS AS (JSON_UNQUOTE(data->'$.name')) VIRTUAL NOT NULL,
	edge text GENERATED ALWAYS AS (JSON_UNQUOTE(data->'$.edge')) VIRTUAL NOT NULL,
	notes text GENERATED ALWAYS AS (JSON_UNQUOTE(data->'$.notes')) VIRTUAL NOT NULL,
  UNIQUE KEY name (name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
-- {"edge": ["install"], "name": "oracle", "notes": [1, 2, 3]}

create table notes(
	id int primary key AUTO_INCREMENT,
	category varchar(10) -- concepts | command
);

create table notedocuments(
	note_id int not null,
	document text
)



--test
 


select from labelsnet n,labeldocs d,labels s where n.label_id = d.label_id

select label_id_edge 
from labelsnet 
where label_id_center in (1,2) 
group by label_id_edge
having count(*) > 1;