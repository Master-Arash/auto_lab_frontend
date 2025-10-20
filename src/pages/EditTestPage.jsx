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
import roleCheck from "../assets/js/roleCheck.js";
import n2words from "n2words";

export default function EditTestPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const back_url = "/tests";
  const [loading, setLoading] = useState(true);

  const formContext = useForm({
    defaultValues: {
      name: "",
      code: "",
      gov_price: 0,
      price: 0,
      duration: 0,
    },
  });

  if (!roleCheck("3")) {
    navigate(back_url);
  }

  const { reset } = formContext;

  useEffect(() => {
    async function fetchData() {
      try {
        let rawData = (await api.get("/get-tests", { params: { id } })).data;
        rawData = Object.values(rawData)[0];

        const data = {
          id: rawData.id,
          name: rawData.name,
          code: rawData.code,
          price: rawData.price,
          gov_price: rawData.gov_price,
          duration: rawData.duration,
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
      await api.put("/edit-test/", payload);
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
              {t("edit_test")}
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
              <TextFieldElement
                type="number"
                name="price"
                label={t("price")}
                required
                fullWidth
              />
              <Typography>
                {n2words(formContext.watch("price") || 0, {
                  lang: t("n2words_lang"),
                }) +
                  " " +
                  t("currency")}
              </Typography>
              <TextFieldElement
                type="number"
                name="gov_price"
                label={t("gov_price")}
                required
                inputProps={{ min: 0 }}
                fullWidth
              />
              <Typography>
                {n2words(formContext.watch("gov_price") || 0, {
                  lang: t("n2words_lang"),
                }) +
                  " " +
                  t("currency")}
              </Typography>
              <TextFieldElement
                type="number"
                name="duration"
                label={t("duration")}
                required
                fullWidth
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
