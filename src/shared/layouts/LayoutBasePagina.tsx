import { Icon, IconButton, useMediaQuery, useTheme } from "@mui/material";
import { Box, Typography } from "@mui/material";
import React, { ReactNode } from "react";
import { useDrawerContext } from "../contexts";

interface ILayoutBaseProviderProps {
    titulo: string;
    barraDeFerramentas: ReactNode;
    children: React.ReactNode

}
export const LayoutBasePagina: React.FC<ILayoutBaseProviderProps> = ({ titulo, barraDeFerramentas, children }) => {
    const theme = useTheme();
    const smDown = useMediaQuery(theme.breakpoints.down('sm'));
    const mdDown = useMediaQuery(theme.breakpoints.down('md'));
    const { toggleDrawerOpen } = useDrawerContext();

    return (
        <Box height='100%' display='flex' flexDirection='column' gap={1}>
            <Box padding={1} display='flex' alignItems='center' gap={1} height={theme.spacing(smDown ? 6 : mdDown ? 8 : 12)}>
                {smDown && (
                    <IconButton onClick={toggleDrawerOpen}>
                        <Icon>menu</Icon>
                    </IconButton>
                )}
                <Typography 
                overflow='hidden'
                whiteSpace='nowrap'
                textOverflow='ellipsis'
                variant={smDown ? 'h5' : mdDown ? 'h4' : 'h3'}
                >
                    {titulo}
                </Typography>
            </Box>
            {barraDeFerramentas && (
                <Box>
                    {barraDeFerramentas}
                </Box>
            )}
            <Box flex={1} overflow='auto'>
                {children}
            </Box>
        </Box>
    );
};