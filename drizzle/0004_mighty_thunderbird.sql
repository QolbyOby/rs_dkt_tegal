CREATE TABLE `room_types` (
	`id` varchar(255) NOT NULL,
	`name` varchar(255) NOT NULL,
	`price` varchar(255) NOT NULL,
	`images` json,
	`facilities` json,
	`createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
	`updatedAt` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `room_types_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `rooms` (
	`id` varchar(255) NOT NULL,
	`name` varchar(255) NOT NULL,
	`capacity` int NOT NULL,
	`roomTypeId` varchar(255) NOT NULL,
	CONSTRAINT `rooms_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
DROP TABLE `room`;