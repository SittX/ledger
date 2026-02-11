"use client";
// id serial not null,
//   title character varying(255) null,
//   notes character varying(255) null,
//   transaction_type character varying(20) null,
//   category_id integer null,
//   goal_id integer null,
//   subscription_id integer null,
//   account_id integer null,
//   amount numeric(12, 2) not null,
//   transaction_date timestamp without time zone null,
//   attachment_id integer null,
//   user_id integer not null,
//   payee_id integer null,
//   status character varying(20) null,
//   is_deleted boolean null default false,

import { redirect } from "next/navigation";

//   reconciliation_date timestamp without time zone null,
export default function TransactionPage() {
  function handleRowClick() {
    redirect("/transactions/1");
  }

  const rows = [
    {
      date: "Feb 1, 2026",
      description: "Mobile Bills",
      category: "Subscriptions",
      amount: "- 10,000 MMK",
      amountClass: "text-error",
      rowClass: "hover:bg-base-300 hover:cursor-pointer",
      onClick: handleRowClick,
    },
    {
      date: "Feb 14, 2026",
      description: "Dinner at M Tower",
      category: "Foods",
      amount: "- 80,000 MMK",
      amountClass: "text-error",
      rowClass: "hover:bg-base-300 hover:cursor-pointer",
      onClick: handleRowClick,
    },
    {
      date: "Feb 28, 2026",
      description: "Monthly salary",
      category: "Salary",
      amount: "+ 800,000 MMK",
      amountClass: "text-success",
      rowClass: "hover:bg-base-300 hover:cursor-pointer",
      onClick: handleRowClick,
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold">Transaction History</h1>
        <p className="text-lg text-base-content/50">Recent Transactions</p>
      </div>

      <div className="overflow-x-auto">
        <table className="table table-pin-cols">
          {/* head */}
          <thead>
            <tr>
              <th>Date</th>
              <th>Description</th>
              <th>Category</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i} className={r.rowClass} onClick={r.onClick}>
                <td>{r.date}</td>
                <td>{r.description}</td>
                <td>{r.category}</td>
                <td className={r.amountClass}>{r.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
