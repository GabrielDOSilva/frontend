import { Button } from '@mui/material';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useDrawerContext } from '../shared/contexts';

export const AppRouts = () => {
    const { toggleDrawer } = useDrawerContext();

    return (
        <Routes>
            <Route path='/pagina-inicial' element={<Button variant='contained' color='primary' onClick={toggleDrawer}>Teste</Button>}/>
            <Route path='*' element={<Navigate to="/pagina-inicial"/>}/>
        </Routes>

    );
};
