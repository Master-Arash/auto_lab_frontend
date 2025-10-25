import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Stack,
  Typography,
  TextField,
  IconButton,
  Divider,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Autocomplete } from "@mui/material";
import { useEffect, useState } from "react";
import api from "../api.js";
import { useTranslation } from "react-i18next";

export default function TechnicianAbilitiesPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [technicianName, setTechnicianName] = useState("");
  const [abilities, setAbilities] = useState([]);
  const [allTests, setAllTests] = useState([]);
  const [newTest, setNewTest] = useState(null);

  useEffect(() => {
    const fetchAbilities = async () => {
      try {
        const res = await api.get("/get-technician-abilities/", {
          params: { id },
        });
        setTechnicianName(res.data.name || "");
        setAbilities(res.data.abilities || []);
      } catch (err) {
        console.error(err);
      }
    };
    fetchAbilities();
  }, [id]);

  useEffect(() => {
    const fetchAllTests = async () => {
      try {
        const res = await api.get("/get-tests/");
        setAllTests(res.data || []);
      } catch (err) {
        console.error(err);
      }
    };
    fetchAllTests();
  }, []);

  const handleAddTest = async () => {
    if (!newTest) return;
    try {
      await api.post("/add-technician-ability/", {
        id: id,
        test_id: newTest.id,
      });
      setAbilities((prev) => [...prev, newTest]);
      setNewTest(null);
    } catch (err) {
      console.error(err);
    }
  };

  const handleRemoveTest = async (abilityId) => {
    try {
      await api.delete("/delete-technician-ability/", {
        data: {
          id: id,
          test_id: abilityId,
        },
      });
      setAbilities((prev) => prev.filter((a) => a.id !== abilityId));
    } catch (err) {
      console.error(err);
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
          width: { xs: "90%", sm: "70%", md: "45%", lg: "40%" },
          borderRadius: 3,
          boxShadow: 3,
          display: "flex",
          flexDirection: "column",
          maxHeight: "90vh",
        }}
      >
        <CardHeader
          title={
            <Typography variant="h6" fontWeight="bold">
              {t("abilities_of") + " " + technicianName}
            </Typography>
          }
        />

        <CardContent
          sx={{ p: 3, flex: 1, display: "flex", flexDirection: "column" }}
        >
          <Stack spacing={1} mb={3}>
            {abilities.map((a) => (
              <Box
                key={a.id}
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                sx={{
                  border: "1px solid",
                  borderColor: "divider",
                  borderRadius: 2,
                  px: 2,
                  py: 1,
                }}
              >
                <Typography>{a.name}</Typography>
                <IconButton
                  color="error"
                  onClick={() => handleRemoveTest(a.id)}
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            ))}
            {abilities.length === 0 && (
              <Typography color="text.secondary" textAlign="center">
                No abilities assigned yet
              </Typography>
            )}
          </Stack>

          <Divider sx={{ mb: 3 }} />

          <Box display="flex" gap={2} alignItems="center">
            <Autocomplete
              options={allTests}
              getOptionLabel={(option) => option.name || ""}
              value={newTest}
              onChange={(_, value) => setNewTest(value)}
              renderInput={(params) => (
                <TextField {...params} label={t("new_test")} size="small" />
              )}
              sx={{ flex: 1, minWidth: 300 }}
            />

            <Button variant="contained" onClick={handleAddTest}>
              {t("add")}
            </Button>
          </Box>
        </CardContent>

        <CardActions sx={{ justifyContent: "flex-end", p: 3 }}>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => navigate("/select-technician")}
          >
            {t("back")}
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
}
