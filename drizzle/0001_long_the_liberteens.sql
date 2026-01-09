CREATE TABLE `enquiries` (
	`id` int AUTO_INCREMENT NOT NULL,
	`clientName` varchar(255) NOT NULL,
	`projectName` varchar(255) NOT NULL,
	`phoneNumber` varchar(20) NOT NULL,
	`projectDescription` text NOT NULL,
	`budget` varchar(100) NOT NULL,
	`relevantLinks` text,
	`status` enum('new','reviewed','in-progress','completed') NOT NULL DEFAULT 'new',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `enquiries_id` PRIMARY KEY(`id`)
);
