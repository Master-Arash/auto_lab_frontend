import {Box} from "@mui/material";
import {DataGrid} from "@mui/x-data-grid";
import {useState, useEffect} from "react";
import api from "../api.js";

export default function SamplesPage() {
    const [samples, setSamples] = useState([]);
    const [rowCount, setRowCount] = useState(0);
    const [loading, setLoading] = useState(false);

    // Use MUI pagination model
    const [paginationModel, setPaginationModel] = useState({
        page: 0, // 0-indexed
        pageSize: 30, // fixed DRF page size
    });


    useEffect(() => {
        async function fetchSamples() {
            setLoading(true);
            try {
                const response = await api.get("/samples/", {
                    params: {page: paginationModel.page + 1}, // DRF is 1-indexed
                });

                const data = response.data.results || [];
                const rows = data.map((sample) => {
                    const totalPrice = (sample.test || []).reduce((sum, t) => sum + (t.price || 0), 0);
                    const totalGovPrice = (sample.test || []).reduce((sum, t) => sum + (t.gov_price || 0), 0);

                    return {
                        id: sample.id,
                        name: sample.name,
                        code: sample.code,
                        categories: (sample.category || []).map((c) => c.name).join(", "),
                        totalPrice,
                        totalGovPrice,
                    };
                });

                setSamples(rows);
                setRowCount(response.data.count || 0);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        }

        fetchSamples();
    }, [paginationModel.page]); // refetch when page changes

    const columns = [{field: "name", headerName: "Name", flex: 1, sortable: false, filterable: false}, {
        field: "code", headerName: "Code", flex: 1, sortable: false, filterable: false
    }, {
        field: "categories", headerName: "Categories", flex: 1, sortable: false, filterable: false
    }, {
        field: "totalPrice", headerName: "Total Price", flex: 1, sortable: false, filterable: false
    }, {field: "totalGovPrice", headerName: "Total Gov Price", flex: 1, sortable: false, filterable: false},];

    return (<Box sx={{width: "100%"}}>
        <DataGrid
            rows={samples}
            columns={columns.map((col) => ({
                ...col,
                flex: col.flex || 1, // use flex grow
                minWidth: col.minWidth || 120, // so columns don't shrink too much
            }))}
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
    </Box>);
}
