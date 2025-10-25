import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Chip,
  Stack,
  Typography,
} from "@mui/material";
import { FormContainer, TextFieldElement, useForm } from "react-hook-form-mui";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api.js";
import transformAutocompleteValues from "../assets/js/transformAutocompleteValues.js";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";

export default function EditFormulaPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const back_url = "/formulas";

  const [loading, setLoading] = useState(true);
  const [isLabelAActive, setIsLabelAActive] = useState(false);
  const [isLabelBActive, setIsLabelBActive] = useState(false);
  const [isLabelCActive, setIsLabelCActive] = useState(false);
  const [isLabelDActive, setIsLabelDActive] = useState(false);
  const [isLabelEActive, setIsLabelEActive] = useState(false);
  const [isFormulaValid, setIsFormulaValid] = useState(true);

  const formContext = useForm({
    defaultValues: {
      name: "",
      formula: "",
      label_a: "",
      label_b: "",
      label_c: "",
      label_d: "",
      label_e: "",
    },
  });

  const { reset, handleSubmit, setError, getValues, setValue, clearErrors } =
    formContext;

  useEffect(() => {
    async function fetchData() {
      try {
        let rawData = (await api.get("/get-formulas", { params: { id } })).data;
        rawData = Object.values(rawData)[0];

        const data = {
          id: rawData.id,
          name: rawData.name,
          formula: rawData.formula,
          label_a: rawData.label_a || "",
          label_b: rawData.label_b || "",
          label_c: rawData.label_c || "",
          label_d: rawData.label_d || "",
          label_e: rawData.label_e || "",
        };
        reset(data);

        if (data.formula.includes("a")) setIsLabelAActive(true);
        if (data.formula.includes("b")) setIsLabelBActive(true);
        if (data.formula.includes("c")) setIsLabelCActive(true);
        if (data.formula.includes("d")) setIsLabelDActive(true);
        if (data.formula.includes("e")) setIsLabelEActive(true);

        setLoading(false);
      } catch {
        navigate(back_url, { replace: true });
      }
    }

    fetchData();
  }, [id, navigate, reset]);

  function hideAllLabels() {
    setValue("label_a", "");
    setValue("label_b", "");
    setValue("label_c", "");
    setValue("label_d", "");
    setValue("label_e", "");
    setIsLabelAActive(false);
    setIsLabelBActive(false);
    setIsLabelCActive(false);
    setIsLabelDActive(false);
    setIsLabelEActive(false);
  }

  async function validateFormula() {
    const formula = getValues("formula");
    try {
      await api.post("/validate-formula/", { formula });
      hideAllLabels();
      if (formula.includes("a")) setIsLabelAActive(true);
      if (formula.includes("b")) setIsLabelBActive(true);
      if (formula.includes("c")) setIsLabelCActive(true);
      if (formula.includes("d")) setIsLabelDActive(true);
      if (formula.includes("e")) setIsLabelEActive(true);
      setIsFormulaValid(true);
      clearErrors("formula");
    } catch {
      hideAllLabels();
      setError("formula", {
        type: "server",
        message: t("errors.formula_error"),
      });
    }
  }

  const onSubmit = async (data) => {
    try {
      if (isFormulaValid) {
        let payload = transformAutocompleteValues(data);
        payload["id"] = id;
        await api.put("/edit-formula/", payload);
        navigate(back_url, { replace: true });
      }
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
              {t("edit_formula")}
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
              <Stack
                direction="row"
                spacing={2}
                width="100%"
                alignItems="center"
              >
                <TextFieldElement
                  name="formula"
                  label={t("formula")}
                  fullWidth
                  required
                  onChange={hideAllLabels}
                />
                <Chip
                  label={t("validate")}
                  color="info"
                  clickable
                  onClick={validateFormula}
                  sx={{ fontWeight: "bold", px: 1 }}
                />
              </Stack>

              {isLabelAActive && (
                <TextFieldElement
                  name="label_a"
                  label={t("label_a")}
                  fullWidth
                  required
                />
              )}
              {isLabelBActive && (
                <TextFieldElement
                  name="label_b"
                  label={t("label_b")}
                  fullWidth
                  required
                />
              )}
              {isLabelCActive && (
                <TextFieldElement
                  name="label_c"
                  label={t("label_c")}
                  fullWidth
                  required
                />
              )}
              {isLabelDActive && (
                <TextFieldElement
                  name="label_d"
                  label={t("label_d")}
                  fullWidth
                  required
                />
              )}
              {isLabelEActive && (
                <TextFieldElement
                  name="label_e"
                  label={t("label_e")}
                  fullWidth
                  required
                />
              )}
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
