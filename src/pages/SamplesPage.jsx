import {Box, Button, Card, CardContent, CardHeader, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {DataGrid} from "@mui/x-data-grid";
import React, {useState, useEffect} from "react";
import api from "../api.js";

export default function SamplesPage() {
    const [samples, setSamples] = useState([]);
    const [rowCount, setRowCount] = useState(0);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

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
                    const totalPrice = (sample.test || []).reduce((sum, t) => sum + (t.price || 0), 0).toLocaleString();
                    const totalGovPrice = (sample.test || []).reduce((sum, t) => sum + (t.gov_price || 0), 0).toLocaleString();

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

    const columns = [{
        field: "code", headerName: "Code", flex: 0.5, sortable: false, filterable: false
    }, {field: "name", headerName: "Name", flex: 1, sortable: false, filterable: false}, {
        field: "categories", headerName: "Categories", flex: 0.7, sortable: false, filterable: false
    }, {
        field: "totalPrice", headerName: "Total Price", flex: 0.5, sortable: false, filterable: false
    }, {field: "totalGovPrice", headerName: "Total Gov Price", flex: 0.5, sortable: false, filterable: false},];

    return (<Card sx={{margin: 2}}>
        <CardHeader title="Samples"
                    action={<Button variant="contained" onClick={() => {
                        navigate("/add-sample", {replace: true})
                    }}>
                        Add
                    </Button>}
        />
        <CardContent>
            <DataGrid
                rows={samples}
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
                    "& .MuiDataGrid-cell:focus": {outline: "none"},
                    "& .MuiDataGrid-columnHeader:focus": {outline: "none"},
                }}
            />
        </CardContent>
    </Card>);
}
