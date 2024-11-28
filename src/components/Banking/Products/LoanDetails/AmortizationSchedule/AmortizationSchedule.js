import styles from "./AmortizationSchedule.module.scss";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { fn } from "@/utils";
import numeral from "numeral";
import { useEffect, useState } from "react";
import { Loan } from "@/api";
import classNames from "classnames";
import { useAuth } from "@/hooks";
import { useRouter } from "next/router";

const loanController = new Loan();

export function AmortizationSchedule(props) {
  const { loan } = props;
  console.log("loan: ", loan);
  const { user } = useAuth();
  const router = useRouter();

  const [amortizations, setAmortizations] = useState(null);

  // useEffect(() => {
  //   if (!user) {
  //     router.push("/");
  //   }
  // }, []);

  useEffect(() => {
    if (loan) {
      (async () => {
        try {
          const amortizationsResponse =
            await loanController.getLoanAmortizationSchedule(loan.loanId);
          console.log("amortizationsResponse: ", amortizationsResponse);
          setAmortizations(amortizationsResponse);
        } catch (error) {
          console.error("Error during get amortization schedule: ", error);
        }
      })();
    }
  }, []);

  // if (!amortizations) {
  //   return null;
  // }

  const columns = [
    { field: "id", headerName: "No. Cuota", flex: 1 },
    { field: "date", headerName: "Fecha", flex: 2, editable: false },
    {
      field: "principalAmount",
      headerName: "Capital",
      flex: 2,
      headerClassName: styles.centerAlignHeader,
      cellClassName: styles.centerAlign,
      editable: false,
    },
    {
      field: "principalBalance",
      headerName: "Balance Capital",
      flex: 2,
      headerClassName: styles.centerAlignHeader,
      cellClassName: styles.centerAlign,
      editable: false,
    },
    {
      field: "interestAmount",
      headerName: "Interes",
      flex: 2,
      headerClassName: styles.centerAlignHeader,
      cellClassName: styles.centerAlign,
      editable: false,
    },
    {
      field: "interestBalance",
      headerName: "Balance Interes",
      flex: 2,
      headerClassName: styles.centerAlignHeader,
      cellClassName: styles.centerAlign,
      editable: false,
    },
    {
      field: "status",
      headerName: "Estatus",
      flex: 2,
      editable: false,
      headerClassName: styles.centerAlignHeader,
      cellClassName: styles.centerAlign,
      renderCell: (params) => {
        const status = params.value;
        let backgroundColor = "";
        let textColor = "";

        if (status === "Pagado") {
          backgroundColor = "#e9f7eb";
          textColor = "#6aba46";
        } else {
          backgroundColor = "#f8dae2";
          textColor = "#ee2a24";
        }

        return (
          <span
            className={classNames(styles.status, {
              [styles.paid]: status === "Pagado",
              [styles.pending]: status === "Pendiente",
            })}
          >
            {status}
          </span>
        );
      },
    },
  ];

  let rows = [];

  amortizations?.data?.forEach((amortization, index) => {
    const date = fn.formatDate(amortization?.installmentDate);
    const principalAmount = `RD$${numeral(
      amortization?.installmentPrincipalAmount?.toFixed(2)
    ).format("0,0.00")}`;
    const principalBalance = `RD$${numeral(
      amortization?.installmentPrincipalBalance?.toFixed(2)
    ).format("0,0.00")}`;
    const interestAmount = `RD$${numeral(
      amortization?.installmentInterestAmount?.toFixed(2)
    ).format("0,0.00")}`;
    const interestBalance = `RD$${numeral(
      amortization?.installmentInterestBalance?.toFixed(2)
    ).format("0,0.00")}`;
    const status =
      amortization?.installmentStatus === "P" ? "Pagado" : "Pendiente";

    rows.push({
      id: amortization?.installmentNumber,
      date: date,
      principalAmount: principalAmount,
      principalBalance: principalBalance,
      interestAmount: interestAmount,
      interestBalance: interestBalance,
      status: status,
    });
  });

  return (
    <div className={styles.amortizationSchedule}>
      <div className={styles.amortizationScheduleWrapper}>
        <h5 className={styles.title}>Tabla de Amortización</h5>
        {amortizations && (
          <Box sx={{ height: "100%", width: "100%" }}>
            <DataGrid
              rows={rows}
              columns={columns}
              initialState={{
                pagination: { paginationModel: { page: 0, pageSize: 12 } },
              }}
              pageSizeOptions={[12, 24, 36, 48, 60]}
              checkboxSelection={false}
              disableRowSelectionOnClick
            />
          </Box>
        )}
      </div>
    </div>
  );
}
