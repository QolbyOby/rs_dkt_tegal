CREATE TABLE `room` (
	`id` varchar(255) NOT NULL,
	`roomNumber` varchar(255) NOT NULL,
	`type` varchar(255) NOT NULL,
	`status` enum('available','occupied','maintenance') DEFAULT 'available',
	`price` varchar(255) NOT NULL,
	`capacity` int NOT NULL,
	`features` text,
	`lastUpdated` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	`createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT `room_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE INDEX `room_number_idx` ON `room` (`roomNumber`);