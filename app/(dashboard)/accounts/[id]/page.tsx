import { getAccountById } from "@/services/account.service";
import AccountUpdateForm from "../_components/AccountUpdateForm";

export default async function AccountEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  console.log("AccountID", id);
  const account = await getAccountById(Number(id));

  return <AccountUpdateForm account={account!} />;
}
