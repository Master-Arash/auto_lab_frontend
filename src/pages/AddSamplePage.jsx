import {
    Autocomplete, Box, Button, Card, CardActions, CardContent, CardHeader, Stack, TextField, Typography
} from "@mui/material";
import {useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import api from "../api.js";

export default function AddSamplePage() {
    const navigate = useNavigate();
    const [tests, setTests] = useState([]);
    const [categories, setCategories] = useState([]);


    useEffect(() => {
        async function fetchData() {
            try {
                const tests_list = (await api.get("/tests")).data
                const tests_data = tests_list.map((test) => {
                    return {
                        id: test.id, label: test.name,
                    }
                })
                setTests(tests_data);
                const categories_list = (await api.get("/categories")).data
                const categories_data = categories_list.map((category) => {
                    return {
                        id: category.id, label: category.name,
                    }
                })
                setCategories(categories_data);
            } catch (err) {
                navigate("/login", {replace: true});
            }
        }

        fetchData();
    })

    return (<Box
        sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "100vh",
            bgcolor: "background.secondary",
            p: 2,
        }}
    >
        <Card
            sx={{
                width: {xs: "90%", sm: "70%", md: "50%"}, borderRadius: 3, boxShadow: 3,
            }}
        >
            <CardHeader
                title={<Typography variant="h5" fontWeight="bold">
                    Add Sample
                </Typography>}
            />

            <CardContent sx={{p: 3}}>

                <Stack direction="column" spacing={2} width="100%">
                    <TextField label="Name" fullWidth required focused/>
                    <TextField label="Code" fullWidth required/>

                    <Autocomplete
                        disablePortal
                        multiple
                        required
                        options={categories}
                        getOptionLabel={(option) => option.label}
                        renderInput={(params) => (<TextField {...params} label="Categories" fullWidth/>)}
                    />

                    <Autocomplete
                        disablePortal
                        multiple
                        required
                        options={tests}
                        getOptionLabel={(option) => option.label}
                        renderInput={(params) => (<TextField {...params} label="Tests" fullWidth/>)}
                    />
                </Stack>
            </CardContent>

            <CardActions sx={{justifyContent: "flex-end", p: 3}}>
                <Button
                    variant="outlined"
                    onClick={() => navigate("/samples", {replace: true})}
                >
                    Back
                </Button>
                <Button variant="contained" color="primary">
                    Save
                </Button>
            </CardActions>
        </Card>
    </Box>)
}