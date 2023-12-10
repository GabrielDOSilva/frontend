import React, { createContext, useCallback, useContext, useMemo, useState } from "react";
import { darkTheme, lightTheme } from "../thems";
import { Box, ThemeProvider } from '@mui/material'


interface IThemeContexData {
    themeName: 'light' | 'dark';
    toggleTheme: () => void;
}

interface IThemeProviderProps {
    children: React.ReactNode
}

const ThemeContext = createContext({} as IThemeContexData);

export const useAppThemeContext = () => {
    return useContext(ThemeContext)
}

export const AppThemeProvider: React.FC<IThemeProviderProps> = ({ children }) => {
    const [themeName, setThemeName] = useState<'light' | 'dark'>('light');
    const toggleTheme = useCallback(() => {
        setThemeName(oldThemeName => oldThemeName === 'light' ? 'dark' : 'light')
    }, []);

    const theme = useMemo(() => {
        if (themeName === 'light') return lightTheme;
        return darkTheme;
    }, [themeName]);
    const themeContextValue: IThemeContexData = {
        themeName,
        toggleTheme,
    };
    return (
        <ThemeContext.Provider value={themeContextValue}>
            <ThemeProvider theme={theme}>
                <Box width='100vw' height='100vh' bgcolor={theme.palette.background.default}>
                    {children}
                </Box>
            </ThemeProvider>
        </ThemeContext.Provider>
    )
}
