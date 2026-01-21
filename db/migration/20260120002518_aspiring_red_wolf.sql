CREATE SCHEMA "app";
--> statement-breakpoint
CREATE TYPE "app"."account_types" AS ENUM('current', 'saving', 'investment');--> statement-breakpoint
CREATE TYPE "app"."transaction_types" AS ENUM('expense', 'income');--> statement-breakpoint
CREATE TABLE "app"."accounts" (
	"id" serial PRIMARY KEY NOT NULL,
	"account_type" "app"."account_types" DEFAULT 'current',
	"balance" numeric(100, 2),
	"currency" varchar(3),
	"icon" varchar(80),
	"color" varchar(10) DEFAULT '2fc2db',
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp
);
--> statement-breakpoint
CREATE TABLE "app"."categories" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(255) NOT NULL,
	"description" varchar(255),
	"icon" varchar(80),
	"color" varchar(10) DEFAULT '2fc2db',
	"parent_id" integer,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp
);
--> statement-breakpoint
CREATE TABLE "app"."transactions" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(255),
	"transaction_type" "app"."transaction_types",
	"description" text,
	"amount" numeric(100, 2),
	"transaction_datetime" timestamp DEFAULT now(),
	"category_id" integer,
	"account_id" integer,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp
);
--> statement-breakpoint
ALTER TABLE "app"."categories" ADD CONSTRAINT "category_parent_id_fk" FOREIGN KEY ("parent_id") REFERENCES "app"."categories"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "app"."transactions" ADD CONSTRAINT "transactions_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "app"."categories"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "app"."transactions" ADD CONSTRAINT "transactions_account_id_accounts_id_fk" FOREIGN KEY ("account_id") REFERENCES "app"."accounts"("id") ON DELETE no action ON UPDATE no action;