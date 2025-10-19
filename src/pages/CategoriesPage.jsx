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
import { DataGrid } from "@mui/x-data-grid";
import { useCallback, useEffect, useState } from "react";
import api from "../api.js";
import { useTranslation } from "react-i18next";

export default function CategoriesPage() {
  const [data, setData] = useState([]);
  const [rowCount, setRowCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 30,
  });

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await api.get("/categories/", {
        params: { page: paginationModel.page + 1 },
      });

      const rawData = response.data.results || [];
      const rows = rawData.map((item) => ({
        id: item.id,
        name: item.name,
      }));

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
      await api.delete("/delete-category/", { data: { id: deleteId } });
      await fetchData();
    } catch (err) {
      console.error(err);
    } finally {
      setDeleteId(null);
    }
  };

  const columns = [
    {
      field: "name",
      headerName: t("name"),
      flex: 2,
      sortable: false,
      filterable: false,
    },
    {
      field: "actions",
      headerName: t("actions"),
      flex: 1,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <Box>
          <Button
            variant="outlined"
            color="primary"
            size="small"
            onClick={() => navigate(`/edit-category/${params.row.id}`)}
          >
            {t("edit")}
          </Button>
          <Button
            variant="outlined"
            color="error"
            size="small"
            onClick={() => setDeleteId(params.row.id)}
            sx={{ mx: 1 }}
          >
            {t("delete")}
          </Button>
        </Box>
      ),
    },
  ];

  return (
    <Card sx={{ margin: 2 }}>
      <CardHeader
        title={t("categories")}
        action={
          <Button
            variant="contained"
            onClick={() => navigate("/add-category", { replace: true })}
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
          onPaginationModelChange={setPaginationModel}
          sx={{
            "& .MuiDataGrid-cell:focus": { outline: "none" },
            "& .MuiDataGrid-columnHeader:focus": { outline: "none" },
          }}
        />
      </CardContent>

      {/* 🧩 Confirm Delete Dialog */}
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
