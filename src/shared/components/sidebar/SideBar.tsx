import { Avatar, Box, Divider, Drawer, Icon, List, ListItemButton, ListItemIcon, ListItemText, useMediaQuery, useTheme } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import { useDrawerContext } from '../../contexts';
interface IMenuProviderProps {
    children: React.ReactNode
}


export const SideBar: React.FC<IMenuProviderProps> = ({ children }) => {
    const theme = useTheme();
    const smDown = useMediaQuery(theme.breakpoints.down('sm'));
    const { isDrawerOpen, toggleDrawer } = useDrawerContext();
    return (
        <>
            <Drawer open={isDrawerOpen} variant={smDown ? 'temporary' : 'permanent'} onClose={toggleDrawer}>
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
                            <ListItemButton>
                                <ListItemIcon>
                                    <HomeIcon />
                                </ListItemIcon>
                                <ListItemText primary="Pagina inicial" />
                            </ListItemButton>
                        </List>
                    </Box>



                </Box>
            </Drawer>

            <Box height='100vh' marginLeft={smDown ? 0:theme.spacing(28)}>
                {children}
            </Box>

        </>
    );
};

