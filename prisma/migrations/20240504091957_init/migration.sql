-- CreateTable
CREATE TABLE "User" (
    "userID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Student" (
    "studentID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userID" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "Email" TEXT NOT NULL,
    "Phone" TEXT NOT NULL,
    "AboutMe" TEXT,
    "Hobbies" TEXT,
    "University" TEXT NOT NULL,
    CONSTRAINT "Student_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User" ("userID") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Employer" (
    "employerID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userID" INTEGER NOT NULL,
    "CompanyName" TEXT NOT NULL,
    "Industry" TEXT NOT NULL,
    "Email" TEXT NOT NULL,
    "Phone" TEXT NOT NULL,
    CONSTRAINT "Employer_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User" ("userID") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Job" (
    "jobID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "employerID" INTEGER NOT NULL,
    "JobTitle" TEXT NOT NULL,
    "Location" TEXT NOT NULL,
    "Description" TEXT NOT NULL,
    "Requirements" TEXT NOT NULL,
    "Persons" INTEGER NOT NULL,
    "SalaryRange" TEXT NOT NULL,
    "PostDate" DATETIME NOT NULL,
    "CloseDate" DATETIME NOT NULL,
    CONSTRAINT "Job_employerID_fkey" FOREIGN KEY ("employerID") REFERENCES "Employer" ("employerID") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Application" (
    "appID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "studentID" INTEGER NOT NULL,
    "jobID" INTEGER NOT NULL,
    "applyDate" DATETIME NOT NULL,
    "Status" TEXT NOT NULL,
    CONSTRAINT "Application_studentID_fkey" FOREIGN KEY ("studentID") REFERENCES "Student" ("studentID") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Application_jobID_fkey" FOREIGN KEY ("jobID") REFERENCES "Job" ("jobID") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Student_userID_key" ON "Student"("userID");

-- CreateIndex
CREATE UNIQUE INDEX "Student_Email_key" ON "Student"("Email");

-- CreateIndex
CREATE UNIQUE INDEX "Student_Phone_key" ON "Student"("Phone");

-- CreateIndex
CREATE UNIQUE INDEX "Employer_userID_key" ON "Employer"("userID");

-- CreateIndex
CREATE UNIQUE INDEX "Employer_Email_key" ON "Employer"("Email");

-- CreateIndex
CREATE UNIQUE INDEX "Employer_Phone_key" ON "Employer"("Phone");

-- CreateIndex
CREATE UNIQUE INDEX "Job_employerID_key" ON "Job"("employerID");

-- CreateIndex
CREATE UNIQUE INDEX "Application_studentID_key" ON "Application"("studentID");
