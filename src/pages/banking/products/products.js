import styles from "./products.module.scss";
import { BankingLayout } from "@/layouts";
import { useAuth } from "@/hooks";
import { useRouter } from "next/router";
import classNames from "classnames";
import { Products } from "@/components/Banking";
// import { useAccount } from "@/hooks/useAccount";

export default function BankingProductsPage() {
  const { user } = useAuth();
  const router = useRouter();
  // const { loans } = useAccount();

  // console.log("useAccount: ", loans);

  if (!user) {
    router.push("/");
    return null;
  }

  return (
    <>
      <BankingLayout title="Mis Productos">
        <div className={styles.bankingProducts}>
          <Products.UserAccounts />
          <Products.UserLoans />
        </div>
      </BankingLayout>
    </>
  );
}
