create database note_back;

create table labels(
	id int primary key AUTO_INCREMENT,
	name varchar(20)
);

create table labelsnet(
	label_id_center int not null,
	label_id_edge int not null
);

create table labelnotes(
	label_id int not null,
	note_id int not null
);

create table notes(
	id int primary key AUTO_INCREMENT,
	category varchar(10) -- concepts | command
);

create table notedocuments(
	note_id int not null,
	document text
)



--test
insert into labels(name) values("oracle");
insert into labels(name) values("install");

insert into labelsnet values(1,2);
insert into labelsnet values(2,1);


select from labelsnet n,labeldocs d,labels s where n.label_id = d.label_id

select label_id_edge 
from labelsnet 
where label_id_center in (1,2) 
group by label_id_edge
having count(*) > 1;