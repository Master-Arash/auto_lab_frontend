import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { alpha, useTheme } from "@mui/material/styles";

export default function BaseDataGrid({
  rows,
  columns,
  rowCount,
  loading,
  paginationModel,
  onPaginationModelChange,
  pageSizeOptions = [30],
  ...props
}) {
  const theme = useTheme();

  return (
    <DataGrid
      rows={rows}
      columns={columns}
      rowCount={rowCount}
      loading={loading}
      disableColumnMenu
      disableColumnResize
      disableRowSelectionOnClick
      pageSizeOptions={pageSizeOptions}
      paginationMode="server"
      paginationModel={paginationModel}
      onPaginationModelChange={onPaginationModelChange}
      getRowClassName={(params) =>
        params.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd"
      }
      sx={(theme) => ({
        "& .MuiDataGrid-cell:focus": { outline: "none" },
        "& .MuiDataGrid-columnHeader:focus": { outline: "none" },

        // smooth hover & stripe transitions
        "& .MuiDataGrid-row": {
          transition: "background-color 120ms ease",
        },

        // even rows: light tint for striping
        "& .MuiDataGrid-row.even": {
          backgroundColor:
            theme.palette.mode === "light"
              ? theme.palette.grey[50]
              : theme.palette.grey[900],
        },

        // hover effect over any row
        "& .MuiDataGrid-row:hover": {
          backgroundColor:
            theme.palette.mode === "light"
              ? theme.palette.action.hover
              : theme.palette.action.selected,
        },

        // keep selected row color clear
        "& .MuiDataGrid-row.Mui-selected": {
          backgroundColor:
            theme.palette.mode === "light"
              ? theme.palette.primary.main + "20"
              : theme.palette.primary.dark + "40",
          "&:hover": {
            backgroundColor:
              theme.palette.mode === "light"
                ? theme.palette.primary.main + "30"
                : theme.palette.primary.dark + "60",
          },
        },
      })}
      {...props}
    />
  );
}
