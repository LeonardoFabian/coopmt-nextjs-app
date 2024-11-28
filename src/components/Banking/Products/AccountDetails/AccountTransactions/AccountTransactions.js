import styles from "./AccountTransactions.module.scss";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { fn } from "@/utils";
import numeral from "numeral";
import { useEffect, useState } from "react";
import { Account } from "@/api";
import classNames from "classnames";

const accountController = new Account();

export function AccountTransactions(props) {
  const { account } = props;
  console.log("account: ", account);

  const [transactions, setTransactions] = useState(null);

  const params = {
    memberId: account.accountId,
    limit: 500,
    offset: 0,
    orderBy: "FECHA",
    orderDir: "DESC",
  };

  useEffect(() => {
    if (account) {
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
          console.error("Error during get account transactions: ", error);
        }
      })();
    }
  }, []);

  if (!transactions) {
    return null;
  }

  const columns = [
    { field: "id", headerName: "No. Transacción", flex: 1 },
    {
      field: "date",
      headerName: "Fecha",
      flex: 2,
      editable: false,
    },
    {
      field: "details",
      headerName: "Detalle",
      flex: 2,
      editable: false,
    },
    {
      field: "description",
      headerName: "Descripción",
      flex: 2,
      headerClassName: styles.centerAlignHeader,
      cellClassName: styles.centerAlign,
      editable: false,
      renderCell: (params) => {
        const description = params.value;

        return (
          <span
            className={classNames(styles.description, {
              [styles.saving]: description === "Ahorro",
              [styles.withdrawal]: description === "Retiro",
            })}
          >
            {description}
          </span>
        );
      },
    },
    {
      field: "amount",
      headerName: "Monto",
      flex: 2,
      headerClassName: styles.centerAlignHeader,
      cellClassName: styles.centerAlign,
      editable: false,
    },
  ];

  let rows = [];

  transactions?.data?.forEach((transaction, index) => {
    const date = fn.formatDate(transaction.date);
    const amount = `RD$${numeral(transaction.amount.toFixed(2)).format(
      "0,0.00"
    )}`;
    rows.push({
      id: transaction.number,
      date: date,
      details: transaction.details,
      description: transaction.description,
      amount: amount,
    });
  });

  return (
    <div className={styles.accountTransactions}>
      <div className={styles.accountTransactionsWrapper}>
        <h5 className={styles.title}>Historico de Transacciones</h5>
        <Box sx={{ height: "100%", width: "100%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  page: 0,
                  pageSize: 12,
                },
              },
            }}
            pageSizeOptions={[12, 24, 36, 48, 60]}
            checkboxSelection={false}
            disableRowSelectionOnClick
          />
        </Box>
      </div>
    </div>
  );
}
