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
import { FormContainer, TextFieldElement, useForm } from "react-hook-form-mui";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api.js";
import transformAutocompleteValues from "../assets/js/transformAutocompleteValues.js";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";

export default function AddCategoryPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const back_url = "/categories";
  const [loading, setLoading] = useState(true);

  const formContext = useForm({
    defaultValues: {
      name: "",
    },
  });

  const { reset } = formContext;

  useEffect(() => {
    async function fetchData() {
      try {
        let rawData = (await api.get("/get-categories", { data: { id } })).data;
        rawData = Object.values(rawData)[0];

        const data = {
          id: rawData.id,
          name: rawData.name,
        };
        reset(data);
        setLoading(false);
      } catch {
        navigate(back_url, { replace: true });
      }
    }

    fetchData();
  }, [id, navigate, reset]);

  const { handleSubmit, setError } = formContext;

  const onSubmit = async (data) => {
    try {
      let payload = transformAutocompleteValues(data);
      payload["id"] = id;
      await api.put("/edit-category/", payload);
      navigate(back_url, { replace: true });
    } catch (err) {
      const backendErrors = err.response?.data?.errors || [];
      backendErrors.forEach(({ field, message }) => {
        message = t(field) + " " + t("errors." + message);
        setError(field, { type: "server", message });
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
              {t("edit_category")}
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
