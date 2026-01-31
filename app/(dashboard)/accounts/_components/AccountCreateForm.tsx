"use client";
import { useState, useMemo } from "react";
import Form from "next/form";
import CurrencyPickerDialog from "@/ui/CurrencyPickerDialog";
import { createAccount } from "../_actions/action";
import { getCurrency } from "@/lib/currencies";

// Include currency code
// Include account type icon
// Include primary account indicator
export default function AccountCreateForm() {
  return (
    <Form
      action={createAccount}
      className="min-w-lg max-w-xl mx-auto border border-ghost rounded-lg p-6 flex flex-col gap-4"
    >
      <div>
        <label className="label mb-2 font-medium" htmlFor="title">
          Account Name
        </label>
        <input
          type="text"
          id="title"
          name="title"
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
          className="textarea w-full"
        />
      </div>

      <div>
        <label className="label mb-2 font-medium" htmlFor="includeInNetworth">
          <input
            id="includeInNetworth"
            name="includeInNetworth"
            type="checkbox"
            className="toggle toggle-sm checked:bg-primary checked:border-primary"
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
          />
          Is Active
        </label>
        <p className="text-sm text-muted-foreground">
          Toggle account visibility in the dashboard
        </p>
      </div>

      <div>
        <select
          defaultValue=""
          className="select"
          name="accountType"
          aria-label="Account type"
        >
          <option value="" disabled>
            Pick an account type
          </option>
          <option value="checking">Checking</option>
          <option value="savings">Savings</option>
          <option value="credit_card">Credit Card</option>
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
          Create Account
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
