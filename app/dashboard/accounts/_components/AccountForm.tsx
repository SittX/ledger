'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AccountFormSchema, TAccountFormValues } from '@/database/schema/account';
import { Save } from 'lucide-react';

type AccountFormProp = {
    initialValues?: TAccountFormValues;
    onSubmit: (data: TAccountFormValues) => Promise<void>;
};

export default function AccountForm({ initialValues, onSubmit }: AccountFormProp) {
    const { register, handleSubmit, formState } = useForm<TAccountFormValues>({
        resolver: zodResolver(AccountFormSchema),
        defaultValues: initialValues,
    });

    // RHF provides the validated data object here
    async function handleOnSubmit(data: TAccountFormValues) {
        await onSubmit(data);
    }

    return (
        <form
            onSubmit={handleSubmit(handleOnSubmit)}
            className="max-w-lg space-y-6 rounded-md border p-6 xl:mx-auto">
            <label className="floating-label">
                <span>Account Name</span>
                <input
                    {...register('title')}
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
                    {...register('description')}
                    id="description"
                    name="description"
                    className="textarea w-full"
                    placeholder="Description"
                />
            </label>

            <label className="floating-label">
                <span>Balance</span>
                <input
                    {...register('balance')}
                    type="number"
                    id="balance"
                    name="balance"
                    className="input required number w-full"
                    placeholder="Balance"
                    required
                />
            </label>

            <div className="space-y-2">
                <label
                    className="label"
                    htmlFor="includeInNetworth">
                    <input
                        {...register('includeInNetWorth')}
                        id="includeInNetWorth"
                        name="includeInNetWorth"
                        type="checkbox"
                        className="toggle toggle-sm checked:bg-primary checked:border-primary"
                    />
                    Include In Networth
                </label>
                <p className="text-base-content/50 text-sm">
                    Include this account in networth calculations
                </p>
            </div>

            <div className="space-y-2">
                <label
                    className="label"
                    htmlFor="primaryAccount">
                    <input
                        {...register('isPrimaryAccount')}
                        id="isPrimaryAccount"
                        name="isPrimaryAccount"
                        type="checkbox"
                        className="toggle toggle-sm checked:bg-primary checked:border-primary"
                    />
                    Primary Account
                </label>
                <p className="text-base-content/50 text-sm">
                    Set this account as the primary expense account
                </p>
            </div>

            <div className="space-y-2">
                <label
                    className="label"
                    htmlFor="active">
                    <input
                        {...register('isActive')}
                        id="isActive"
                        name="isActive"
                        type="checkbox"
                        className="toggle toggle-sm checked:bg-primary checked:border-primary"
                    />
                    Is Active
                </label>
                <p className="text-base-content/50 text-sm">
                    Toggle account visibility in the dashboard
                </p>
            </div>

            <label className="floating-label">
                <select
                    {...register('accountType')}
                    className="select"
                    name="accountType"
                    aria-label="Account type">
                    <option
                        value=""
                        disabled>
                        Pick an account type
                    </option>
                    <option value="current">Current</option>
                    <option value="saving">Savings</option>
                    <option value="investment">Investment</option>
                </select>
            </label>
{/* 
            <div className="space-y-2">
                <label
                    className="label"
                    htmlFor="currencyCodeId">
                    Currency
                </label>
                <select
                    {...register('currencyCodeId')}
                    className="select"
                    name="currencyCodeId"
                    aria-label="Currency">
                    <option
                        value=""
                        disabled>
                        Pick an account type
                    </option>
                    <option value="1">MMK</option>
                    <option value="2">USD</option>
                    <option value="3">BHAT</option>
                </select>
            </div> */}

            <div className="mt-4 flex items-center justify-end space-x-2">
                <button
                    type="button"
                    className="btn btn-ghost"
                    onClick={() => window.history.back()}>
                    Cancel
                </button>
                <button
                    disabled={formState.isSubmitting}
                    type="submit"
                    className="btn btn-primary">
                    <Save size={18} />
                    Save
                </button>
            </div>
        </form>
    );
}
