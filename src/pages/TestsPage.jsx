import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import api from "../api.js";
import { useTranslation } from "react-i18next";
import roleCheck from "../assets/js/roleCheck.js";
import BaseDataGrid from "../components/BaseDataGrid.jsx";

export default function TestsPage() {
  const [data, setData] = useState([]);
  const [rowCount, setRowCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [isPriceVisible, setIsPriceVisible] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 30,
  });

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await api.get("/tests/", {
        params: { page: paginationModel.page + 1 },
      });

      const rawData = response.data.results || [];
      const rows = rawData.map((item) => {
        const row = {
          id: item.id,
          name: item.name,
          code: item.code,
          isDeletable: item.is_deletable,
        };

        if (roleCheck("3")) {
          setIsPriceVisible(true);
          row["price"] = item.price?.toLocaleString() || "-";
          row["govPrice"] = item.gov_price?.toLocaleString() || "-";
        }

        return row;
      });

      setData(rows);
      setRowCount(response.data.count || 0);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [paginationModel.page]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleDelete = async () => {
    try {
      await api.delete("/delete-test/", { data: { id: deleteId } });
      await fetchData();
    } catch (err) {
      console.error(err);
    } finally {
      setDeleteId(null);
    }
  };

  const columns = [
    {
      field: "code",
      headerName: t("code"),
      flex: 1,
      sortable: false,
      filterable: false,
    },
    {
      field: "name",
      headerName: t("name"),
      flex: 2,
      sortable: false,
      filterable: false,
    },
  ];

  if (isPriceVisible) {
    columns.push(
      {
        field: "price",
        headerName: `${t("price")} (${t("currency")})`,
        flex: 1,
        sortable: false,
        filterable: false,
      },
      {
        field: "govPrice",
        headerName: `${t("gov_price")} (${t("currency")})`,
        flex: 1,
        sortable: false,
        filterable: false,
      },
    );
  }

  columns.push({
    field: "actions",
    headerName: t("actions"),
    flex: 1.2,
    sortable: false,
    filterable: false,
    renderCell: (params) => (
      <Box>
        <Button
          variant="outlined"
          color="primary"
          size="small"
          onClick={() => navigate(`/edit-test/${params.row.id}`)}
        >
          {t("edit")}
        </Button>

        {params.row.isDeletable && (
          <Button
            variant="outlined"
            color="error"
            size="small"
            onClick={() => setDeleteId(params.row.id)}
            sx={{ mx: 1 }}
          >
            {t("delete")}
          </Button>
        )}
      </Box>
    ),
  });

  return (
    <Card sx={{ margin: 2 }}>
      <CardHeader
        title={t("tests")}
        action={
          <Button
            variant="contained"
            onClick={() => navigate("/add-test", { replace: true })}
          >
            {t("add")}
          </Button>
        }
      />
      <CardContent>
        <BaseDataGrid
          rows={data}
          columns={columns}
          rowCount={rowCount}
          loading={loading}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
        />
      </CardContent>

      <Dialog open={!!deleteId} onClose={() => setDeleteId(null)}>
        <DialogTitle>{t("confirm_delete_title")}</DialogTitle>
        <DialogContent>
          <DialogContentText>{t("confirm_delete_message")}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteId(null)}>{t("cancel")}</Button>
          <Button onClick={handleDelete} color="error" variant="contained">
            {t("delete")}
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
}
