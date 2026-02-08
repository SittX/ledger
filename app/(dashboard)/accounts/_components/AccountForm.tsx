"use client";

import { useRef } from "react";
import Form from "next/form";
import { accountUpsertAction } from "../_actions/action";
import { TAccountInsert } from "../../../../types/account";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AccountCreateSchema } from "../../../../database/schema/account";
import { Save } from "lucide-react";

export default function AccountForm(params: { data?: TAccountInsert }) {
  const data = params.data;

  const formRef = useRef<HTMLFormElement | null>(null);

  const defaultValues: Partial<TAccountInsert> = {
    title: data?.title ?? "",
    description: data?.description ?? null,
    balance: data?.balance != null ? String(data.balance) : null,
    includeInNetWorth: data?.includeInNetWorth ?? false,
    isPrimaryAccount: data?.isPrimaryAccount ?? false,
    isActive: data?.isActive ?? false,
    accountType:
      (data?.accountType as "current" | "saving" | "investment") ?? "current",
    currencyCodeId: data?.currencyCodeId ?? 1,
    userId: data?.userId ?? 1,
    id: data?.id ?? undefined,
  };

  const {
    register,
    trigger,
    formState: { errors },
  } = useForm<TAccountInsert>({
    resolver: zodResolver(AccountCreateSchema),
    defaultValues,
  });

  return (
    <Form
      ref={formRef}
      action={accountUpsertAction}
      className="space-y-6 max-w-lg border rounded-md p-6 xl:mx-auto"
    >
      <input type="hidden" name="userId" id="userId" defaultValue="1" />
      <input
        type="hidden"
        name="id"
        id="id"
        defaultValue={data?.id ? String(data.id) : ""}
      />
      <label className="floating-label">
        <span>Account Name</span>
        <input
          {...register("title")}
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
          {...register("description")}
          id="description"
          name="description"
          className="textarea w-full"
          placeholder="Description"
        />
      </label>

      <label className="floating-label">
        <span>Balance</span>
        <input
          {...register("balance")}
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
            {...register("includeInNetWorth")}
            id="includeInNetWorth"
            name="includeInNetWorth"
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
            {...register("isPrimaryAccount")}
            id="isPrimaryAccount"
            name="isPrimaryAccount"
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
            {...register("isActive")}
            id="isActive"
            name="isActive"
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
          {...register("accountType")}
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
        <label className="label " htmlFor="currencyCodeId">
          Currency
        </label>
        <select
          {...register("currencyCodeId")}
          className="select"
          name="currencyCodeId"
          aria-label="Currency"
        >
          <option value="" disabled>
            Pick an account type
          </option>
          <option value="1">MMK</option>
          <option value="2">USD</option>
          <option value="3">BHAT</option>
        </select>
      </div>

      <div className="flex items-center justify-end mt-4 space-x-2">
        <button
          type="button"
          className="btn btn-ghost"
          onClick={() => window.history.back()}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="btn btn-primary"
          onClick={async (e) => {
            e.preventDefault();
            const ok = await trigger();
            if (ok) formRef.current?.requestSubmit();
          }}
        >
          <Save size={18} />
          Save
        </button>
      </div>
    </Form>
  );
}
