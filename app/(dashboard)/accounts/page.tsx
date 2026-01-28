import { DollarSign, Plus, Star } from "lucide-react";

export default function AccountPage() {
  const accounts = [
    {
      id: 1,
      type: "Checking",
      name: "Checking Account",
      balance: 2500,
      isIncludeInNetWorth: true,
      isPrimaryAcount: true,
    },
    {
      id: 2,
      type: "Saving",
      name: "Savings Account",
      balance: 10000,
      isIncludedInNetWorth: true,
      isPrimaryAccount: false,
    },
    {
      id: 3,
      type: "Credit Card",
      name: "Credit Card",
      balance: -500,
      isIncludedInNetWorth: true,
      isPrimaryAccount: false,
    },
  ];

  return (
    <div className="min-w-full">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-2xl font-bold">Accounts</h1>
          <p className="text-lg text-muted-foreground">
            Manage all of your financial accounts
          </p>
        </div>
        <div>
          <button className="btn">
            Create new Account <Plus />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {accounts.map((account) => (
          <div key={account.id} className="card min-w-60 max-w-100">
            <div className="card-title flex flex-row items-center justify-between">
              <div className="flex flex-col">
                <DollarSign />
                <p className="text-xl font-bold">{account.name}</p>
                <p className="text-md">{account.type}</p>
              </div>
              <div>
                <button className="card">
                  <Star />
                </button>
              </div>
            </CardHeader>
            <CardBody>
              <p className="text-2xl text-default-200">${account.balance}</p>
            </CardBody>
            <CardFooter>
              <div className="flex gap-3">
                <Button variant="flat" color="primary">
                  View Details
                </Button>
                <Button variant="flat" color="secondary">
                  Add Transaction
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
