# Database Schema Documentation

This document describes the complete database schema for the Ledger application. The schema uses PostgreSQL and is managed through Drizzle ORM.

## Overview

The database is organized into two main schemas:
- **`auth`**: Managed by Supabase for authentication (users table)
- **`public`**: Application tables for the ledger functionality

## Architecture

The schema follows a profile-based architecture where:
- `auth.users` (Supabase) contains authentication information
- `profiles` table bridges `auth.users` to application tables
- All application tables reference `profiles.id` instead of directly referencing `auth.users.id`

## Enums

### AccountType
Defines the type of financial account:
- `current` - Current/checking account
- `saving` - Savings account
- `investment` - Investment account

### RecurringFrequency
Defines frequency for recurring budgets:
- `daily`
- `weekly`
- `monthly`
- `yearly`

### SubscriptionType
Defines subscription billing frequency:
- `monthly`
- `yearly`
- `quarterly`

### AttachmentType
Defines type of file attachment:
- `photo`
- `file`
- `document`

## Tables

### auth.users
**Managed by Supabase** - Authentication user table.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | uuid | PRIMARY KEY | User identifier from Supabase auth |

**Note**: This table is managed by Supabase and should not be created or modified through migrations.

---

### profiles
User profile information that extends the auth.users table.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | serial | PRIMARY KEY | Profile identifier |
| user_id | uuid | NOT NULL, UNIQUE, FK → auth.users.id | Reference to Supabase auth user |
| full_name | varchar(255) | | User's full name |
| avatar_url | text | | URL to user's avatar image |
| timezone | varchar(50) | | User's timezone |
| created_at | timestamp | DEFAULT now() | Creation timestamp |
| updated_at | timestamp | | Last update timestamp |

**Relationships**:
- `user_id` → `auth.users.id` (one-to-one)

---

### currency
Currency definitions for multi-currency support.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | serial | PRIMARY KEY | Currency identifier |
| name | varchar(255) | | Currency name (e.g., "US Dollar") |
| currency_code | varchar(3) | UNIQUE | ISO currency code (e.g., "USD") |
| symbol | varchar(10) | UNIQUE | Currency symbol (e.g., "$") |

---

### categories
System/base categories provided by the application. These are default categories available to all users.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | serial | PRIMARY KEY | Category identifier |
| title | varchar(255) | NOT NULL | Category name |
| description | varchar(255) | | Category description |
| category_type | varchar(30) | | Type of category |
| icon | varchar(10) | | Icon identifier |
| color | varchar(10) | DEFAULT '2fc2db' | Hex color code |
| parent_id | integer | FK → categories.id | Parent category for hierarchical structure |

**Relationships**:
- `parent_id` → `categories.id` (self-referential, for category hierarchy)

---

### user_categories
User-defined categories. Separate from system categories, allowing users to create custom categories.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | serial | PRIMARY KEY | User category identifier |
| title | varchar(255) | NOT NULL | Category name |
| description | varchar(255) | | Category description |
| category_type | varchar(30) | | Type of category |
| icon | varchar(10) | | Icon identifier |
| color | varchar(10) | DEFAULT '2fc2db' | Hex color code |
| parent_id | integer | FK → user_categories.id | Parent category for hierarchical structure |
| user_id | integer | NOT NULL, FK → profiles.id | Owner of this category |

**Relationships**:
- `parent_id` → `user_categories.id` (self-referential, for category hierarchy)
- `user_id` → `profiles.id` (many-to-one)

---

### accounts
Financial accounts (bank accounts, wallets, etc.).

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | serial | PRIMARY KEY | Account identifier |
| account_type | AccountType | DEFAULT 'current' | Type of account |
| balance | numeric(12,2) | | Current account balance |
| is_primary_account | boolean | DEFAULT false | Whether this is the user's primary account |
| currency_code_id | integer | FK → currency.id | Currency for this account |
| icon | varchar(10) | | Icon identifier |
| color | varchar(10) | DEFAULT '2fc2db' | Hex color code |
| user_id | integer | NOT NULL, FK → profiles.id | Account owner |
| include_in_net_worth | boolean | DEFAULT true | Whether to include in net worth calculations |
| is_active | boolean | DEFAULT false | Whether account is active |
| created_by | integer | FK → profiles.id | User who created the account |
| updated_by | integer | FK → profiles.id | User who last updated the account |
| created_at | timestamp | DEFAULT now() | Creation timestamp |
| updated_at | timestamp | | Last update timestamp |

**Relationships**:
- `currency_code_id` → `currency.id` (many-to-one)
- `user_id` → `profiles.id` (many-to-one)
- `created_by` → `profiles.id` (many-to-one)
- `updated_by` → `profiles.id` (many-to-one)

---

