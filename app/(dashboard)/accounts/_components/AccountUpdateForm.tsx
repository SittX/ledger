"use client";
import { useState, useMemo } from "react";
import Form from "next/form";
import CurrencyPickerDialog from "@/components/ui/CurrencyPickerDialog";
import { updateAccountAction } from "../_actions/action";
import { getCurrency } from "@/lib/currencies";
import { TAccount } from "@/schemas/account";

// is_primary_account boolean null default false,

// currency_code_id integer null,
// icon character varying(10) null,
// color character varying(10) null default '2fc2db'::character varying,

export default function AccountUpdateForm({ account }: { account: TAccount }) {
  return (
    <Form
      action={updateAccountAction.bind(null, account.id)}
      className="min-w-lg max-w-xl mx-auto border border-ghost rounded-lg p-6 flex flex-col gap-4"
    >
      <input
        type="number"
        defaultValue={account.userId}
        name="userId"
        id="userId"
        className="hidden"
      />
      <input
        type="number"
        defaultValue={account.id}
        name="id"
        id="id"
        className="hidden"
      />
      <div>
        <label className="label mb-2 font-medium" htmlFor="title">
          Account Name
        </label>
        <input
          type="text"
          id="title"
          name="title"
          defaultValue={account.title}
          className="input w-full"
          required
        />
      </div>

      <div className="md:col-span-2">
        <label className="label mb-2 font-medium" htmlFor="description">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          defaultValue={account.description ?? ""}
          className="textarea w-full"
        />
      </div>

      <div>
        <label className="label mb-2 font-medium" htmlFor="balance">
          Balance
        </label>
        <input
          type="number"
          id="balance"
          name="balance"
          className="input w-full required number"
          defaultValue={account.balance ?? 0}
          required
        />
      </div>

      <div>
        <label className="label mb-2 font-medium" htmlFor="includeInNetworth">
          <input
            id="includeInNetworth"
            name="includeInNetworth"
            type="checkbox"
            className="toggle toggle-sm checked:bg-primary checked:border-primary"
            defaultChecked={account.includeInNetWorth ? true : false}
          />
          Include In Networth
        </label>
        <p className="text-sm text-muted-foreground">
          Include this account in networth calculations
        </p>
      </div>

      <div>
        <label className="label mb-2 font-medium" htmlFor="primaryAccount">
          <input
            id="primaryAccount"
            name="primaryAccount"
            type="checkbox"
            className="toggle toggle-sm checked:bg-primary checked:border-primary"
            defaultChecked={account.isPrimaryAccount ? true : false}
          />
          Primary Account
        </label>
        <p className="text-sm text-muted-foreground">
          Set this account as the primary expense account
        </p>
      </div>

      <div>
        <label className="label mb-2 font-medium" htmlFor="active">
          <input
            id="active"
            name="active"
            type="checkbox"
            className="toggle toggle-sm checked:bg-primary checked:border-primary"
            defaultChecked={account.isActive ? true : false}
          />
          Is Active
        </label>
        <p className="text-sm text-muted-foreground">
          Toggle account visibility in the dashboard
        </p>
      </div>

      <div>
        <select
          defaultValue={account.accountType ?? ""}
          className="select"
          name="accountType"
          aria-label="Account type"
        >
          <option value="" disabled>
            Pick an account type
          </option>
          <option value="current">Current</option>
          <option value="saving">Savings</option>
          <option value="investment">Investment</option>
        </select>
      </div>

      <div>
        <label className="label mb-2 font-medium" htmlFor="currencyCode">
          Currency
        </label>
        <CurrencyField />
      </div>

      <div className="flex justify-end mt-4 md:col-span-2">
        <button
          type="button"
          className="btn btn-error text-white"
          onClick={() => window.history.back()}
        >
          Cancel
        </button>
        <button type="submit" className="btn btn-primary ml-2">
          Update Account
        </button>
      </div>
    </Form>
  );
}

function CurrencyField() {
  const [open, setOpen] = useState(false);
  // keep an empty string as the controlled value (simpler to serialize)
  const [currency, setCurrency] = useState<string>("");

  // memoize lookup to avoid recalculating on every render
  const selected = useMemo(
    () => (currency ? getCurrency(currency) : undefined),
    [currency],
  );

  return (
    <>
      <input type="hidden" name="currencyCode" value={currency} />

      <div className="flex items-center gap-2">
        <button
          type="button"
          className="btn btn-outline flex-1 justify-between text-left"
          onClick={() => setOpen(true)}
          aria-haspopup="dialog"
          aria-expanded={open}
        >
          <span>
            {selected ? (
              <span className="flex items-center gap-2">
                <span className="text-sm">{selected.symbol}</span>
                <span className="font-medium">{selected.code}</span>
                <span className="text-sm text-muted-foreground">
                  — {selected.shortName ?? selected.name}
                </span>
              </span>
            ) : (
              <span className="text-muted-foreground">Pick a currency</span>
            )}
          </span>
          <span className="opacity-70">▾</span>
        </button>
      </div>

      <CurrencyPickerDialog
        open={open}
        onOpenChange={setOpen}
        value={currency}
        onSelect={(code) => setCurrency(code ?? "")}
      />
    </>
  );
}
