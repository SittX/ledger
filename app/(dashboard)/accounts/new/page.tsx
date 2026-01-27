import { getAllAccountsByUserId } from "@/services/account-service";

// TODO: Back navigation action
export default async function AccountCreatePage() {
  const accounts = await getAllAccountsByUserId(1);
  console.table(accounts);

  return (
    <div>
      <ul>
        {accounts.map((account) => {
          return <li key={account.id}>{account.accountType}</li>;
        })}
      </ul>
    </div>
  );
}
