"use client";
import { useState, useMemo } from "react";
import Form from "next/form";
import CurrencyPickerDialog from "@/components/ui/CurrencyPickerDialog";
import { createAccountAction } from "../_actions/action";
import { getCurrency } from "@/lib/currencies";
import { Save } from "lucide-react";

// is_primary_account boolean null default false,

// currency_code_id integer null,
// icon character varying(10) null,
// color character varying(10) null default '2fc2db'::character varying,

export default function AccountCreateForm() {
  return (
    <Form
      action={createAccountAction}
      className="space-y-6 max-w-lg border rounded-md p-6 xl:mx-auto"
    >
      <input
        type="number"
        defaultValue="1"
        name="userId"
        id="userId"
        className="hidden"
      />
      <label className="floating-label">
        <span>Account Name</span>
        <input
          type="text"
          id="title"
          name="title"
          className="input w-full"
          placeholder="Account Name"
          required
        />
      </label>

      <label className="floating-label">
        <span>Description</span>
        <textarea
          id="description"
          name="description"
          className="textarea w-full"
          placeholder="Description"
        />
      </label>

      <label className="floating-label">
        <span>Balance</span>
        <input
          type="number"
          id="balance"
          name="balance"
          className="input w-full required number"
          placeholder="Balance"
          required
        />
      </label>

      <div className="space-y-2">
        <label className="label " htmlFor="includeInNetworth">
          <input
            id="includeInNetworth"
            name="includeInNetworth"
            type="checkbox"
            className="toggle toggle-sm checked:bg-primary checked:border-primary"
          />
          Include In Networth
        </label>
        <p className="text-sm text-base-content/50">
          Include this account in networth calculations
        </p>
      </div>

      <div className="space-y-2">
        <label className="label " htmlFor="primaryAccount">
          <input
            id="primaryAccount"
            name="primaryAccount"
            type="checkbox"
            className="toggle toggle-sm checked:bg-primary checked:border-primary"
          />
          Primary Account
        </label>
        <p className="text-sm text-base-content/50">
          Set this account as the primary expense account
        </p>
      </div>

      <div className="space-y-2">
        <label className="label" htmlFor="active">
          <input
            id="active"
            name="active"
            type="checkbox"
            className="toggle toggle-sm checked:bg-primary checked:border-primary"
          />
          Is Active
        </label>
        <p className="text-sm text-base-content/50">
          Toggle account visibility in the dashboard
        </p>
      </div>

      <label className="floating-label">
        <select
          defaultValue=""
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
      </label>

      <div className="space-y-2">
        <label className="label " htmlFor="currencyCode">
          Currency
        </label>
        <CurrencyField />
      </div>

      <div className="flex items-center justify-end mt-4 space-x-2">
        <button
          type="button"
          className="btn btn-ghost"
          onClick={() => window.history.back()}
        >
          Cancel
        </button>
        <button type="submit" className="btn btn-primary">
          <Save size={18} />
          Save
        </button>
      </div>
    </Form>
  );
}

function CurrencyField() {
  const [open, setOpen] = useState<boolean>(false);
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
                <span className="text-base">{selected.symbol}</span>
                <span className="">{selected.code}</span>
                <span className="text-sm text-base-content/50">
                  — {selected.shortName ?? selected.name}
                </span>
              </span>
            ) : (
              <span className="text-base-content/50">Pick a currency</span>
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