### transfers
Money transfers between accounts.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | serial | PRIMARY KEY | Transfer identifier |
| from_account_id | integer | NOT NULL, FK → accounts.id | Source account |
| to_account_id | integer | NOT NULL, FK → accounts.id | Destination account |
| amount | numeric(12,2) | NOT NULL | Transfer amount |
| exchange_rate | numeric(12,6) | | Exchange rate if transferring between different currencies |
| transaction_date | timestamp | | Date/time of transfer |
| fee | numeric(12,2) | | Wire transfer fees |

**Relationships**:
- `from_account_id` → `accounts.id` (many-to-one)
- `to_account_id` → `accounts.id` (many-to-one)

---

### transactions
Financial transactions (income, expenses, etc.).

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | serial | PRIMARY KEY | Transaction identifier |
| title | varchar(255) | | Transaction title/description |
| notes | varchar(255) | | Additional notes |
| transaction_type | varchar(20) | | Type of transaction (e.g., "expense", "income") |
| category_id | integer | FK → categories.id | Associated category |
| goal_id | integer | | Associated goal (if applicable) |
| subscription_id | integer | | Associated subscription (if applicable) |
| account_id | integer | FK → accounts.id | Account used for transaction |
| amount | numeric(12,2) | NOT NULL | Transaction amount |
| transaction_date | timestamp | | Date/time of transaction |
| attachment_id | integer | | Associated attachment (if any) |
| user_id | integer | NOT NULL, FK → profiles.id | Transaction owner |
| payee_id | integer | | Associated payee (if any) |
| status | varchar(20) | | Transaction status |
| is_deleted | boolean | DEFAULT false | Soft delete flag |
| reconciliation_date | timestamp | | Date when transaction was reconciled |
| created_by | integer | FK → profiles.id | User who created the transaction |
| updated_by | integer | FK → profiles.id | User who last updated the transaction |
| created_at | timestamp | DEFAULT now() | Creation timestamp |
| updated_at | timestamp | | Last update timestamp |

**Relationships**:
- `category_id` → `categories.id` (many-to-one)
- `account_id` → `accounts.id` (many-to-one)
- `user_id` → `profiles.id` (many-to-one)
- `created_by` → `profiles.id` (many-to-one)
- `updated_by` → `profiles.id` (many-to-one)

**Note**: `goal_id`, `subscription_id`, `attachment_id`, and `payee_id` are forward references that may be implemented as foreign keys in future migrations.

---

### budgets
Budget plans for tracking spending and savings.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | serial | PRIMARY KEY | Budget identifier |
| title | varchar(255) | NOT NULL | Budget name |
| notes | varchar(255) | | Budget notes/description |
| budget_type | varchar(30) | | Type of budget (e.g., "expense", "saving") |
| amount | numeric(12,2) | NOT NULL | Budget amount limit |
| start_date | date | NOT NULL | Budget start date |
| end_date | date | | Budget end date |
| is_recurring | boolean | DEFAULT false | Whether budget repeats |
| recurring_frequency | RecurringFrequency | | Frequency if recurring |
| status | varchar(20) | DEFAULT 'active' | Budget status |
| alert_threshold_percentage | integer | DEFAULT 80 | Percentage at which to alert |
| category_id | integer | FK → categories.id | Associated category |
| spent_amount | numeric(12,2) | DEFAULT '0' | Amount spent so far |
| spent_at_last_update | timestamp | | Last time spent amount was updated |
| icon | varchar(10) | | Icon identifier |
| color | varchar(10) | DEFAULT '2fc2db' | Hex color code |
| user_id | integer | NOT NULL, FK → profiles.id | Budget owner |
| created_at | timestamp | DEFAULT now() | Creation timestamp |
| updated_at | timestamp | | Last update timestamp |

**Relationships**:
- `category_id` → `categories.id` (many-to-one)
- `user_id` → `profiles.id` (many-to-one)

---

### goals
Financial goals (savings targets, etc.).

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | serial | PRIMARY KEY | Goal identifier |
| title | varchar(255) | NOT NULL | Goal name |
| notes | varchar(255) | | Goal notes/description |
| amount | numeric(12,2) | NOT NULL | Target amount |
| current_amount | numeric(12,2) | DEFAULT '0' | Current progress toward goal |
| start_date | date | DEFAULT now() | Goal start date |
| due_date | date | | Goal target date |
| category_id | integer | FK → categories.id | Associated category |
| icon | varchar(10) | | Icon identifier |
| color | varchar(10) | DEFAULT '2fc2db' | Hex color code |
| user_id | integer | NOT NULL, FK → profiles.id | Goal owner |
| created_at | timestamp | DEFAULT now() | Creation timestamp |
| updated_at | timestamp | | Last update timestamp |

**Relationships**:
- `category_id` → `categories.id` (many-to-one)
- `user_id` → `profiles.id` (many-to-one)

---

