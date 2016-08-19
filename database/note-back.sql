create database note_back;

create table labels(
	name varchar(20) primary key
);

drop table labelsnets;
create table labelsnets(
	center varchar(20) not null,
	edge varchar(20) not null,
	primary key (center,edge)
);

create table labelnotes(
	label_name varchar(20) not null,
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

insert into labelsnets values("oracle","install");
insert into labelsnets values("install","oracle");


select from labelsnet n,labeldocs d,labels s where n.label_id = d.label_id

select label_id_edge 
from labelsnet 
where label_id_center in (1,2) 
group by label_id_edge
having count(*) > 1;