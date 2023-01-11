-- CreateTable
CREATE TABLE `Encounter` (
    `encounterId` INTEGER NOT NULL AUTO_INCREMENT,
    `visit` DATETIME(3) NOT NULL,
    `discharge` DATETIME(3) NOT NULL,
    `physicalExamination` LONGTEXT NOT NULL,
    `historyOfIllness` LONGTEXT NOT NULL,
    `followUp` DATE NOT NULL,
    `patientId` INTEGER NOT NULL,
    `deleted` BOOLEAN NOT NULL DEFAULT false,
    `deletedAt` DATETIME(3) NULL,

    UNIQUE INDEX `Encounter_patientId_key`(`patientId`),
    PRIMARY KEY (`encounterId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Patient` (
    `patientId` INTEGER NOT NULL AUTO_INCREMENT,
    `firstName` VARCHAR(191) NOT NULL,
    `middleName` VARCHAR(191) NULL,
    `lastName` VARCHAR(191) NOT NULL,
    `birthDate` DATE NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,
    `deleted` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`patientId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Encounter` ADD CONSTRAINT `Encounter_patientId_fkey` FOREIGN KEY (`patientId`) REFERENCES `Patient`(`patientId`) ON DELETE RESTRICT ON UPDATE CASCADE;
