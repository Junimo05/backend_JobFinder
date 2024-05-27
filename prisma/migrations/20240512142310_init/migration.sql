/*
  Warnings:

  - You are about to drop the column `groupID` on the `job` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[jobGroupTitle]` on the table `JobGroup` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `job` DROP FOREIGN KEY `Job_groupID_fkey`;

-- AlterTable
ALTER TABLE `job` DROP COLUMN `groupID`;

-- CreateTable
CREATE TABLE `JobOnGroup` (
    `jobID` INTEGER NOT NULL,
    `groupID` INTEGER NOT NULL,

    INDEX `jobID`(`jobID`),
    INDEX `groupID`(`groupID`),
    PRIMARY KEY (`jobID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `JobGroup_jobGroupTitle_key` ON `JobGroup`(`jobGroupTitle`);

-- AddForeignKey
ALTER TABLE `JobOnGroup` ADD CONSTRAINT `JobOnGroup_jobID_fkey` FOREIGN KEY (`jobID`) REFERENCES `Job`(`jobID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `JobOnGroup` ADD CONSTRAINT `JobOnGroup_groupID_fkey` FOREIGN KEY (`groupID`) REFERENCES `JobGroup`(`groupID`) ON DELETE RESTRICT ON UPDATE CASCADE;
