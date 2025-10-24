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
import BaseDataGrid from "../components/BaseDataGrid.jsx";

export default function ReferenceStandardsPage() {
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
      const response = await api.get("/reference-standards/", {
        params: { page: paginationModel.page + 1 },
      });

      const rawData = response.data.results || [];
      const rows = rawData.map((item) => ({
        id: item.id,
        name: item.name,
        isDeletable: item.is_deletable,
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
      await api.delete("/delete-reference-standard/", {
        data: { id: deleteId },
      });
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
            onClick={() =>
              navigate(`/edit-reference-standard/${params.row.id}`)
            }
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
    },
  ];

  return (
    <Card sx={{ margin: 2 }}>
      <CardHeader
        title={t("reference_standards")}
        action={
          <Button
            variant="contained"
            onClick={() =>
              navigate("/add-reference-standard", { replace: true })
            }
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
