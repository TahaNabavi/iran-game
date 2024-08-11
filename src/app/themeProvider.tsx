"use client"

import { ThemeProvider, createTheme } from '@mui/material/styles';
import React from 'react';


const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

export default function ThemesProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <ThemeProvider theme={darkTheme}>
            {children}
        </ThemeProvider>
    )
}