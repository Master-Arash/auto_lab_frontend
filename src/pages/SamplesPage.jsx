import { Button, Card, CardContent, CardHeader } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { useState, useEffect } from "react";
import api from "../api.js";
import { useTranslation } from "react-i18next";

export default function SamplesPage() {
  const [data, setData] = useState([]);
  const [rowCount, setRowCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();

  // Use MUI pagination model
  const [paginationModel, setPaginationModel] = useState({
    page: 0, // 0-indexed
    pageSize: 30, // fixed DRF page size
  });

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const response = await api.get("/samples/", {
          params: { page: paginationModel.page + 1 }, // DRF is 1-indexed
        });

        const raw_data = response.data.results || [];
        const rows = raw_data.map((data_item) => {
          const totalPrice = (data_item.test || [])
            .reduce((sum, t) => sum + (t.price || 0), 0)
            .toLocaleString();
          const totalGovPrice = (data_item.test || [])
            .reduce((sum, t) => sum + (t.gov_price || 0), 0)
            .toLocaleString();

          return {
            id: data_item.id,
            name: data_item.name,
            code: data_item.code,
            categories: (data_item.category || [])
              .map((c) => c.name)
              .join(", "),
            totalPrice,
            totalGovPrice,
          };
        });

        setData(rows);
        setRowCount(response.data.count || 0);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [paginationModel.page]); // refetch when page changes

  const columns = [
    {
      field: "code",
      headerName: t("code"),
      flex: 0.5,
      sortable: false,
      filterable: false,
    },
    {
      field: "name",
      headerName: t("name"),
      flex: 1,
      sortable: false,
      filterable: false,
    },
    {
      field: "categories",
      headerName: t("categories"),
      flex: 0.7,
      sortable: false,
      filterable: false,
    },
    {
      field: "totalPrice",
      headerName: t("total_price") + " (" + t("currency") + ")",
      flex: 0.5,
      sortable: false,
      filterable: false,
    },
    {
      field: "totalGovPrice",
      headerName: t("total_gov_price") + " (" + t("currency") + ")",
      flex: 0.5,
      sortable: false,
      filterable: false,
    },
  ];

  return (
    <Card sx={{ margin: 2 }}>
      <CardHeader
        title={t("samples")}
        action={
          <Button
            variant="contained"
            onClick={() => {
              navigate("/add-sample", { replace: true });
            }}
          >
            {t("add")}
          </Button>
        }
      />
      <CardContent>
        <DataGrid
          rows={data}
          columns={columns}
          rowCount={rowCount}
          loading={loading}
          disableColumnMenu
          disableColumnResize
          disableRowSelectionOnClick
          pageSizeOptions={[30]}
          paginationMode="server"
          paginationModel={paginationModel}
          onPaginationModelChange={(model) => setPaginationModel(model)}
          sx={{
            "& .MuiDataGrid-cell:focus": { outline: "none" },
            "& .MuiDataGrid-columnHeader:focus": { outline: "none" },
          }}
        />
      </CardContent>
    </Card>
  );
}