### subscriptions
Recurring subscriptions and bills.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | serial | PRIMARY KEY | Subscription identifier |
| title | varchar(255) | NOT NULL | Subscription name |
| notes | varchar(255) | | Subscription notes |
| category_id | integer | FK → categories.id | Associated category |
| subscription_type | SubscriptionType | | Billing frequency |
| recurring_days | integer | | Days between recurring charges |
| due_date | date | | Next due date |
| user_id | integer | NOT NULL, FK → profiles.id | Subscription owner |
| created_at | timestamp | DEFAULT now() | Creation timestamp |
| updated_at | timestamp | | Last update timestamp |

**Relationships**:
- `category_id` → `categories.id` (many-to-one)
- `user_id` → `profiles.id` (many-to-one)

---

### payees
Payees (people/entities money is paid to or received from).

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | serial | PRIMARY KEY | Payee identifier |
| name | varchar(255) | NOT NULL | Payee name |
| phone | varchar(20) | | Contact phone number |
| website | varchar(255) | | Payee website |
| notes | varchar(500) | | Additional notes |
| is_favorite | boolean | DEFAULT false | Whether payee is marked as favorite |
| user_id | integer | NOT NULL, FK → profiles.id | Payee owner |
| created_at | timestamp | DEFAULT now() | Creation timestamp |
| updated_at | timestamp | | Last update timestamp |

**Relationships**:
- `user_id` → `profiles.id` (many-to-one)

---

### attachments
File attachments for transactions and other entities.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | serial | PRIMARY KEY | Attachment identifier |
| attachment_type | AttachmentType | | Type of attachment |
| mime_type | varchar(255) | | MIME type of file |
| size | integer | | File size in bytes |
| url | text | | URL or path to file |
| created_at | timestamp | DEFAULT now() | Creation timestamp |
| updated_at | timestamp | | Last update timestamp |

---

## Entity Relationship Summary

### Core Relationships

1. **Authentication Flow**:
   - `auth.users` (Supabase) → `profiles` (one-to-one via `user_id`)
   - `profiles` → All application tables (one-to-many via `user_id`)

2. **Financial Structure**:
   - `profiles` → `accounts` (one-to-many)
   - `accounts` → `transactions` (one-to-many)
   - `accounts` → `transfers` (one-to-many, both from and to)

3. **Categorization**:
   - `categories` (system) - hierarchical (self-referential)
   - `user_categories` (user-defined) - hierarchical (self-referential)
   - Both categories referenced by: `transactions`, `budgets`, `goals`, `subscriptions`

4. **Financial Planning**:
   - `profiles` → `budgets` (one-to-many)
   - `profiles` → `goals` (one-to-many)
   - `profiles` → `subscriptions` (one-to-many)

5. **Supporting Entities**:
   - `profiles` → `payees` (one-to-many)
   - `transactions` → `attachments` (many-to-one, via `attachment_id`)
   - `currency` → `accounts` (one-to-many)

## Notes for Cursor Agent

### Schema Location
All schema files are located in `database/schema/` directory:
- `schema.ts` - Schema definitions and auth.users reference
- `profile.ts` - Profile table
- `account.ts` - Accounts and account types enum
- `transaction.ts` - Transactions table
- `budget.ts` - Budgets and recurring frequency enum
- `goal.ts` - Goals table
- `subscription.ts` - Subscriptions and subscription type enum
- `payee.ts` - Payees table
- `category.ts` - System categories
- `user-category.ts` - User-defined categories
- `currency.ts` - Currency table
- `transfer.ts` - Transfers table
- `attachment.ts` - Attachments and attachment type enum

### Migration Notes
- The `auth.users` table is managed by Supabase and should not be created in migrations
- Foreign keys to `auth.users.id` should be added manually in migrations if needed
- The `profiles` table acts as a bridge between `auth.users` and application tables
- All `user_id` columns in application tables reference `profiles.id` (integer), not `auth.users.id` (uuid)

### Data Type Mappings
- `serial` → PostgreSQL `SERIAL` (auto-incrementing integer)
- `numeric(precision, scale)` → PostgreSQL `NUMERIC(precision, scale)`
- `varchar(length)` → PostgreSQL `VARCHAR(length)`
- `timestamp` → PostgreSQL `TIMESTAMP`
- `date` → PostgreSQL `DATE`
- `boolean` → PostgreSQL `BOOLEAN`
- `uuid` → PostgreSQL `UUID`
- `text` → PostgreSQL `TEXT`

### Important Constraints
- All tables use `serial` for primary keys (auto-incrementing integers)
- Timestamps use `defaultNow()` for `created_at` fields
- `updated_at` fields use `$onUpdateFn(() => new Date())` for automatic updates
- Default color is `'2fc2db'` (cyan) for most entities
- Soft deletes are implemented via `is_deleted` boolean flag in transactions
