CREATE TABLE "currency" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(30),
	"currency_code" varchar(10),
	"symbol" varchar(10),
	CONSTRAINT "currency_name_unique" UNIQUE("name"),
	CONSTRAINT "currency_currency_code_unique" UNIQUE("currency_code"),
	CONSTRAINT "currency_symbol_unique" UNIQUE("symbol")
);
--> statement-breakpoint
ALTER TABLE "app"."accounts" RENAME COLUMN "currency" TO "currency_code_id";--> statement-breakpoint
ALTER TABLE "app"."accounts" ADD CONSTRAINT "accounts_currency_code_id_currency_id_fk" FOREIGN KEY ("currency_code_id") REFERENCES "public"."currency"("id") ON DELETE no action ON UPDATE no action;