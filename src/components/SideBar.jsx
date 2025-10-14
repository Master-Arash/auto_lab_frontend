import React, { useState } from 'react';
import { Box, Typography, Divider, List, ListItemButton, ListItemText, Avatar } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Home, Settings, Info } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const NAV_WIDTH = 220;
const EDGE_WIDTH = 0;

export default function Sidebar() {
    const theme = useTheme();
    const [hovered, setHovered] = useState(false);
    const navigate = useNavigate();

    const direction = theme.direction; // 'ltr' or 'rtl'
    const isRTL = direction === 'rtl';

    const side = isRTL ? 'right' : 'left';

    const handleNavigate = (path) => navigate(path);

    return (
        <Box
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            sx={{
                position: 'fixed',
                top: 0,
                bottom: 0,
                [side]: 0,
                width: hovered ? NAV_WIDTH : EDGE_WIDTH,
                bgcolor: theme.palette.background.paper,
                boxShadow: hovered ? 3 : 0,
                transition: 'width 0.3s ease',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                zIndex: 1000,
                borderRight: !isRTL ? `1px solid ${theme.palette.divider}` : 'none',
                borderLeft: isRTL ? `1px solid ${theme.palette.divider}` : 'none',
            }}
        >
            {/* --- Top Section (Website name) --- */}
            <Box sx={{ p: 2, whiteSpace: 'nowrap' }}>
                {hovered && (
                    <>
                        <Typography variant="h6" fontWeight="bold">
                            Auto Lab
                        </Typography>
                        <Divider sx={{ my: 1 }} />
                    </>
                )}
            </Box>

            {/* --- Middle Section (Navigation) --- */}
            <List sx={{ flexGrow: 1 }}>
                {[
                    { text: 'Dashboard', icon: <Home />, path: '/' },
                    { text: 'Settings', icon: <Settings />, path: '/settings' },
                    { text: 'About', icon: <Info />, path: '/about' },
                ].map((item) => (
                    <ListItemButton
                        key={item.text}
                        onClick={() => handleNavigate(item.path)}
                        sx={{
                            justifyContent: hovered ? 'flex-start' : 'center',
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

            {/* --- Bottom Section (User info) --- */}
            <Box sx={{ p: 2, whiteSpace: 'nowrap' }}>
                {hovered && <Divider sx={{ mb: 1 }} />}
                <Box display="flex" alignItems="center" justifyContent={hovered ? 'flex-start' : 'center'}>
                    <Avatar sx={{ width: 32, height: 32 }} />
                    {hovered && (
                        <Box ml={2}>
                            <Typography variant="body2">Arash</Typography>
                            <Typography variant="caption" color="text.secondary">
                                Admin
                            </Typography>
                        </Box>
                    )}
                </Box>
            </Box>
        </Box>
    );
}
