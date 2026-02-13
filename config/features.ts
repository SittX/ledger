import {
  Home,
  ChartColumn,
  Wallet,
  Tags,
  BellRing,
  ChartPie,
  Goal,
  type LucideIcon,
} from "lucide-react";

export interface FeatureConfig {
  slug: string;
  title: string;
  tagline: string;
  shortDescription: string;
  description: string;
  icon: LucideIcon;
  highlights: string[];
  details: string[];
}

export const features: FeatureConfig[] = [
  {
    slug: "overview",
    title: "Dashboard overview",
    tagline: "Your finances at a glance",
    shortDescription:
      "See your total balance, recent activity, and key insights in one place.",
    description:
      "The dashboard home gives you an instant snapshot of your financial health. View combined balances across accounts, recent transactions, and quick links to the tools you use most. No more jumping between apps or spreadsheets—everything you need is on one screen.",
    icon: Home,
    highlights: [
      "Combined balance across all accounts",
      "Recent transactions and activity feed",
      "Quick access to accounts, budgets, and goals",
    ],
    details: [
      "Your overview updates in real time as you add transactions or link accounts. Use it as your daily financial checkpoint before making spending decisions.",
      "Customize what appears on your dashboard so the metrics that matter most to you are always visible.",
    ],
  },
  {
    slug: "transactions",
    title: "Transactions",
    tagline: "Track every dollar in and out",
    shortDescription:
      "Record and categorize income and expenses with dates, notes, and attachments.",
    description:
      "Transactions are the foundation of your ledger. Add income and expenses with amount, date, category, and optional notes or attachments. Filter by date range, category, or account. Edit or delete entries anytime. Your transaction history becomes the source of truth for budgets, goals, and reports.",
    icon: ChartColumn,
    highlights: [
      "Income and expense tracking with categories",
      "Filter by date, account, category, or type",
      "Notes and attachments for receipts or context",
    ],
    details: [
      "Every transaction can be linked to an account, category, and optionally a goal or subscription. This keeps your data consistent and makes reporting accurate.",
      "Use the transactions list to reconcile accounts, review spending patterns, and prepare for tax or budget reviews.",
    ],
  },
  {
    slug: "accounts",
    title: "Accounts",
    tagline: "All your money in one place",
    shortDescription:
      "Manage bank accounts, cash, and other holdings with balances and types.",
    description:
      "Accounts represent where your money lives: checking, savings, cash, or other types. Create as many accounts as you need, set a current balance, and optionally mark a default or favorite. Each transaction is tied to an account, so you always know which balance is affected. View per-account history and totals from your dashboard.",
    icon: Wallet,
    highlights: [
      "Multiple account types: checking, savings, cash, and more",
      "Current balance and transaction history per account",
      "Star favorite accounts for quick access",
    ],
    details: [
      "Adding an account is quick: name, type, and starting balance. You can refine details later. Balances update automatically as you log transactions.",
      "Accounts are the backbone of your ledger. Use them to separate personal and business funds or to track different currencies or institutions.",
    ],
  },
  {
    slug: "categories",
    title: "Categories",
    tagline: "Organize spending your way",
    shortDescription:
      "Create custom categories for income and expenses to see where money goes.",
    description:
      "Categories let you label income and expenses (e.g. Salary, Food, Subscriptions) so you can see spending by area. Create custom categories, mark them as income or expense, and optionally add descriptions. Assign categories to transactions for accurate budgets and reports. Many users start with a few broad categories and add more as they refine their tracking.",
    icon: Tags,
    highlights: [
      "Custom categories for income and expense",
      "Assign categories to transactions for clear reporting",
      "Edit and reorganize categories anytime",
    ],
    details: [
      "Consistent categorization is the key to useful insights. Once categories are set up, selecting one when adding a transaction takes a single click.",
      "Use categories together with budgets to set limits per category and with goals to allocate savings by purpose.",
    ],
  },
  {
    slug: "subscriptions",
    title: "Subscriptions",
    tagline: "Never lose track of recurring bills",
    shortDescription:
      "Track recurring subscriptions and bills so you know exactly what you pay each month.",
    description:
      "Subscriptions and recurring bills are easy to forget. In Ledger, you can list each subscription with name, amount, and frequency. Link transactions to subscriptions so you see which payments are covered and when the next one is due. Spot unused subscriptions and plan your monthly fixed costs with confidence.",
    icon: BellRing,
    highlights: [
      "List all recurring subscriptions and bills",
      "Link transactions to subscriptions for clarity",
      "See total recurring cost and upcoming due dates",
    ],
    details: [
      "Adding a subscription helps you remember to budget for it and to review it periodically. Many users discover subscriptions they no longer use.",
      "When you log a payment, you can associate it with a subscription so your history shows exactly what each payment was for.",
    ],
  },
  {
    slug: "budgets",
    title: "Budgets",
    tagline: "Plan spending and stay on track",
    shortDescription:
      "Set monthly or custom budgets by category and monitor progress.",
    description:
      "Budgets help you decide how much to spend in each category (e.g. Food, Transport) and track progress over the month. Create a budget, set amounts per category or overall, and compare actual spending to your plan. The dashboard shows how much is left so you can adjust before overspending. Budgets work with your existing categories and transactions—no double entry.",
    icon: ChartPie,
    highlights: [
      "Set budgets by category or for the whole month",
      "See spending vs budget in one view",
      "Adjust budgets as your situation changes",
    ],
    details: [
      "Start with a few categories you want to control most. You can add more budget lines anytime. Rolling over unused amounts is a common next step for power users.",
      "Budgets are most effective when reviewed weekly. Use the dashboard and transaction filters to see which categories are ahead or behind.",
    ],
  },
  {
    slug: "goals",
    title: "Goals",
    tagline: "Save for what matters",
    shortDescription:
      "Define savings goals and track progress with target amounts and deadlines.",
    description:
      "Goals let you save with a purpose: emergency fund, vacation, down payment, or a big purchase. Create a goal with a target amount and optional deadline. Allocate money by linking transactions or transfers to the goal. Watch progress over time and celebrate milestones. Goals work alongside your accounts and categories so you always know how much is saved and how much is left to go.",
    icon: Goal,
    highlights: [
      "Create goals with target amount and optional deadline",
      "Track progress and link transactions to goals",
      "Visual progress and remaining amount",
    ],
    details: [
      "Even small regular contributions add up. Goals make it easy to see how each deposit moves you closer and to prioritize which goal to fund first.",
      "You can have multiple goals at once. Some users use one goal per big purchase or life event and adjust targets as plans change.",
    ],
  },
];

export function getFeatureBySlug(slug: string): FeatureConfig | undefined {
  return features.find((f) => f.slug === slug);
}

export function getFeatureSlugs(): string[] {
  return features.map((f) => f.slug);
}
