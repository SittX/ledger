CREATE TABLE "app"."currency" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255),
	"currency_code" varchar(3),
	"symbol" varchar(10),
	CONSTRAINT "currency_code_unique" UNIQUE("currency_code"),
	CONSTRAINT "currency_symbol_unique" UNIQUE("symbol")
);
--> statement-breakpoint
ALTER TABLE "currency" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
DROP TABLE "currency" CASCADE;--> statement-breakpoint
ALTER TABLE "app"."accounts" ADD CONSTRAINT "accounts_currency_code_id_currency_id_fk" FOREIGN KEY ("currency_code_id") REFERENCES "app"."currency"("id") ON DELETE no action ON UPDATE no action;