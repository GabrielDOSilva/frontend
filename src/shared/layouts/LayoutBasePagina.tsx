import { Box } from "@mui/material";
import React from "react";

interface ILayoutBaseProviderProps {
    children: React.ReactNode
} 
export const LayoutBasePagina: React.FC<ILayoutBaseProviderProps> = ({ children }) => {

    return (
        <Box>
            {children}
        </Box>
    );
};