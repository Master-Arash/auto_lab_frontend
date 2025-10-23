import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Stack,
  Typography,
} from "@mui/material";
import {
  AutocompleteElement,
  FormContainer,
  TextFieldElement,
  useForm,
} from "react-hook-form-mui";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api.js";
import transformAutocompleteValues from "../assets/js/transformAutocompleteValues.js";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";

export default function EditSamplePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const back_url = "/samples";
  const [loading, setLoading] = useState(true);
  const [tests, setTests] = useState([]);
  const [categories, setCategories] = useState([]);

  const formContext = useForm({
    defaultValues: {
      name: "",
      code: "",
      tests: [],
      categories: [],
    },
  });

  const { reset, handleSubmit, setError } = formContext;

  useEffect(() => {
    async function fetchData() {
      try {
        const sampleRes = await api.get("/get-samples", { params: { id } });
        const rawData = Object.values(sampleRes.data)[0];

        const [testsRes, catsRes] = await Promise.all([
          api.get("/get-tests"),
          api.get("/get-categories"),
        ]);

        const testsData = testsRes.data.map((test) => ({
          id: test.id,
          label: test.name,
        }));

        const catsData = catsRes.data.map((cat) => ({
          id: cat.id,
          label: cat.name,
        }));

        setTests(testsData);
        setCategories(catsData);

        const data = {
          id: rawData.id,
          name: rawData.name,
          code: rawData.code,
          tests:
            rawData.test?.map((t) => {
              const found = testsData.find((item) => item.id === t.id);
              return found ? found : { id: t.id, label: String(t.id) };
            }) || [],
          categories:
            rawData.category?.map((c) => {
              const found = catsData.find((item) => item.id === c.id);
              return found ? found : { id: c.id, label: String(c.id) };
            }) || [],
        };

        reset(data);
        setLoading(false);
      } catch {
        navigate(back_url, { replace: true });
      }
    }

    fetchData();
  }, [id, navigate, reset]);

  const onSubmit = async (data) => {
    try {
      const payload = { ...transformAutocompleteValues(data), id };
      await api.put("/edit-sample/", payload);
      navigate(back_url, { replace: true });
    } catch (err) {
      const backendErrors = err.response?.data?.errors || [];
      backendErrors.forEach(({ field, message }) => {
        setError(field, {
          type: "server",
          message: t(field) + " " + t("errors." + message),
        });
      });
    }
  };

  if (loading) return <Box />;

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
              {t("edit_sample")}
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
                required
                getOptionLabel={(option) => option.label}
              />
              <AutocompleteElement
                name="tests"
                label={t("tests")}
                multiple
                options={tests}
                required
                getOptionLabel={(option) => option.label}
              />
            </Stack>
          </FormContainer>
        </CardContent>

        <CardActions sx={{ justifyContent: "flex-end", p: 3 }}>
          <Button
            variant="outlined"
            onClick={() => navigate(back_url, { replace: true })}
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
