import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Typography,
  TextField,
  CardActionArea,
  Divider,
  InputAdornment,
} from "@mui/material";
import { Search } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api.js";
import { useTranslation } from "react-i18next";

export default function SelectTechnicianPage() {
  const { t } = useTranslation();
  const [technicians, setTechnicians] = useState([]);
  const [filter, setFilter] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/get-technicians/").then((res) => setTechnicians(res.data || []));
  }, []);

  const filtered = technicians.filter((t) =>
    t.name.toLowerCase().includes(filter.toLowerCase()),
  );

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
          width: { xs: "90%", sm: "70%", md: "40%", lg: "35%" },
          borderRadius: 3,
          boxShadow: 3,
          maxHeight: "85vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <CardHeader
          title={
            <Typography variant="h6" fontWeight="bold">
              {t("select_technician")}
            </Typography>
          }
          sx={{ flexShrink: 0 }}
        />

        <CardContent
          sx={{
            p: 3,
            pt: 0,
            flex: 1,
            display: "flex",
            flexDirection: "column",
            minHeight: 0,
          }}
        >
          <TextField
            label={t("search")}
            variant="outlined"
            autoFocus
            fullWidth
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            sx={{ mb: 2 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search color="action" />
                </InputAdornment>
              ),
            }}
          />

          <Box
            sx={{
              flex: 1,
              minHeight: 0,
              overflowY: "auto",
              borderRadius: 2,
              border: "1px solid",
              borderColor: "divider",
              bgcolor: "background.paper",
            }}
          >
            {filtered.length === 0 ? (
              <Typography sx={{ p: 2, textAlign: "center" }}>
                {t("errors.no_technicians_found")}
              </Typography>
            ) : (
              filtered.map((t, index) => (
                <Box key={t.id}>
                  <CardActionArea
                    onClick={() => navigate(`/technician-abilities/${t.id}`)}
                    sx={{
                      p: 2,
                      textAlign: "left",
                      "&:hover": { bgcolor: "action.hover" },
                    }}
                  >
                    <Typography variant="body1" fontWeight="medium">
                      {t.name}
                    </Typography>
                  </CardActionArea>
                  {index !== filtered.length - 1 && <Divider />}
                </Box>
              ))
            )}
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
