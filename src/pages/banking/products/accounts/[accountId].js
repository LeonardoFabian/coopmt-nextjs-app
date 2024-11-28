import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { Account } from "@/api";
import { BankingLayout } from "@/layouts";
import { Products } from "@/components/Banking";

const accountController = new Account();

export default function AccountDetailsPage() {
  const router = useRouter();
  const { accountId } = router.query;
  const [transactions, setTransactions] = useState(null);
  const title = `Detalles de la Cuenta #${accountId}`;

  const params = {
    memberId: accountId,
    limit: 100,
    offset: 0,
    orderBy: "FECHA",
    orderDir: "DESC",
  };

  useEffect(() => {
    if (accountId) {
      (async () => {
        try {
          const transactionsResponse =
            await accountController.getAccountTransactions(
              params.memberId,
              params.limit,
              params.offset,
              params.orderBy,
              params.orderDir
            );
          console.log("transactionsResponse: ", transactionsResponse);

          setTransactions(transactionsResponse);
        } catch (error) {
          console.error("Error fetching transactions: ", error);
        }
      })();
    }
  }, [accountId]);

  return (
    <BankingLayout title={title}>
      <Products.AccountDetails
        accountId={accountId}
        transactions={transactions}
      />
    </BankingLayout>
  );
}
