/*
  Warnings:

  - Added the required column `Description` to the `Application` table without a default value. This is not possible if the table is not empty.
  - Added the required column `groupID` to the `Job` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "JobGroup" (
    "groupID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "jobGroupTitle" TEXT NOT NULL,
    "Description" TEXT NOT NULL
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Application" (
    "appID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "studentID" INTEGER NOT NULL,
    "jobID" INTEGER NOT NULL,
    "Description" TEXT NOT NULL,
    "applyDate" DATETIME NOT NULL,
    "Status" TEXT NOT NULL DEFAULT 'Waiting',
    CONSTRAINT "Application_studentID_fkey" FOREIGN KEY ("studentID") REFERENCES "Student" ("studentID") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Application_jobID_fkey" FOREIGN KEY ("jobID") REFERENCES "Job" ("jobID") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Application" ("Status", "appID", "applyDate", "jobID", "studentID") SELECT "Status", "appID", "applyDate", "jobID", "studentID" FROM "Application";
DROP TABLE "Application";
ALTER TABLE "new_Application" RENAME TO "Application";
CREATE UNIQUE INDEX "Application_studentID_key" ON "Application"("studentID");
CREATE INDEX "Application_studentID_idx" ON "Application"("studentID");
CREATE INDEX "Application_jobID_idx" ON "Application"("jobID");
CREATE TABLE "new_Job" (
    "jobID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "groupID" INTEGER NOT NULL,
    "employerID" INTEGER NOT NULL,
    "JobTitle" TEXT NOT NULL,
    "Location" TEXT NOT NULL,
    "Description" TEXT NOT NULL,
    "Requirements" TEXT NOT NULL,
    "Persons" INTEGER NOT NULL,
    "SalaryRange" TEXT NOT NULL,
    "PostDate" DATETIME NOT NULL,
    "CloseDate" DATETIME NOT NULL,
    "Deleted" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "Job_employerID_fkey" FOREIGN KEY ("employerID") REFERENCES "Employer" ("employerID") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Job_groupID_fkey" FOREIGN KEY ("groupID") REFERENCES "JobGroup" ("groupID") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Job" ("CloseDate", "Description", "JobTitle", "Location", "Persons", "PostDate", "Requirements", "SalaryRange", "employerID", "jobID") SELECT "CloseDate", "Description", "JobTitle", "Location", "Persons", "PostDate", "Requirements", "SalaryRange", "employerID", "jobID" FROM "Job";
DROP TABLE "Job";
ALTER TABLE "new_Job" RENAME TO "Job";
CREATE UNIQUE INDEX "Job_groupID_key" ON "Job"("groupID");
CREATE UNIQUE INDEX "Job_employerID_key" ON "Job"("employerID");
CREATE INDEX "Job_employerID_idx" ON "Job"("employerID");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
