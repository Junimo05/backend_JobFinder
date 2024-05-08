/*
  Warnings:

  - You are about to drop the `Student` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `studentID` on the `Application` table. All the data in the column will be lost.
  - Added the required column `employeeID` to the `Application` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Student_userID_idx";

-- DropIndex
DROP INDEX "Student_Phone_key";

-- DropIndex
DROP INDEX "Student_age_key";

-- DropIndex
DROP INDEX "Student_userID_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Student";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Employee" (
    "employeeID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userID" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "Phone" TEXT,
    "Email" TEXT NOT NULL,
    "AboutMe" TEXT,
    "Hobbies" TEXT,
    CONSTRAINT "Employee_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User" ("userID") ON DELETE NO ACTION ON UPDATE NO ACTION
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Application" (
    "appID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "employeeID" INTEGER NOT NULL,
    "jobID" INTEGER NOT NULL,
    "Description" TEXT NOT NULL,
    "applyDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "Status" TEXT NOT NULL DEFAULT 'Waiting',
    CONSTRAINT "Application_employeeID_fkey" FOREIGN KEY ("employeeID") REFERENCES "Employee" ("employeeID") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Application_jobID_fkey" FOREIGN KEY ("jobID") REFERENCES "Job" ("jobID") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Application" ("Description", "Status", "appID", "applyDate", "jobID") SELECT "Description", "Status", "appID", "applyDate", "jobID" FROM "Application";
DROP TABLE "Application";
ALTER TABLE "new_Application" RENAME TO "Application";
CREATE UNIQUE INDEX "Application_employeeID_key" ON "Application"("employeeID");
CREATE INDEX "Application_employeeID_idx" ON "Application"("employeeID");
CREATE INDEX "Application_jobID_idx" ON "Application"("jobID");
CREATE TABLE "new_Job" (
    "jobID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "groupID" INTEGER,
    "employerID" INTEGER NOT NULL,
    "JobTitle" TEXT NOT NULL,
    "Location" TEXT NOT NULL,
    "Description" TEXT NOT NULL,
    "Requirements" TEXT NOT NULL,
    "Persons" INTEGER NOT NULL,
    "SalaryRange" TEXT NOT NULL,
    "PostDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "CloseDate" DATETIME NOT NULL,
    "Deleted" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "Job_employerID_fkey" FOREIGN KEY ("employerID") REFERENCES "Employer" ("employerID") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Job_groupID_fkey" FOREIGN KEY ("groupID") REFERENCES "JobGroup" ("groupID") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Job" ("CloseDate", "Deleted", "Description", "JobTitle", "Location", "Persons", "PostDate", "Requirements", "SalaryRange", "employerID", "groupID", "jobID") SELECT "CloseDate", "Deleted", "Description", "JobTitle", "Location", "Persons", "PostDate", "Requirements", "SalaryRange", "employerID", "groupID", "jobID" FROM "Job";
DROP TABLE "Job";
ALTER TABLE "new_Job" RENAME TO "Job";
CREATE UNIQUE INDEX "Job_groupID_key" ON "Job"("groupID");
CREATE UNIQUE INDEX "Job_employerID_key" ON "Job"("employerID");
CREATE INDEX "Job_employerID_idx" ON "Job"("employerID");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "Employee_userID_key" ON "Employee"("userID");

-- CreateIndex
CREATE UNIQUE INDEX "Employee_age_key" ON "Employee"("age");

-- CreateIndex
CREATE UNIQUE INDEX "Employee_Phone_key" ON "Employee"("Phone");

-- CreateIndex
CREATE UNIQUE INDEX "Employee_Email_key" ON "Employee"("Email");

-- CreateIndex
CREATE INDEX "Employee_userID_idx" ON "Employee"("userID");
