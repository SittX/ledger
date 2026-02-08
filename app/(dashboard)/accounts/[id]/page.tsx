import { getAccountById } from "@/services/account.service";
import AccountForm from "../_components/AccountForm";

// TODO: need to update the UI for this.
export default async function AccountEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const accountData = await getAccountById(Number(id));

  if (!accountData) {
    return <div>Account not found.</div>;
  }

  return <AccountForm data={accountData} />;
}
