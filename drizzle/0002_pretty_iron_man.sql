CREATE TABLE `doctor` (
	`id` varchar(255) NOT NULL,
	`name` varchar(255) NOT NULL,
	`category` enum('umum','spesialis') NOT NULL,
	`schedules` json NOT NULL,
	`imageUrl` varchar(500),
	`createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
	`updatedAt` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `doctor_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE INDEX `doctor_name_idx` ON `doctor` (`name`);