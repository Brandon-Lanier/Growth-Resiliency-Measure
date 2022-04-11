-- create database named grm

CREATE TABLE "users" (
	"id" serial NOT NULL,
	"username" varchar(255) NOT NULL,
	"password" varchar(255) NOT NULL,
	CONSTRAINT "users_pk" PRIMARY KEY ("id")
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




ALTER TABLE "scores" ADD CONSTRAINT "scores_fk0" FOREIGN KEY ("userId") REFERENCES "users"("id");
ALTER TABLE "scores" ADD CONSTRAINT "scores_fk1" FOREIGN KEY ("assessmentBatchId") REFERENCES "assessmentBatches"("id");
ALTER TABLE "scores" ADD CONSTRAINT "scores_fk2" FOREIGN KEY ("questionId") REFERENCES "questions"("id");

ALTER TABLE "assessmentBatches" ADD CONSTRAINT "assessmentBatches_fk0" FOREIGN KEY ("schoolId") REFERENCES "schools"("id");

ALTER TABLE "students" ADD CONSTRAINT "students_fk0" FOREIGN KEY ("userId") REFERENCES "users"("id");
ALTER TABLE "students" ADD CONSTRAINT "students_fk1" FOREIGN KEY ("race") REFERENCES "race"("id");
ALTER TABLE "students" ADD CONSTRAINT "students_fk2" FOREIGN KEY ("gender") REFERENCES "genders"("id");
ALTER TABLE "students" ADD CONSTRAINT "students_fk3" FOREIGN KEY ("lunchStatus") REFERENCES "lunchStatus"("id");
ALTER TABLE "students" ADD CONSTRAINT "students_fk4" FOREIGN KEY ("schoolId") REFERENCES "schools"("id");

ALTER TABLE "admin" ADD CONSTRAINT "admin_fk0" FOREIGN KEY ("userId") REFERENCES "users"("id");
ALTER TABLE "admin" ADD CONSTRAINT "admin_fk1" FOREIGN KEY ("schoolId") REFERENCES "schools"("id");
ALTER TABLE "admin" ADD CONSTRAINT "admin_fk2" FOREIGN KEY ("permissionLevel") REFERENCES "schools"("id");



--DROP TABLE "admin";
--DROP TABLE "scores";
--DROP TABLE "students";
--DROP TABLE "users";
--DROP TABLE "assessmentBatches";
--DROP TABLE "genders";
--DROP TABLE "race";
--DROP TABLE "schools";
--DROP TABLE "questions";
--DROP TABLE "lunchStatus";












