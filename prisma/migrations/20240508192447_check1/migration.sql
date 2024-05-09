-- CreateTable
CREATE TABLE `User` (
    `userID` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `User_username_key`(`username`),
    PRIMARY KEY (`userID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Employee` (
    `employeeID` INTEGER NOT NULL AUTO_INCREMENT,
    `userID` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `age` INTEGER NOT NULL,
    `Phone` VARCHAR(191) NULL,
    `Email` VARCHAR(191) NOT NULL,
    `AboutMe` VARCHAR(191) NULL,
    `Hobbies` VARCHAR(191) NULL,

    UNIQUE INDEX `Employee_userID_key`(`userID`),
    UNIQUE INDEX `Employee_age_key`(`age`),
    UNIQUE INDEX `Employee_Phone_key`(`Phone`),
    UNIQUE INDEX `Employee_Email_key`(`Email`),
    INDEX `Employee_userID_idx`(`userID`),
    PRIMARY KEY (`employeeID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Employer` (
    `employerID` INTEGER NOT NULL AUTO_INCREMENT,
    `userID` INTEGER NOT NULL,
    `CompanyName` VARCHAR(191) NOT NULL,
    `Industry` VARCHAR(191) NOT NULL,
    `Email` VARCHAR(191) NOT NULL,
    `Phone` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Employer_userID_key`(`userID`),
    UNIQUE INDEX `Employer_Email_key`(`Email`),
    UNIQUE INDEX `Employer_Phone_key`(`Phone`),
    INDEX `Employer_userID_idx`(`userID`),
    PRIMARY KEY (`employerID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Job` (
    `jobID` INTEGER NOT NULL AUTO_INCREMENT,
    `groupID` INTEGER NULL,
    `employerID` INTEGER NOT NULL,
    `JobTitle` VARCHAR(191) NOT NULL,
    `Location` VARCHAR(191) NOT NULL,
    `Description` VARCHAR(191) NOT NULL,
    `Requirements` VARCHAR(191) NOT NULL,
    `Persons` INTEGER NOT NULL,
    `SalaryRange` VARCHAR(191) NOT NULL,
    `PostDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `CloseDate` DATETIME(3) NOT NULL,
    `Deleted` BOOLEAN NOT NULL DEFAULT false,

    UNIQUE INDEX `Job_groupID_key`(`groupID`),
    UNIQUE INDEX `Job_employerID_key`(`employerID`),
    INDEX `Job_employerID_idx`(`employerID`),
    PRIMARY KEY (`jobID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `JobGroup` (
    `groupID` INTEGER NOT NULL AUTO_INCREMENT,
    `jobGroupTitle` VARCHAR(191) NOT NULL,
    `Description` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`groupID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Application` (
    `appID` INTEGER NOT NULL AUTO_INCREMENT,
    `employeeID` INTEGER NOT NULL,
    `jobID` INTEGER NOT NULL,
    `Description` VARCHAR(191) NOT NULL,
    `applyDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `Status` VARCHAR(191) NOT NULL DEFAULT 'Waiting',

    UNIQUE INDEX `Application_employeeID_key`(`employeeID`),
    INDEX `employeeID`(`employeeID`),
    INDEX `jobID`(`jobID`),
    PRIMARY KEY (`appID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Employee` ADD CONSTRAINT `Employee_userID_fkey` FOREIGN KEY (`userID`) REFERENCES `User`(`userID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Employer` ADD CONSTRAINT `Employer_userID_fkey` FOREIGN KEY (`userID`) REFERENCES `User`(`userID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Job` ADD CONSTRAINT `Job_employerID_fkey` FOREIGN KEY (`employerID`) REFERENCES `Employer`(`employerID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Job` ADD CONSTRAINT `Job_groupID_fkey` FOREIGN KEY (`groupID`) REFERENCES `JobGroup`(`groupID`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Application` ADD CONSTRAINT `Application_employeeID_fkey` FOREIGN KEY (`employeeID`) REFERENCES `Employee`(`employeeID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Application` ADD CONSTRAINT `Application_jobID_fkey` FOREIGN KEY (`jobID`) REFERENCES `Job`(`jobID`) ON DELETE RESTRICT ON UPDATE CASCADE;
