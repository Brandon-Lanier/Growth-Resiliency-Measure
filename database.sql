-- create database named grm

CREATE TABLE "user" (
	"id" serial NOT NULL,
	"username" varchar(255) NOT NULL UNIQUE,
	"password" varchar(255) NOT NULL,
    "access_level" INT DEFAULT 0,
    "disabled" BOOLEAN NOT NULL DEFAULT FALSE,
	CONSTRAINT "user_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "scores" (
	"id" SERIAL NOT NULL,
	"userId" integer NOT NULL,
	"assessmentBatchId" integer NOT NULL,
	"questionId" integer NOT NULL,
	"score" integer,
	"scoreQualitative" TEXT,
	"date" DATE NOT NULL,
	CONSTRAINT "scores_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "questions" (
	"id" serial NOT NULL,
	"name" varchar(500) NOT NULL,
	"measureName" varchar(255) NOT NULL,
	CONSTRAINT "questions_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "assessmentBatches" (
	"id" SERIAL NOT NULL,
	"batchNumber" integer NOT NULL,
	"semesterNumber" integer NOT NULL,
	"fiscalYear" integer NOT NULL,
	"schoolId" integer NOT NULL,
	"startDate" DATE NOT NULL,
	"endDate" DATE NOT NULL,
	CONSTRAINT "assessmentBatches_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "students" (
	"id" serial NOT NULL,
	"userId" integer NOT NULL,
	"studentId" integer NOT NULL,
	"firstName" varchar(255) NOT NULL,
	"lastName" varchar(255) NOT NULL,
	"graduationYear" integer NOT NULL,
	"email" varchar(255) NOT NULL,
	"race" integer NOT NULL,
	"eip" BOOLEAN NOT NULL,
	"gender" integer NOT NULL,
	"lunchStatus" integer NOT NULL,
	"schoolId" integer NOT NULL,
	CONSTRAINT "students_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "admin" (
	"id" serial NOT NULL,
	"userId" integer NOT NULL,
	"firstName" varchar(255) NOT NULL,
	"lastName" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"schoolId" integer,
	CONSTRAINT "admin_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "schools" (
	"id" SERIAL NOT NULL,
	"name" varchar(255) NOT NULL,
	CONSTRAINT "schools_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "genders" (
	"id" SERIAL NOT NULL,
	"gender" varchar(255) NOT NULL,
	CONSTRAINT "genders_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "race" (
	"id" SERIAL NOT NULL,
	"race" varchar(255) NOT NULL,
	CONSTRAINT "race_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "lunchStatus" (
	"id" serial NOT NULL,
	"status" varchar(255) NOT NULL,
	CONSTRAINT "lunchStatus_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);




ALTER TABLE "scores" ADD CONSTRAINT "scores_fk0" FOREIGN KEY ("userId") REFERENCES "user"("id");
ALTER TABLE "scores" ADD CONSTRAINT "scores_fk1" FOREIGN KEY ("assessmentBatchId") REFERENCES "assessmentBatches"("id");
ALTER TABLE "scores" ADD CONSTRAINT "scores_fk2" FOREIGN KEY ("questionId") REFERENCES "questions"("id");

ALTER TABLE "assessmentBatches" ADD CONSTRAINT "assessmentBatches_fk0" FOREIGN KEY ("schoolId") REFERENCES "schools"("id");

ALTER TABLE "students" ADD CONSTRAINT "students_fk0" FOREIGN KEY ("userId") REFERENCES "user"("id");
ALTER TABLE "students" ADD CONSTRAINT "students_fk1" FOREIGN KEY ("race") REFERENCES "race"("id");
ALTER TABLE "students" ADD CONSTRAINT "students_fk2" FOREIGN KEY ("gender") REFERENCES "genders"("id");
ALTER TABLE "students" ADD CONSTRAINT "students_fk3" FOREIGN KEY ("lunchStatus") REFERENCES "lunchStatus"("id");
ALTER TABLE "students" ADD CONSTRAINT "students_fk4" FOREIGN KEY ("schoolId") REFERENCES "schools"("id");

ALTER TABLE "admin" ADD CONSTRAINT "admin_fk0" FOREIGN KEY ("userId") REFERENCES "user"("id");
ALTER TABLE "admin" ADD CONSTRAINT "admin_fk1" FOREIGN KEY ("schoolId") REFERENCES "schools"("id");
ALTER TABLE "admin" ADD CONSTRAINT "admin_fk2" FOREIGN KEY ("permissionLevel") REFERENCES "schools"("id");


INSERT INTO questions ("name","measureName")
VALUES ('There is a purpose to my life.','Balanced'),
('I understand why I do things.','Balanced'),
('I can recognize my emotions and feelings.','Balanced'),
('I feel confident I can handle hard times.','Self-Confidence '),
('I am aware of my strengths.','Self-Confidence '),
('I can solve my problems.','Understanding adaptability '),
('I come up with new ways to solve problems.','Understanding adaptability '),
('I know how to handle problems.','Understanding adaptability '),
('I have many friends.','Connection '),
('I know people I can speak to about my challenges.','Connection '),
('I have family members I can talk to.','Connection '),
('I have a friend I can trust.','Connection '),
('I have teachers I can talk to.','Connection '),
('The world is better with me in it.','Contribution '),
('The things I do make a difference.','Contribution '),
('I feel bad when others get hurt.','Empathy'),
('I understand what others go through.','Empathy'),
('I appreciate how others feel and think.','Empathy'),
(E'I am patient with people who don\'t understand me.','Empathy'),
('I can express myself around my friends.','Self-Expression'),
('I can express myself around my family.','Self-Expression'),
('I can express myself around my adults.','Self-Expression'),
('I finish what I start.','Self-Control'),
('I can change my surroundings.','Self-Control'),
('I can change my behavior to match the situation.','Self-Control'), 
('I try to find the good in every situation.','Self-Control'),
('What would help build your resilience?','Qualitative');

INSERT INTO "assessmentBatches" ("batchNumber","semesterNumber","fiscalYear","schoolId","startDate","endDate")
VALUES (1,1,2022,1,'2022-01-01','2022-01-07'),(2,1,2022,1,'2022-04-01','2022-04-13');

INSERT INTO "genders"("gender")
VALUES
(E'Female'),
(E'Male'),
(E'Non-Binary'),
(E'Not Listed'),
(E'Prefer Not To Say');

INSERT INTO "race"("race")
VALUES
(E'Hispanic'),
(E'Asian'),
(E'Caucasian'),
(E'Black'),
(E'Mixed');

INSERT INTO "lunchStatus"("status")
VALUES
(E'na'),
(E'free');
(E'reduced');

--DROP TABLE "admin";
--DROP TABLE "scores";
--DROP TABLE "students";
--DROP TABLE "user";
--DROP TABLE "assessmentBatches";
--DROP TABLE "genders";
--DROP TABLE "race";
--DROP TABLE "schools";
--DROP TABLE "questions";
--DROP TABLE "lunchStatus";


-- Execute following three Insert statements to fill in a semesters worth of dummy
-- data along with proper assessment batch and high school id. 

INSERT INTO "schools" ("name")
VALUES ('Adams High School');


INSERT INTO "assessmentBatches" ("batchNumber","semesterNumber","fiscalYear","schoolId","startDate","endDate")
VALUES (1,1,2022,1,'2022-01-01','2022-01-07'),(2,1,2022,1,'2022-04-01','2022-04-13');


INSERT INTO scores ("userId","assessmentBatchId","questionId","score","scoreQualitative","date")
VALUES 
(1,1,1,5,NULL,'2022-01-03'),
(1,1,2,2,NULL,'2022-01-03'),
(1,1,3,3,NULL,'2022-01-03'),
(1,1,4,4,NULL,'2022-01-03'),
(1,1,5,4,NULL,'2022-01-03'),
(1,1,6,1,NULL,'2022-01-03'),
(1,1,7,1,NULL,'2022-01-03'),
(1,1,8,3,NULL,'2022-01-03'),
(1,1,9,5,NULL,'2022-01-03'),
(1,1,10,4,NULL,'2022-01-03'),
(1,1,11,1,NULL,'2022-01-03'),
(1,1,12,1,NULL,'2022-01-03'),
(1,1,13,3,NULL,'2022-01-03'),
(1,1,14,3,NULL,'2022-01-03'),
(1,1,15,5,NULL,'2022-01-03'),
(1,1,16,1,NULL,'2022-01-03'),
(1,1,17,1,NULL,'2022-01-03'),
(1,1,18,1,NULL,'2022-01-03'),
(1,1,19,5,NULL,'2022-01-03'),
(1,1,20,2,NULL,'2022-01-03'),
(1,1,21,4,NULL,'2022-01-03'),
(1,1,22,1,NULL,'2022-01-03'),
(1,1,23,2,NULL,'2022-01-03'),
(1,1,24,4,NULL,'2022-01-03'),
(1,1,25,1,NULL,'2022-01-03'),
(1,1,26,3,NULL,'2022-01-03'),
(1,1,27,0,'Get more sleep ','2022-01-03'),
(2,1,1,4,NULL,'2022-01-03'),
(2,1,2,1,NULL,'2022-01-03'),
(2,1,3,5,NULL,'2022-01-03'),
(2,1,4,2,NULL,'2022-01-03'),
(2,1,5,3,NULL,'2022-01-03'),
(2,1,6,1,NULL,'2022-01-03'),
(2,1,7,3,NULL,'2022-01-03'),
(2,1,8,3,NULL,'2022-01-03'),
(2,1,9,4,NULL,'2022-01-03'),
(2,1,10,5,NULL,'2022-01-03'),
(2,1,11,2,NULL,'2022-01-03'),
(2,1,12,2,NULL,'2022-01-03'),
(2,1,13,4,NULL,'2022-01-03'),
(2,1,14,5,NULL,'2022-01-03'),
(2,1,15,1,NULL,'2022-01-03'),
(2,1,16,1,NULL,'2022-01-03'),
(2,1,17,1,NULL,'2022-01-03'),
(2,1,18,1,NULL,'2022-01-03'),
(2,1,19,2,NULL,'2022-01-03'),
(2,1,20,4,NULL,'2022-01-03'),
(2,1,21,5,NULL,'2022-01-03'),
(2,1,22,3,NULL,'2022-01-03'),
(2,1,23,1,NULL,'2022-01-03'),
(2,1,24,1,NULL,'2022-01-03'),
(2,1,25,3,NULL,'2022-01-03'),
(2,1,26,2,NULL,'2022-01-03'),
(2,1,27,0,'Study More','2022-01-03'),
(3,1,1,1,NULL,'2022-01-03'),
(3,1,2,5,NULL,'2022-01-03'),
(3,1,3,4,NULL,'2022-01-03'),
(3,1,4,1,NULL,'2022-01-03'),
(3,1,5,5,NULL,'2022-01-03'),
(3,1,6,2,NULL,'2022-01-03'),
(3,1,7,4,NULL,'2022-01-03'),
(3,1,8,4,NULL,'2022-01-03'),
(3,1,9,4,NULL,'2022-01-03'),
(3,1,10,1,NULL,'2022-01-03'),
(3,1,11,5,NULL,'2022-01-03'),
(3,1,12,3,NULL,'2022-01-03'),
(3,1,13,3,NULL,'2022-01-03'),
(3,1,14,5,NULL,'2022-01-03'),
(3,1,15,2,NULL,'2022-01-03'),
(3,1,16,1,NULL,'2022-01-03'),
(3,1,17,2,NULL,'2022-01-03'),
(3,1,18,1,NULL,'2022-01-03'),
(3,1,19,3,NULL,'2022-01-03'),
(3,1,20,4,NULL,'2022-01-03'),
(3,1,21,1,NULL,'2022-01-03'),
(3,1,22,5,NULL,'2022-01-03'),
(3,1,23,4,NULL,'2022-01-03'),
(3,1,24,1,NULL,'2022-01-03'),
(3,1,25,4,NULL,'2022-01-03'),
(3,1,26,1,NULL,'2022-01-03'),
(3,1,27,0,'Eat more food','2022-01-03'),
(4,1,1,4,NULL,'2022-01-03'),
(4,1,2,3,NULL,'2022-01-03'),
(4,1,3,3,NULL,'2022-01-03'),
(4,1,4,5,NULL,'2022-01-03'),
(4,1,5,4,NULL,'2022-01-03'),
(4,1,6,3,NULL,'2022-01-03'),
(4,1,7,3,NULL,'2022-01-03'),
(4,1,8,1,NULL,'2022-01-03'),
(4,1,9,2,NULL,'2022-01-03'),
(4,1,10,2,NULL,'2022-01-03'),
(4,1,11,3,NULL,'2022-01-03'),
(4,1,12,5,NULL,'2022-01-03'),
(4,1,13,4,NULL,'2022-01-03'),
(4,1,14,3,NULL,'2022-01-03'),
(4,1,15,5,NULL,'2022-01-03'),
(4,1,16,3,NULL,'2022-01-03'),
(4,1,17,5,NULL,'2022-01-03'),
(4,1,18,1,NULL,'2022-01-03'),
(4,1,19,2,NULL,'2022-01-03'),
(4,1,20,1,NULL,'2022-01-03'),
(4,1,21,3,NULL,'2022-01-03'),
(4,1,22,4,NULL,'2022-01-03'),
(4,1,23,1,NULL,'2022-01-03'),
(4,1,24,5,NULL,'2022-01-03'),
(4,1,25,4,NULL,'2022-01-03'),
(4,1,26,1,NULL,'2022-01-03'),
(4,1,27,0,'Study','2022-01-03'),
(1,2,1,3,NULL,'2022-04-12'),
(1,2,2,3,NULL,'2022-04-12'),
(1,2,3,5,NULL,'2022-04-12'),
(1,2,4,5,NULL,'2022-04-12'),
(1,2,5,1,NULL,'2022-04-12'),
(1,2,6,4,NULL,'2022-04-12'),
(1,2,7,4,NULL,'2022-04-12'),
(1,2,8,3,NULL,'2022-04-12'),
(1,2,9,4,NULL,'2022-04-12'),
(1,2,10,5,NULL,'2022-04-12'),
(1,2,11,4,NULL,'2022-04-12'),
(1,2,12,3,NULL,'2022-04-12'),
(1,2,13,1,NULL,'2022-04-12'),
(1,2,14,3,NULL,'2022-04-12'),
(1,2,15,4,NULL,'2022-04-12'),
(1,2,16,5,NULL,'2022-04-12'),
(1,2,17,2,NULL,'2022-04-12'),
(1,2,18,1,NULL,'2022-04-12'),
(1,2,19,5,NULL,'2022-04-12'),
(1,2,20,2,NULL,'2022-04-12'),
(1,2,21,5,NULL,'2022-04-12'),
(1,2,22,1,NULL,'2022-04-12'),
(1,2,23,3,NULL,'2022-04-12'),
(1,2,24,4,NULL,'2022-04-12'),
(1,2,25,1,NULL,'2022-04-12'),
(1,2,26,3,NULL,'2022-04-12'),
(1,2,27,0,'Coffe Time ','2022-04-12'),
(2,2,1,4,NULL,'2022-04-12'),
(2,2,2,1,NULL,'2022-04-12'),
(2,2,3,3,NULL,'2022-04-12'),
(2,2,4,5,NULL,'2022-04-12'),
(2,2,5,3,NULL,'2022-04-12'),
(2,2,6,1,NULL,'2022-04-12'),
(2,2,7,4,NULL,'2022-04-12'),
(2,2,8,4,NULL,'2022-04-12'),
(2,2,9,2,NULL,'2022-04-12'),
(2,2,10,3,NULL,'2022-04-12'),
(2,2,11,2,NULL,'2022-04-12'),
(2,2,12,2,NULL,'2022-04-12'),
(2,2,13,4,NULL,'2022-04-12'),
(2,2,14,3,NULL,'2022-04-12'),
(2,2,15,2,NULL,'2022-04-12'),
(2,2,16,5,NULL,'2022-04-12'),
(2,2,17,2,NULL,'2022-04-12'),
(2,2,18,4,NULL,'2022-04-12'),
(2,2,19,2,NULL,'2022-04-12'),
(2,2,20,5,NULL,'2022-04-12'),
(2,2,21,5,NULL,'2022-04-12'),
(2,2,22,3,NULL,'2022-04-12'),
(2,2,23,1,NULL,'2022-04-12'),
(2,2,24,2,NULL,'2022-04-12'),
(2,2,25,4,NULL,'2022-04-12'),
(2,2,26,5,NULL,'2022-04-12'),
(2,2,27,0,'Hello World' ,'2022-04-12'),
(3,2,1,5,NULL,'2022-04-12'),
(3,2,2,5,NULL,'2022-04-12'),
(3,2,3,5,NULL,'2022-04-12'),
(3,2,4,4,NULL,'2022-04-12'),
(3,2,5,2,NULL,'2022-04-12'),
(3,2,6,5,NULL,'2022-04-12'),
(3,2,7,3,NULL,'2022-04-12'),
(3,2,8,4,NULL,'2022-04-12'),
(3,2,9,5,NULL,'2022-04-12'),
(3,2,10,1,NULL,'2022-04-12'),
(3,2,11,1,NULL,'2022-04-12'),
(3,2,12,4,NULL,'2022-04-12'),
(3,2,13,3,NULL,'2022-04-12'),
(3,2,14,5,NULL,'2022-04-12'),
(3,2,15,5,NULL,'2022-04-12'),
(3,2,16,3,NULL,'2022-04-12'),
(3,2,17,3,NULL,'2022-04-12'),
(3,2,18,2,NULL,'2022-04-12'),
(3,2,19,2,NULL,'2022-04-12'),
(3,2,20,4,NULL,'2022-04-12'),
(3,2,21,4,NULL,'2022-04-12'),
(3,2,22,5,NULL,'2022-04-12'),
(3,2,23,4,NULL,'2022-04-12'),
(3,2,24,2,NULL,'2022-04-12'),
(3,2,25,5,NULL,'2022-04-12'),
(3,2,26,4,NULL,'2022-04-12'),
(3,2,27,0,'asdf','2022-04-12'),
(4,2,1,2,NULL,'2022-04-12'),
(4,2,2,5,NULL,'2022-04-12'),
(4,2,3,5,NULL,'2022-04-12'),
(4,2,4,4,NULL,'2022-04-12'),
(4,2,5,2,NULL,'2022-04-12'),
(4,2,6,3,NULL,'2022-04-12'),
(4,2,7,4,NULL,'2022-04-12'),
(4,2,8,3,NULL,'2022-04-12'),
(4,2,9,2,NULL,'2022-04-12'),
(4,2,10,3,NULL,'2022-04-12'),
(4,2,11,1,NULL,'2022-04-12'),
(4,2,12,3,NULL,'2022-04-12'),
(4,2,13,2,NULL,'2022-04-12'),
(4,2,14,4,NULL,'2022-04-12'),
(4,2,15,1,NULL,'2022-04-12'),
(4,2,16,2,NULL,'2022-04-12'),
(4,2,17,5,NULL,'2022-04-12'),
(4,2,18,2,NULL,'2022-04-12'),
(4,2,19,1,NULL,'2022-04-12'),
(4,2,20,5,NULL,'2022-04-12'),
(4,2,21,5,NULL,'2022-04-12'),
(4,2,22,4,NULL,'2022-04-12'),
(4,2,23,1,NULL,'2022-04-12'),
(4,2,24,3,NULL,'2022-04-12'),
(4,2,25,3,NULL,'2022-04-12'),
(4,2,26,5,NULL,'2022-04-12'),
(4,2,27,0,'Second Test','2022-04-12');





INSERT INTO "students" ("userId", "studentId", "firstName", "lastName", "graduationYear", "email", "race", "eip", "gender", "lunchStatus", "schoolId") 
VALUES ("1047", "3022", "Timmy", "Trumpet" , 2023, timmay@trumpet.org, "1", false, "1", false, "1022", "2");
