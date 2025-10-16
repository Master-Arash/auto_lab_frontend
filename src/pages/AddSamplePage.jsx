import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import {
  FormContainer,
  TextFieldElement,
  AutocompleteElement,
  useForm,
} from "react-hook-form-mui";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import api from "../api.js";
import transformAutocompleteValues from "../assets/js/transformAutocompleteValues.js";

import { useTranslation } from "react-i18next";

export default function AddSamplePage() {
  const navigate = useNavigate();
  const [tests, setTests] = useState([]);
  const [categories, setCategories] = useState([]);
  const { t } = useTranslation();

  useEffect(() => {
    async function fetchData() {
      try {
        const tests_list = (await api.get("/tests")).data;
        setTests(tests_list.map((test) => ({ id: test.id, label: test.name })));

        const categories_list = (await api.get("/categories")).data;
        setCategories(
          categories_list.map((category) => ({
            id: category.id,
            label: category.name,
          })),
        );
      } catch {
        navigate("/login", { replace: true });
      }
    }

    fetchData();
  }, [navigate]);

  const formContext = useForm({
    defaultValues: {
      name: "",
      code: "",
      categories: [],
      tests: [],
    },
  });

  const { handleSubmit, setError } = formContext;

  const onSubmit = async (data) => {
    try {
      const payload = transformAutocompleteValues(data);
      await api.post("/add-sample/", payload);
      navigate("/samples", { replace: true });
    } catch (err) {
      // Example backend error: [{ field: "name", message: "unique_error" }]
      const backendErrors = err.response?.data?.errors || [];
      backendErrors.forEach(({ field, message }) => {
        message = t(field) + " " + t("errors." + message);
        setError(field, { type: "server", message });
      });
    }
  };

  return (
    <Box
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
          width: { xs: "90%", sm: "70%", md: "50%" },
          borderRadius: 3,
          boxShadow: 3,
        }}
      >
        <CardHeader
          title={
            <Typography variant="h5" fontWeight="bold">
              {t("add_sample")}
            </Typography>
          }
        />

        <CardContent sx={{ p: 3 }}>
          <FormContainer
            formContext={formContext}
            onSuccess={handleSubmit(onSubmit)}
          >
            <Stack direction="column" spacing={2} width="100%">
              <TextFieldElement
                name="name"
                label={t("name")}
                fullWidth
                required
                autoFocus
              />
              <TextFieldElement name="code" label={t("code")} fullWidth />

              <AutocompleteElement
                name="categories"
                label={t("categories")}
                multiple
                options={categories}
                getOptionLabel={(option) => option.label}
                required
              />

              <AutocompleteElement
                name="tests"
                label={t("tests")}
                multiple
                options={tests}
                getOptionLabel={(option) => option.label}
                required
              />
            </Stack>
          </FormContainer>
        </CardContent>

        <CardActions sx={{ justifyContent: "flex-end", p: 3 }}>
          <Button
            variant="outlined"
            onClick={() => navigate("/samples", { replace: true })}
          >
            {t("back")}
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit(onSubmit)}
          >
            {t("save")}
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
}
