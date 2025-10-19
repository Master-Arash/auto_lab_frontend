import { Button, Card, CardContent, CardHeader } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { useState, useEffect } from "react";
import api from "../api.js";
import { useTranslation } from "react-i18next";
import roleCheck from "../assets/js/roleCheck.js";

export default function TestsPage() {
  const [data, setData] = useState([]);
  const [rowCount, setRowCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [isPriceVisible, setIsPriceVisible] = useState(false);

  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 30,
  });

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const response = await api.get("/tests/", {
          params: { page: paginationModel.page + 1 },
        });

        const raw_data = response.data.results || [];
        const rows = raw_data.map((data_item) => {
          let rows = {
            id: data_item.id,
            name: data_item.name,
            code: data_item.code,
          };

          if (roleCheck("3")) {
            setIsPriceVisible(true);
            rows["price"] = data_item.price.toLocaleString();
            rows["govPrice"] = data_item.gov_price.toLocaleString();
          }

          return rows;
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
  }, [paginationModel.page]);

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
  ];
  if (isPriceVisible) {
    columns.push(
      {
        field: "price",
        headerName: t("price") + " (" + t("currency") + ")",
        flex: 0.5,
        sortable: false,
        filterable: false,
      },
      {
        field: "govPrice",
        headerName: t("gov_price") + " (" + t("currency") + ")",
        flex: 0.5,
        sortable: false,
        filterable: false,
      },
    );
  }

  return (
    <Card sx={{ margin: 2 }}>
      <CardHeader
        title={t("tests")}
        action={
          <Button
            variant="contained"
            onClick={() => {
              navigate("/add-test", { replace: true });
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
