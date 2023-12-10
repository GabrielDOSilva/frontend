import { Avatar, Box, Divider, Drawer, Icon, List, ListItemButton, ListItemIcon, ListItemText, useMediaQuery, useTheme } from '@mui/material';
import { useDrawerContext } from '../../contexts';
import { useMatch, useNavigate, useResolvedPath } from 'react-router-dom';


interface IMenuProviderProps {
    children: React.ReactNode
};

interface IListItemLinkProps {
    to: string;
    label: string;
    icon: string;
    onClick?: () => void;
};

const ListItemLink: React.FC<IListItemLinkProps> = ({ icon, label, to, onClick }) => {
    const navigate = useNavigate();
    const resolvedPath = useResolvedPath(to);
    const match = useMatch({ path: resolvedPath.pathname, end: false });
    const handleClick = () => {
        onClick?.();
        navigate(to);
    }
    return (
        <ListItemButton selected={!match} onClick={handleClick}>
            <ListItemIcon>
                <Icon>{icon}</Icon>
            </ListItemIcon>
            <ListItemText primary={label} />
        </ListItemButton>
    );
};


export const SideBar: React.FC<IMenuProviderProps> = ({ children }) => {
    const theme = useTheme();
    const smDown = useMediaQuery(theme.breakpoints.down('sm'));
    const { isDrawerOpen, toggleDrawerOpen } = useDrawerContext();
    return (
        <>
            <Drawer open={isDrawerOpen} variant={smDown ? 'temporary' : 'permanent'} onClose={toggleDrawerOpen}>
                <Box width={theme.spacing(28)} height='100%' display='flex' flexDirection='column' >

                    <Box width='100%' height={theme.spacing(20)} display='flex' alignItems='center' justifyContent='center'>
                        <Avatar
                            sx={{ height: theme.spacing(12), width: theme.spacing(12) }}
                            src="/static/images/avatar/1.jpg"
                        />
                    </Box>

                    <Divider />

                    <Box flex={1}>
                        <List component='nav'>
                            <ListItemLink
                                icon='home'
                                to='./pagina-inicial'
                                label='Página inicial'
                                onClick={smDown ? toggleDrawerOpen : undefined}
                            />
                            <ListItemLink
                                icon='dvr'
                                to='./os'
                                label='OS System'
                                onClick={smDown ? toggleDrawerOpen : undefined}
                            />
                            <ListItemLink
                                icon='noteadd'
                                to='./cadastro'
                                label='Cadastro'
                                onClick={smDown ? toggleDrawerOpen : undefined}
                            />
                        </List>
                    </Box>



                </Box>
            </Drawer>

            <Box height='100vh' marginLeft={smDown ? 0 : theme.spacing(28)}>
                {children}
            </Box>

        </>
    );
};

