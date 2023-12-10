import { Box, Button, Icon, Paper, TextField, useTheme } from "@mui/material"

interface BarraDeFerramentasProps {
    textSearch?: string;
    showSearchInput?: boolean;
    changeTextSearche?: (text: string) => void; 
    textButtonNew?: string;
    showButtonNew?: boolean;
    clickOnButtonNew?: () => void;
}

export const BarraDeFerramentas: React.FC<BarraDeFerramentasProps> = ({
    textSearch = '',
    showSearchInput = false,
    changeTextSearche,
    clickOnButtonNew,
    textButtonNew = 'New',
    showButtonNew = true
    
}) => {
    const theme = useTheme();

    return (
        <Box
            gap={1}
            marginX={1}
            padding={1}
            paddingX={2}
            display='flex'
            alignItems='center'
            height={theme.spacing(5)}
            component={Paper}
        >

           {showSearchInput &&(
             <TextField
             size='small'
             value={textSearch}
             onChange={(e) => changeTextSearche?.(e.target.value)}
             placeholder='Pesquisar'
         />
           )}
            <Box
                flex={1}
                display='flex'
                justifyContent='end'
            >
                {showButtonNew && (
                    <Button
                    color='primary'
                    disableElevation
                    variant='contained'
                    onClick={clickOnButtonNew}
                    endIcon={<Icon>add</Icon>}
                >{textButtonNew}</Button>
                )}
            </Box>
        </Box>
    );
};