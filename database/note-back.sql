create database note_back;

drop table labels;
CREATE TABLE labels (
  data json not null
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
-- {"edge": ["install"], "name": "oracle", "notes": [1, 2, 3]}
drop view vlabels;
create view vlabels
as
select 
JSON_UNQUOTE(data->'$.name') name,
JSON_UNQUOTE(data->'$.edge') edge,
JSON_UNQUOTE(data->'$.notes') notes,
data
from labels;

/*
 ****************
*/
drop table notes;
create table notes(
	id int primary key AUTO_INCREMENT,
	data json not null
);

drop view vnotes;
create view vnotes 
as 
select 
	id,
	JSON_UNQUOTE(data->'$.status') status,
	JSON_UNQUOTE(data->'$.category') category,
	json_insert(data,'$.id',id) data 
from notes;

--eg
insert into notes(data) values('{"category":"command","status":1}');
insert into notes(data) values('{"category":"command","status":1}');
insert into notes(data) values('{"category":"concept","status":1}');
insert into notes(data) values('{"category":"concept","status":1}');
commit;

drop table note_documents;
create table note_documents(
	id int primary key AUTO_INCREMENT,
	note_id int not null,
	title text
);

drop table note_commands;
create table note_commands(
	id int primary key AUTO_INCREMENT,
	note_id int not null,
	content_01 text,
	content_02 text,
	createdate,
	updatedata,
	file_id int,
	document_id int
);

drop table note_files;
create table note_files(
	id int primary key AUTO_INCREMENT,
	note_id int not null,
)



--test
 


select from labelsnet n,labeldocs d,labels s where n.label_id = d.label_id

select label_id_edge 
from labelsnet 
where label_id_center in (1,2) 
group by label_id_edge
having count(*) > 1;