import { useState } from "react";
import {
  Box,
  Typography,
  Divider,
  List,
  ListItemButton,
  ListItemText,
  Avatar,
  CardHeader,
  Tooltip,
  IconButton,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import {
  Science,
  Biotech,
  Category,
  Straighten,
  Brightness7,
  Brightness4,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../stores/authStore.js";
import RoleNumberToRole from "../assets/js/roleNumberToRole.js";
import { useTranslation } from "react-i18next";
import useThemeStore from "../stores/themeStore";

const NAV_WIDTH = 220;
const EDGE_WIDTH = 0;

export default function Sidebar() {
  const theme = useTheme();
  const [hovered, setHovered] = useState(false);
  const navigate = useNavigate();

  const direction = theme.direction;
  const isRTL = direction === "rtl";

  const side = isRTL ? "right" : "left";

  const { t } = useTranslation();

  const handleNavigate = (path) => navigate(path);

  const { name, role } = useAuthStore();

  const { darkMode, toggleDarkMode } = useThemeStore();

  return (
    <Box
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      sx={{
        position: "fixed",
        top: 0,
        bottom: 0,
        [side]: 0,
        width: hovered ? NAV_WIDTH : EDGE_WIDTH,
        bgcolor: theme.palette.background.paper,
        boxShadow: hovered ? 3 : 0,
        transition: "width 0.3s ease",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        zIndex: 1000,
        borderRight: !isRTL ? `1px solid ${theme.palette.divider}` : "none",
        borderLeft: isRTL ? `1px solid ${theme.palette.divider}` : "none",
      }}
    >
      <Box
        sx={{
          p: 2,
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {hovered && (
          <>
            <CardHeader
              title="Auto Lab"
              action={
                <Box
                  component="img"
                  src="/logo.svg"
                  sx={{ width: 32, height: 32 }}
                />
              }
            />
            <Divider sx={{ my: 2 }} />
          </>
        )}
      </Box>

      <List sx={{ flexGrow: 1 }}>
        {[
          {
            text: t("samples"),
            icon: <Science />,
            path: "/samples",
          },
          {
            text: t("tests"),
            icon: <Biotech />,
            path: "/tests",
          },
          {
            text: t("categories"),
            icon: <Category />,
            path: "/categories",
          },
          {
            text: t("units"),
            icon: <Straighten />,
            path: "/units",
          },
        ].map((item) => (
          <ListItemButton
            key={item.text}
            onClick={() => handleNavigate(item.path)}
            sx={{
              justifyContent: hovered ? "flex-start" : "center",
              px: 2,
            }}
          >
            {item.icon}
            {hovered && (
              <ListItemText
                primary={item.text}
                sx={{ ml: 2 }}
                primaryTypographyProps={{ noWrap: true }}
              />
            )}
          </ListItemButton>
        ))}
      </List>

      <Box sx={{ p: 2, whiteSpace: "nowrap" }}>
        {hovered && <Divider sx={{ mb: 1 }} />}
        <Box
          display="flex"
          alignItems="center"
          justifyContent={hovered ? "flex-start" : "center"}
        >
          <Avatar sx={{ width: 32, height: 32 }} />
          {hovered && (
            <Box
              ml={2}
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              sx={{ width: "100%" }}
            >
              <Box>
                <Typography variant="body2">{name}</Typography>
                <Typography variant="caption" color="text.secondary">
                  {RoleNumberToRole(role, t)}
                </Typography>
              </Box>

              <Tooltip title={darkMode ? "Light mode" : "Dark mode"}>
                <IconButton
                  size="small"
                  color="inherit"
                  onClick={toggleDarkMode}
                >
                  {darkMode ? <Brightness7 /> : <Brightness4 />}
                </IconButton>
              </Tooltip>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
}
