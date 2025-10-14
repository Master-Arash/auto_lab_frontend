import React from 'react';
import { Box } from '@mui/material';
import Sidebar from './components/Sidebar'; // your sidebar component
import useThemeStore from './stores/themeStore';

export default function MainLayout({ children }) {
    const toggleDarkMode = useThemeStore((state) => state.toggleDarkMode);

    return (
        <Box display="flex" minHeight="100vh">
            <Sidebar onToggleTheme={toggleDarkMode} />
            <Box flexGrow={1} p={2}>
                {children}
            </Box>
        </Box>
    );
}
