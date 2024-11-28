import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { Loan } from "@/api";
import { BankingLayout } from "@/layouts";
import { Products } from "@/components/Banking";

export default function LoanDetailsPage() {
  const router = useRouter();
  const { loanId } = router.query;
  const title = `Préstamo No. ${loanId}`;

  return (
    <BankingLayout title={title}>
      <Products.LoanDetails loanId={loanId} />
    </BankingLayout>
  );
}
