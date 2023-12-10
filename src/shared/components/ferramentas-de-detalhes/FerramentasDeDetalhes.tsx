import { Box, Button, Divider, Icon, Paper, Skeleton, Typography, useMediaQuery, useTheme } from "@mui/material"

interface FerramentasDeDetalhesProps {
    textButtonNew?: string;
    showButtonNew?: boolean;
    showButtonDelete?: boolean;
    showButtonSalveBack?: boolean;
    showButtonSalve?: boolean;
    showButtonBack?: boolean;
    clickOnButtonNew?: () => void;
    clickOnButtonDelete?: () => void;
    clickOnButtonSalve?: () => void;
    clickOnButtonSalveBack?: () => void;
    clickOnButtonBack?: () => void;
    showButtonNewLoad?: boolean;
    showButtonDeleteLoad?: boolean;
    showButtonSalveBackLoad?: boolean;
    showButtonSalveLoad?: boolean;
    showButtonBackLoad?: boolean;
}

export const FerramentasDeDetalhes: React.FC<FerramentasDeDetalhesProps> = ({
    textButtonNew = 'Novo',
    showButtonNew = true,
    showButtonDelete = true,
    showButtonSalveBack = false,
    showButtonSalve = true,
    showButtonBack = true,
    showButtonNewLoad = false,
    showButtonDeleteLoad = false,
    showButtonSalveBackLoad = false,
    showButtonSalveLoad = false,
    showButtonBackLoad = false,
    clickOnButtonNew,
    clickOnButtonDelete,
    clickOnButtonSalve,
    clickOnButtonSalveBack,
    clickOnButtonBack,

}) => {
    const theme = useTheme();
    const smDown = useMediaQuery(theme.breakpoints.down('sm'));
    const mdDown = useMediaQuery(theme.breakpoints.down('md'));


    return (
        <Box
            gap={1}
            marginX={1}
            padding={1}
            paddingX={2}
            display="flex"
            alignItems="center"
            height={theme.spacing(5)}
            component={Paper}
        >
            {/*
            ----- Botão Salvar -----
            */}
            {(showButtonSalve && !showButtonSalveLoad) && (
                <Button
                    color='primary'
                    disableElevation
                    variant='contained'
                    onClick={clickOnButtonSalve}
                    startIcon={<Icon>save</Icon>}
                >
                    <Typography
                        variant='button'
                        whiteSpace='nowrap'
                        textOverflow='ellipsis'
                        overflow='hidden'

                    >Salvar
                    </Typography>
                </Button>
            )}
            {showButtonSalveLoad && (<Skeleton width={108} height={60} />)}
            {/*
            ----- Botão Salvar e voltar -----
            */}
            {(showButtonSalveBack && !showButtonSalveBackLoad && !smDown && !mdDown) && (
                <Button
                    color='primary'
                    disableElevation
                    variant='outlined'
                    onClick={clickOnButtonSalveBack}
                    startIcon={<Icon>save</Icon>}
                >
                    <Typography
                        variant='button'
                        whiteSpace='nowrap'
                        textOverflow='ellipsis'
                        overflow='hidden'

                    >Salvar e voltar
                    </Typography>
                </Button>
            )}
            {(showButtonSalveBackLoad && !smDown && !mdDown) && (<Skeleton width={180} height={60} />)}
            {/*
            ----- Botão Delete -----
            */}
            {(showButtonDelete && !showButtonDeleteLoad) && (
                <Button
                    color='primary'
                    disableElevation
                    variant='outlined'
                    onClick={clickOnButtonDelete}
                    startIcon={<Icon>delete</Icon>}
                >
                    <Typography
                        variant='button'
                        whiteSpace='nowrap'
                        textOverflow='ellipsis'
                        overflow='hidden'

                    >Apagar
                    </Typography>
                </Button>
            )}
            {showButtonDeleteLoad && (<Skeleton width={108} height={60} />)}
            {/*
            ----- Botão Novo -----
            */}
            {(showButtonNew && !showButtonNewLoad && !smDown) && (
                <Button
                    color='primary'
                    disableElevation
                    variant='outlined'
                    onClick={clickOnButtonNew}
                    startIcon={<Icon>add</Icon>}
                >
                    <Typography
                        variant='button'
                        whiteSpace='nowrap'
                        textOverflow='ellipsis'
                        overflow='hidden'

                    >{textButtonNew}
                    </Typography>
                </Button>
            )}

            {(showButtonNewLoad && !smDown) && (<Skeleton width={108} height={60} />)}


            {(
                showButtonBack &&
                (
                    showButtonNew || showButtonDelete || showButtonSalve || showButtonSalveBack
                )
            ) && (
                    <Divider variant='middle' orientation='vertical' />
                )}
                

            {(showButtonBack && !showButtonBackLoad) && (
                <Button
                    color='primary'
                    disableElevation
                    variant='outlined'
                    onClick={clickOnButtonBack}
                    startIcon={<Icon>arrow_back</Icon>}
                >
                    <Typography
                        variant='button'
                        whiteSpace='nowrap'
                        textOverflow='ellipsis'
                        overflow='hidden'

                    >Voltar
                    </Typography>
                </Button>
            )}
            {showButtonBackLoad && (<Skeleton width={108} height={60} />)}
        </Box>
    );
};