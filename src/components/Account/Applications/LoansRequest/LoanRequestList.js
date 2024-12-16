import { Loan, Product, Account } from "@/api";
import { Block } from "@/components/Block";
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks";
import { useRouter } from "next/router";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { fn } from "@/utils";
import { format, formatISO } from "date-fns";
import Box from "@mui/material/Box";
import classNames from "classnames";
import numeral from "numeral";
import Link from "next/link";

import styles from "./LoanRequestList.module.scss";
import { DateTime } from "luxon";

const loanController = new Loan();
const productController = new Product();
const accountController = new Account();

export function LoanRequestList() {
  const { user } = useAuth();
  const router = useRouter();
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    if (!user) {
      router.push("/");
    } else {
      (async () => {
        try {
          const loanRequestsResponse = await loanController.getUserLoanRequests(
            user.id
          );
          // console.log("loanRequestResponse: ", loanRequestsResponse);

          //   const quotationRequestsResponse =
          //     await productController.getUserQuotationRequests(user.id);
          //   console.log("quotationRequestsResponse: ", quotationRequestsResponse);

          //   const contributionChangeRequestsResponse =
          //     await accountController.getUserContributionChangeRequests(user.id);
          //   console.log(
          //     "contributionChangeRequestsResponse: ",
          //     contributionChangeRequestsResponse
          //   );

          // map and unify data
          const unifiedRequests = [
            ...loanRequestsResponse?.data?.map((request) => ({
              id: `SP${request?.id}`,
              type: "Solicitud de Préstamo",
              details: `RD$${numeral(
                request?.attributes?.Monto.toFixed(2)
              ).format("0,0.00")}`,
              status: request?.attributes?.status?.data?.attributes?.name,
              // createdAt: fn.formatDate(request?.attributes?.createdAt),
              // createdAt: new DateTime(request?.attributes?.createdAt),
              createdAt: formatISO(new Date(request?.attributes?.createdAt)),
            })),
            // ...quotationRequestsResponse?.data?.map((request) => ({
            //   id: `SC${request?.id}`,
            //   type: "Solicitud de Cotización",
            //   details: request?.attributes?.products
            //     ?.map((product) => product?.name)
            //     .join(", "),
            //   status: request?.attributes?.status?.data?.attributes?.name,
            //   createdAt: formatISO(new Date(request?.attributes?.createdAt)),
            // })),
            // ...contributionChangeRequestsResponse?.data?.map((request) => ({
            //   id: `SCA${request?.id}`,
            //   type: "Solicitud de Cambio de Aporte",
            //   details: request?.attributes?.tipo?.data?.attributes?.label,
            //   status: request?.attributes?.status?.data?.attributes?.name,
            //   createdAt: formatISO(new Date(request?.attributes?.createdAt)),
            // })),
          ];

          // sort by createdAt
          unifiedRequests.sort((a, b) => b.createdAt - a.createdAt);

          setRequests(unifiedRequests);
        } catch (error) {
          console.error("Error loading user loan requests: ", error);
        }
      })();
    }
  }, []);

  const columns = [
    { field: "id", headerName: "ID", flex: 1 },
    { field: "type", headerName: "Tipo", flex: 2 },
    {
      field: "details",
      headerName: "Detalle",
      flex: 3,
      // valueGetter: (params) => params?.row?.amount || "-",
    },
    // {
    //   field: "description",
    //   headerName: "Description",
    //   flex: 2,
    //   valueGetter: (params) => params?.row?.description || "-",
    // },
    // {
    //   field: "changeDetails",
    //   headerName: "Change Details",
    //   flex: 2,
    //   valueGetter: (params) => params?.row?.changeDetails || "-",
    // },
    {
      field: "status",
      headerName: "Estatus",
      flex: 2,
      editable: false,
      headerClassName: styles.centerAlignHeader,
      cellClassName: styles.centerAlign,
      renderCell: (params) => {
        const status = params.value;
        // let backgroundColor = "";
        // let textColor = "";

        // console.log("Estatus: ", status);

        // switch (status) {
        //   case "Recibida":
        //     backgroundColor = "#dae8fd";
        //     color: "#0087e3";
        // }

        return (
          <span
            className={classNames(styles.status, {
              [styles.recibida]: status === "Recibida",
              [styles.revision]: status === "En revisión",
              [styles.documentacionPendiente]:
                status === "Pendiente de documentación",
              [styles.espera]: status === "En espera",
              [styles.aprobada]: status === "Aprobada",
              [styles.completada]: status === "Completada",
              [styles.cancelada]: status === "Cancelada",
              [styles.rechazada]: status === "Rechazada",
            })}
          >
            {status}
          </span>
        );
      },
    },
    {
      field: "createdAt",
      headerName: "Fecha",
      flex: 3,
      // valueFormatter: (params) => params?.value?.toLocaleString(),
    },
  ];

  return (
    <div className={styles.loanRequestList}>
      <div className={styles.header}>
        <h5 className={styles.title}>Solicitudes de Préstamos</h5>
        <Link href="/formularios/solicitud-de-prestamo" className="add_button">
          Nueva Solicitud <Block.MaterialIcon icon="add" />
        </Link>
      </div>
      <div className={styles.content}>
        <Box sx={{ height: "600px", width: "100%" }}>
          <DataGrid
            rows={requests}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10, 20, 50]}
            checkboxSelection={false}
            disableRowSelectionOnClick
          />
        </Box>
      </div>
      <div className={styles.leyendas}>
        <ul>
          <li>
            <span className={styles.recibida}></span>
            Recibida
          </li>
          <li>
            <span className={styles.revision}></span>
            En revisión
          </li>
          <li>
            <span className={styles.documentacionPendiente}></span>
            Pendiente de documentación
          </li>
          <li>
            <span className={styles.espera}></span>
            En espera
          </li>
          <li>
            <span className={styles.aprobada}></span>
            Aprobada
          </li>
          <li>
            <span className={styles.completada}></span>
            Completada
          </li>
          <li>
            <span className={styles.cancelada}></span>
            Cancelada
          </li>
          <li>
            <span className={styles.rechazada}></span>
            Rechazada
          </li>
        </ul>
      </div>
    </div>
  );
}
