import { Loan, Product, Account } from "@/api";
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks";
import { useRouter } from "next/router";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Box from "@mui/material/Box";

import styles from "./RequestList.module.scss";

const loanController = new Loan();
const productController = new Product();
const accountController = new Account();

export function RequestList() {
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
          console.log("loanRequestResponse: ", loanRequestsResponse);

          const quotationRequestsResponse =
            await productController.getUserQuotationRequests(user.id);
          console.log("quotationRequestsResponse: ", quotationRequestsResponse);

          const contributionChangeRequestsResponse =
            await accountController.getUserContributionChangeRequests(user.id);
          console.log(
            "contributionChangeRequestsResponse: ",
            contributionChangeRequestsResponse
          );

          // map and unify data
          const unifiedRequests = [
            ...loanRequestsResponse?.data?.map((request) => ({
              id: `SP-${request?.id}`,
              type: "Solicitud de Préstamo",
              amount: request?.attributes?.Monto,
              status: request?.attributes?.status?.data?.attributes?.name,
              createdAt: new Date(request?.attributes?.createdAt),
            })),
            ...quotationRequestsResponse?.data?.map((request) => ({
              id: `SC-${request?.id}`,
              type: "Solicitud de Cotización",
              description: request?.attributes?.products
                ?.map((product) => product?.name)
                .join(", "),
              status: request?.attributes?.status?.data?.attributes?.name,
              createdAt: new Date(request?.attributes?.createdAt),
            })),
            ...contributionChangeRequestsResponse?.data?.map((request) => ({
              id: `SCA-${request?.id}`,
              type: "Solicitud de Cambio de Aporte",
              changeDetails: request?.attributes?.tipo?.data?.attributes?.label,
              status: request?.attributes?.status?.data?.attributes?.name,
              createdAt: new Date(request?.attributes?.createdAt),
            })),
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
    { field: "type", headerName: "Type", flex: 2 },
    {
      field: "amount",
      headerName: "Amount",
      flex: 1,
      valueGetter: (params) => params?.row?.amount || "-",
    },
    {
      field: "description",
      headerName: "Description",
      flex: 2,
      valueGetter: (params) => params?.row?.description || "-",
    },
    {
      field: "changeDetails",
      headerName: "Change Details",
      flex: 2,
      valueGetter: (params) => params?.row?.changeDetails || "-",
    },
    { field: "status", headerName: "Status", flex: 1 },
    {
      field: "createdAt",
      headerName: "Created At",
      flex: 2,
      valueFormatter: (params) => params?.value?.toLocaleString(),
    },
  ];

  return (
    <div className={styles.requestList}>
      <h5 className={styles.title}>Request List</h5>
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
  );
}
