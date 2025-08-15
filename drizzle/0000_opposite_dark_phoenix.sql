CREATE TABLE `accounts` (
	`userId` varchar(255) NOT NULL,
	`type` varchar(255) NOT NULL,
	`provider` varchar(255) NOT NULL,
	`providerAccountId` varchar(255) NOT NULL,
	`refresh_token` text,
	`access_token` text,
	`expires_at` int,
	`token_type` varchar(255),
	`scope` varchar(255),
	`id_token` text,
	`session_state` varchar(255),
	CONSTRAINT `accounts_provider_providerAccountId_pk` PRIMARY KEY(`provider`,`providerAccountId`)
);
--> statement-breakpoint
CREATE TABLE `article` (
	`id` varchar(255) NOT NULL,
	`title` varchar(500) NOT NULL,
	`slug` varchar(500) NOT NULL,
	`content` text NOT NULL,
	`Image` varchar(500),
	`status` enum('DRAFT','PUBLISHED') DEFAULT 'DRAFT',
	`publishedAt` datetime,
	`authorId` varchar(255) NOT NULL,
	`categoryId` varchar(255) NOT NULL,
	`createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
	`updatedAt` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `article_id` PRIMARY KEY(`id`),
	CONSTRAINT `article_slug_unique` UNIQUE(`slug`)
);
--> statement-breakpoint
CREATE TABLE `category` (
	`id` varchar(255) NOT NULL,
	`name` varchar(255) NOT NULL,
	`slug` varchar(255) NOT NULL,
	`description` text,
	`createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
	`updatedAt` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `category_id` PRIMARY KEY(`id`),
	CONSTRAINT `category_slug_unique` UNIQUE(`slug`)
);
--> statement-breakpoint
CREATE TABLE `sessions` (
	`sessionToken` varchar(255) NOT NULL,
	`userId` varchar(255) NOT NULL,
	`expires` timestamp NOT NULL,
	CONSTRAINT `sessions_sessionToken` PRIMARY KEY(`sessionToken`)
);
--> statement-breakpoint
CREATE TABLE `user` (
	`id` varchar(255) NOT NULL,
	`name` varchar(255),
	`email` varchar(255) NOT NULL,
	`emailVerified` timestamp(3),
	`password` varchar(255),
	`image` varchar(255),
	`role` enum('SUPER_ADMIN','ADMIN') DEFAULT 'ADMIN',
	`isActive` boolean DEFAULT true,
	`createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
	`updatedAt` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `user_id` PRIMARY KEY(`id`),
	CONSTRAINT `user_email_unique` UNIQUE(`email`)
);
--> statement-breakpoint
CREATE TABLE `verificationTokens` (
	`identifier` varchar(255) NOT NULL,
	`token` varchar(255) NOT NULL,
	`expires` timestamp NOT NULL,
	CONSTRAINT `verificationTokens_identifier_token_pk` PRIMARY KEY(`identifier`,`token`)
);
--> statement-breakpoint
CREATE INDEX `article_slug_idx` ON `article` (`slug`);--> statement-breakpoint
CREATE INDEX `article_author_idx` ON `article` (`authorId`);--> statement-breakpoint
CREATE INDEX `article_category_idx` ON `article` (`categoryId`);