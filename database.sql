-- create database named grm

CREATE TABLE "user" (
	"id" serial NOT NULL,
	"username" varchar(255) NOT NULL,
	"password" varchar(255) NOT NULL,
	CONSTRAINT "user_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "scores" (
	"id" SERIAL NOT NULL,
	"userId" integer NOT NULL,
	"assessmentBatchId" integer NOT NULL,
	"questionId" integer NOT NULL,
	"score" integer NOT NULL,
	"scoreQualitative" TEXT NOT NULL,
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
	"lastName" serial NOT NULL,
	"email" varchar(255) NOT NULL,
	"schoolId" integer NOT NULL,
	"permissionLevel" integer NOT NULL,
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

INSERT INTO questions ("name","measureName")
VALUES ('There is a purpose to my life','Balanced'),
('I understand why I do things','Balanced'),
('I can recognize my emotions and feelings ','Balanced'),
('I feel confident I can handle hard times.','Self-Confidence '),
('I am aware of my strengths','Self-Confidence '),
('I can solve my problems ','Understanding adaptability '),
('I come up with new ways to solve problems','Understanding adaptability '),
('I know how to handle problems ','Understanding adaptability '),
('I have many friends','Connection '),
('I know people I can speak to about my challenges','Connection '),
('I have family members I can talk to','Connection '),
('I have a friend I can trust ','Connection '),
('I have teachers I can talk to ','Connection '),
('The world is better with me in it','Contribution '),
('The things I do make a difference','Contribution '),
('I feel bad when others get hurt','Empathy'),
('I understand what others go through','Empathy'),
('I appreciate how others feel and think','Empathy'),
(E'I am patient with people who don\'t understand me','Empathy'),
('I can express myself around my friends','Self-Expression'),
('I can express myself around my family ','Self-Expression'),
('I can express myself around my adults ','Self-Expression'),
('I finish what I start','Self-Control'),
('I can change my surroundings','Self-Control'),
('I can change my behavior to match the situation','Self-Control'), 
('I try to find the good in every situation','Self-Control'),
('What would help build your resilience?','Qualitative');










