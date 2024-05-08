/*
  Warnings:

  - You are about to drop the column `Email` on the `Student` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Student" (
    "studentID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userID" INTEGER NOT NULL,
    "name" TEXT,
    "age" INTEGER,
    "Phone" TEXT,
    "AboutMe" TEXT,
    "Hobbies" TEXT,
    "University" TEXT,
    CONSTRAINT "Student_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User" ("userID") ON DELETE NO ACTION ON UPDATE NO ACTION
);
INSERT INTO "new_Student" ("AboutMe", "Hobbies", "Phone", "University", "age", "name", "studentID", "userID") SELECT "AboutMe", "Hobbies", "Phone", "University", "age", "name", "studentID", "userID" FROM "Student";
DROP TABLE "Student";
ALTER TABLE "new_Student" RENAME TO "Student";
CREATE UNIQUE INDEX "Student_userID_key" ON "Student"("userID");
CREATE UNIQUE INDEX "Student_age_key" ON "Student"("age");
CREATE UNIQUE INDEX "Student_Phone_key" ON "Student"("Phone");
CREATE INDEX "Student_userID_idx" ON "Student"("userID");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE INDEX "Application_studentID_idx" ON "Application"("studentID");

-- CreateIndex
CREATE INDEX "Application_jobID_idx" ON "Application"("jobID");

-- CreateIndex
CREATE INDEX "Employer_userID_idx" ON "Employer"("userID");

-- CreateIndex
CREATE INDEX "Job_employerID_idx" ON "Job"("employerID");
