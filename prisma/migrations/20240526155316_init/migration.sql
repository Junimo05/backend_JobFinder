-- DropForeignKey
ALTER TABLE `application` DROP FOREIGN KEY `Application_employeeID_fkey`;

-- DropForeignKey
ALTER TABLE `application` DROP FOREIGN KEY `Application_jobID_fkey`;

-- DropForeignKey
ALTER TABLE `employee` DROP FOREIGN KEY `Employee_userID_fkey`;

-- DropForeignKey
ALTER TABLE `employer` DROP FOREIGN KEY `Employer_userID_fkey`;

-- DropForeignKey
ALTER TABLE `job` DROP FOREIGN KEY `Job_employerID_fkey`;

-- DropForeignKey
ALTER TABLE `jobongroup` DROP FOREIGN KEY `JobOnGroup_groupID_fkey`;

-- DropForeignKey
ALTER TABLE `jobongroup` DROP FOREIGN KEY `JobOnGroup_jobID_fkey`;

-- AddForeignKey
ALTER TABLE `Employee` ADD CONSTRAINT `Employee_userID_fkey` FOREIGN KEY (`userID`) REFERENCES `User`(`userID`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Employer` ADD CONSTRAINT `Employer_userID_fkey` FOREIGN KEY (`userID`) REFERENCES `User`(`userID`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Job` ADD CONSTRAINT `Job_employerID_fkey` FOREIGN KEY (`employerID`) REFERENCES `Employer`(`employerID`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `JobOnGroup` ADD CONSTRAINT `JobOnGroup_jobID_fkey` FOREIGN KEY (`jobID`) REFERENCES `Job`(`jobID`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `JobOnGroup` ADD CONSTRAINT `JobOnGroup_groupID_fkey` FOREIGN KEY (`groupID`) REFERENCES `JobGroup`(`groupID`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Application` ADD CONSTRAINT `Application_employeeID_fkey` FOREIGN KEY (`employeeID`) REFERENCES `Employee`(`employeeID`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Application` ADD CONSTRAINT `Application_jobID_fkey` FOREIGN KEY (`jobID`) REFERENCES `Job`(`jobID`) ON DELETE CASCADE ON UPDATE NO ACTION;
