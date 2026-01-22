CREATE TYPE "app"."attachment_type" AS ENUM('photo', 'file', 'document');--> statement-breakpoint
CREATE TYPE "app"."recurring_frequency" AS ENUM('daily', 'weekly', 'monthly', 'yearly');--> statement-breakpoint
CREATE TYPE "app"."subscription_type" AS ENUM('monthly', 'yearly', 'quarterly');--> statement-breakpoint
CREATE TABLE "app"."attachments" (
	"id" serial PRIMARY KEY NOT NULL,
	"attachment_type" "app"."attachment_type",
	"mime_type" varchar(255),
	"size" integer,
	"url" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "app"."budgets" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(255) NOT NULL,
	"notes" varchar(255),
	"budget_type" varchar(30),
	"amount" numeric(12, 2) NOT NULL,
	"start_date" date NOT NULL,
	"end_date" date,
	"is_recurring" boolean DEFAULT false,
	"recurring_frequency" "app"."recurring_frequency",
	"status" varchar(20) DEFAULT 'active',
	"alert_threshold_percentage" integer DEFAULT 80,
	"category_id" integer,
	"spent_amount" numeric(12, 2) DEFAULT '0',
	"spent_at_last_update" timestamp,
	"icon" varchar(10),
	"color" varchar(10) DEFAULT '2fc2db',
	"user_id" integer NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "app"."goals" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(255) NOT NULL,
	"notes" varchar(255),
	"amount" numeric(12, 2) NOT NULL,
	"current_amount" numeric(12, 2) DEFAULT '0',
	"start_date" date DEFAULT now(),
	"due_date" date,
	"category_id" integer,
	"icon" varchar(10),
	"color" varchar(10) DEFAULT '2fc2db',
	"user_id" integer NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "app"."payees" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"phone" varchar(20),
	"website" varchar(255),
	"notes" varchar(500),
	"is_favorite" boolean DEFAULT false,
	"user_id" integer NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "app"."profiles" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" uuid,
	"full_name" varchar(255),
	"avatar_url" text,
	"timezone" varchar(50),
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "app"."subscriptions" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(255) NOT NULL,
	"notes" varchar(255),
	"category_id" integer,
	"subscription_type" "app"."subscription_type",
	"recurring_days" integer,
	"due_date" date,
	"user_id" integer NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "app"."transfers" (
	"id" serial PRIMARY KEY NOT NULL,
	"from_account_id" integer NOT NULL,
	"to_account_id" integer NOT NULL,
	"amount" numeric(12, 2) NOT NULL,
	"exchange_rate" numeric(12, 6),
	"transaction_date" timestamp,
	"fee" numeric(12, 2)
);
--> statement-breakpoint
CREATE TABLE "app"."user_categories" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(255) NOT NULL,
	"description" varchar(255),
	"category_type" varchar(30),
	"icon" varchar(10),
	"color" varchar(10) DEFAULT '2fc2db',
	"parent_id" integer,
	"user_id" integer NOT NULL
);
--> statement-breakpoint
ALTER TABLE "app"."accounts" RENAME COLUMN "createdAt" TO "created_at";--> statement-breakpoint
ALTER TABLE "app"."accounts" RENAME COLUMN "updatedAt" TO "updated_at";--> statement-breakpoint
ALTER TABLE "app"."transactions" RENAME COLUMN "description" TO "notes";--> statement-breakpoint
ALTER TABLE "app"."transactions" RENAME COLUMN "transaction_datetime" TO "transaction_date";--> statement-breakpoint
ALTER TABLE "app"."transactions" RENAME COLUMN "createdAt" TO "created_at";--> statement-breakpoint
ALTER TABLE "app"."transactions" RENAME COLUMN "updatedAt" TO "updated_at";--> statement-breakpoint
ALTER TABLE "currency" DROP CONSTRAINT "currency_name_unique";--> statement-breakpoint
ALTER TABLE "currency" DROP CONSTRAINT "currency_currency_code_unique";--> statement-breakpoint
ALTER TABLE "app"."accounts" ALTER COLUMN "balance" SET DATA TYPE numeric(12, 2);--> statement-breakpoint
ALTER TABLE "app"."accounts" ALTER COLUMN "icon" SET DATA TYPE varchar(10);--> statement-breakpoint
ALTER TABLE "app"."categories" ALTER COLUMN "icon" SET DATA TYPE varchar(10);--> statement-breakpoint
ALTER TABLE "currency" ALTER COLUMN "name" SET DATA TYPE varchar(255);--> statement-breakpoint
ALTER TABLE "currency" ALTER COLUMN "currency_code" SET DATA TYPE varchar(3);--> statement-breakpoint
ALTER TABLE "app"."transactions" ALTER COLUMN "transaction_type" SET DATA TYPE varchar(20);--> statement-breakpoint
ALTER TABLE "app"."transactions" ALTER COLUMN "amount" SET DATA TYPE numeric(12, 2);--> statement-breakpoint
ALTER TABLE "app"."transactions" ALTER COLUMN "amount" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "app"."accounts" ADD COLUMN "is_primary_account" boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE "app"."accounts" ADD COLUMN "user_id" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "app"."accounts" ADD COLUMN "include_in_net_worth" boolean DEFAULT true;--> statement-breakpoint
ALTER TABLE "app"."accounts" ADD COLUMN "is_active" boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE "app"."accounts" ADD COLUMN "created_by" integer;--> statement-breakpoint
ALTER TABLE "app"."accounts" ADD COLUMN "updated_by" integer;--> statement-breakpoint
ALTER TABLE "app"."categories" ADD COLUMN "category_type" varchar(30);--> statement-breakpoint
ALTER TABLE "app"."transactions" ADD COLUMN "goal_id" integer;--> statement-breakpoint
ALTER TABLE "app"."transactions" ADD COLUMN "subscription_id" integer;--> statement-breakpoint
ALTER TABLE "app"."transactions" ADD COLUMN "attachment_id" integer;--> statement-breakpoint
ALTER TABLE "app"."transactions" ADD COLUMN "user_id" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "app"."transactions" ADD COLUMN "payee_id" integer;--> statement-breakpoint
ALTER TABLE "app"."transactions" ADD COLUMN "status" varchar(20);--> statement-breakpoint
ALTER TABLE "app"."transactions" ADD COLUMN "is_deleted" boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE "app"."transactions" ADD COLUMN "reconciliation_date" timestamp;--> statement-breakpoint
ALTER TABLE "app"."transactions" ADD COLUMN "created_by" integer;--> statement-breakpoint
ALTER TABLE "app"."transactions" ADD COLUMN "updated_by" integer;--> statement-breakpoint
ALTER TABLE "app"."budgets" ADD CONSTRAINT "budgets_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "app"."categories"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "app"."budgets" ADD CONSTRAINT "budgets_user_id_profiles_id_fk" FOREIGN KEY ("user_id") REFERENCES "app"."profiles"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "app"."goals" ADD CONSTRAINT "goals_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "app"."categories"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "app"."goals" ADD CONSTRAINT "goals_user_id_profiles_id_fk" FOREIGN KEY ("user_id") REFERENCES "app"."profiles"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "app"."payees" ADD CONSTRAINT "payees_user_id_profiles_id_fk" FOREIGN KEY ("user_id") REFERENCES "app"."profiles"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "app"."profiles" ADD CONSTRAINT "profiles_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "app"."subscriptions" ADD CONSTRAINT "subscriptions_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "app"."categories"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "app"."subscriptions" ADD CONSTRAINT "subscriptions_user_id_profiles_id_fk" FOREIGN KEY ("user_id") REFERENCES "app"."profiles"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "app"."transfers" ADD CONSTRAINT "transfers_from_account_id_accounts_id_fk" FOREIGN KEY ("from_account_id") REFERENCES "app"."accounts"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "app"."transfers" ADD CONSTRAINT "transfers_to_account_id_accounts_id_fk" FOREIGN KEY ("to_account_id") REFERENCES "app"."accounts"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "app"."user_categories" ADD CONSTRAINT "user_categories_user_id_profiles_id_fk" FOREIGN KEY ("user_id") REFERENCES "app"."profiles"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "app"."user_categories" ADD CONSTRAINT "user_category_parent_id_fk" FOREIGN KEY ("parent_id") REFERENCES "app"."user_categories"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "app"."accounts" ADD CONSTRAINT "accounts_user_id_profiles_id_fk" FOREIGN KEY ("user_id") REFERENCES "app"."profiles"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "app"."accounts" ADD CONSTRAINT "accounts_created_by_profiles_id_fk" FOREIGN KEY ("created_by") REFERENCES "app"."profiles"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "app"."accounts" ADD CONSTRAINT "accounts_updated_by_profiles_id_fk" FOREIGN KEY ("updated_by") REFERENCES "app"."profiles"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "app"."transactions" ADD CONSTRAINT "transactions_user_id_profiles_id_fk" FOREIGN KEY ("user_id") REFERENCES "app"."profiles"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "app"."transactions" ADD CONSTRAINT "transactions_created_by_profiles_id_fk" FOREIGN KEY ("created_by") REFERENCES "app"."profiles"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "app"."transactions" ADD CONSTRAINT "transactions_updated_by_profiles_id_fk" FOREIGN KEY ("updated_by") REFERENCES "app"."profiles"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "app"."categories" DROP COLUMN "createdAt";--> statement-breakpoint
ALTER TABLE "app"."categories" DROP COLUMN "updatedAt";--> statement-breakpoint
ALTER TABLE "currency" ADD CONSTRAINT "currency_code_unique" UNIQUE("currency_code");--> statement-breakpoint
DROP TYPE "app"."transaction_types";