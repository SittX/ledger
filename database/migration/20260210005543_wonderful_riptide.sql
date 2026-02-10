CREATE TYPE "public"."account_types" AS ENUM('current', 'saving', 'investment');--> statement-breakpoint
CREATE TYPE "public"."attachment_type" AS ENUM('photo', 'file', 'document');--> statement-breakpoint
CREATE TYPE "public"."recurring_frequency" AS ENUM('daily', 'weekly', 'monthly', 'yearly');--> statement-breakpoint
CREATE TYPE "public"."subscription_type" AS ENUM('monthly', 'yearly', 'quarterly');--> statement-breakpoint
CREATE TABLE "accounts" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(255) NOT NULL,
	"description" varchar(500),
	"account_type" "account_types" DEFAULT 'current',
	"balance" numeric(12, 2),
	"is_primary_account" boolean DEFAULT false,
	"currency_code_id" integer,
	"icon" varchar(10),
	"color" varchar(10) DEFAULT '2fc2db',
	"user_id" uuid NOT NULL,
	"include_in_net_worth" boolean DEFAULT true,
	"is_active" boolean DEFAULT false,
	"created_by" uuid,
	"updated_by" uuid,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "attachments" (
	"id" serial PRIMARY KEY NOT NULL,
	"attachment_type" "attachment_type",
	"mime_type" varchar(255),
	"size" integer,
	"url" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "budgets" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(255) NOT NULL,
	"notes" varchar(255),
	"budget_type" varchar(30),
	"amount" numeric(12, 2) NOT NULL,
	"start_date" date NOT NULL,
	"end_date" date,
	"is_recurring" boolean DEFAULT false,
	"recurring_frequency" "recurring_frequency",
	"status" varchar(20) DEFAULT 'active',
	"alert_threshold_percentage" integer DEFAULT 80,
	"category_id" integer,
	"spent_amount" numeric(12, 2) DEFAULT '0',
	"spent_at_last_update" timestamp,
	"icon" varchar(10),
	"color" varchar(10) DEFAULT '2fc2db',
	"user_id" uuid NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "categories" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(255) NOT NULL,
	"description" varchar(255),
	"category_type" varchar(30),
	"icon" varchar(10),
	"color" varchar(10) DEFAULT '2fc2db',
	"parent_id" integer,
	"user_id" uuid
);
--> statement-breakpoint
CREATE TABLE "currency" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255),
	"currency_code" varchar(3),
	"symbol" varchar(10),
	CONSTRAINT "currency_code_unique" UNIQUE("currency_code"),
	CONSTRAINT "currency_symbol_unique" UNIQUE("symbol")
);
--> statement-breakpoint
CREATE TABLE "goals" (
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
	"user_id" uuid NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "payees" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"phone" varchar(20),
	"website" varchar(255),
	"notes" varchar(500),
	"is_favorite" boolean DEFAULT false,
	"user_id" uuid NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "subscriptions" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(255) NOT NULL,
	"notes" varchar(255),
	"category_id" integer,
	"subscription_type" "subscription_type",
	"recurring_days" integer,
	"due_date" date,
	"user_id" uuid NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "transactions" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(255),
	"notes" varchar(255),
	"transaction_type" varchar(20),
	"category_id" integer,
	"goal_id" integer,
	"subscription_id" integer,
	"account_id" integer,
	"amount" numeric(12, 2) NOT NULL,
	"transaction_date" timestamp,
	"attachment_id" integer,
	"user_id" uuid NOT NULL,
	"payee_id" integer,
	"status" varchar(20),
	"is_deleted" boolean DEFAULT false,
	"reconciliation_date" timestamp,
	"created_by" uuid,
	"updated_by" uuid,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "transfers" (
	"id" serial PRIMARY KEY NOT NULL,
	"from_account_id" integer NOT NULL,
	"to_account_id" integer NOT NULL,
	"amount" numeric(12, 2) NOT NULL,
	"exchange_rate" numeric(12, 6),
	"transaction_date" timestamp,
	"fee" numeric(12, 2)
);
--> statement-breakpoint
CREATE TABLE "user_categories" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(255) NOT NULL,
	"description" varchar(255),
	"category_type" varchar(30),
	"icon" varchar(10),
	"color" varchar(10) DEFAULT '2fc2db',
	"parent_category_id" integer,
	"user_id" uuid NOT NULL
);
--> statement-breakpoint
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_currency_code_id_currency_id_fk" FOREIGN KEY ("currency_code_id") REFERENCES "public"."currency"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "neon_auth"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_created_by_user_id_fk" FOREIGN KEY ("created_by") REFERENCES "neon_auth"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_updated_by_user_id_fk" FOREIGN KEY ("updated_by") REFERENCES "neon_auth"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "budgets" ADD CONSTRAINT "budgets_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "budgets" ADD CONSTRAINT "budgets_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "neon_auth"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "categories" ADD CONSTRAINT "categories_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "neon_auth"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "categories" ADD CONSTRAINT "category_parent_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."categories"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "goals" ADD CONSTRAINT "goals_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "goals" ADD CONSTRAINT "goals_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "neon_auth"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "payees" ADD CONSTRAINT "payees_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "neon_auth"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "subscriptions" ADD CONSTRAINT "subscriptions_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "subscriptions" ADD CONSTRAINT "subscriptions_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "neon_auth"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_account_id_accounts_id_fk" FOREIGN KEY ("account_id") REFERENCES "public"."accounts"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "neon_auth"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_created_by_user_id_fk" FOREIGN KEY ("created_by") REFERENCES "neon_auth"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_updated_by_user_id_fk" FOREIGN KEY ("updated_by") REFERENCES "neon_auth"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "transfers" ADD CONSTRAINT "transfers_from_account_id_accounts_id_fk" FOREIGN KEY ("from_account_id") REFERENCES "public"."accounts"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "transfers" ADD CONSTRAINT "transfers_to_account_id_accounts_id_fk" FOREIGN KEY ("to_account_id") REFERENCES "public"."accounts"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_categories" ADD CONSTRAINT "user_categories_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "neon_auth"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_categories" ADD CONSTRAINT "user_category_parent_id_fk" FOREIGN KEY ("parent_category_id") REFERENCES "public"."user_categories"("id") ON DELETE no action ON UPDATE no action;