import { Button } from '@mui/material';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAppContext } from '../shared/contexts';

export const AppRouts = () => {
    const { toggleTheme } = useAppContext();

    return (
        <Routes>
            <Route path='/pagina-inicial' element={<Button variant='contained' color='primary' onClick={toggleTheme}>Teste</Button>}/>
            <Route path='*' element={<Navigate to="/pagina-inicial"/>}/>
        </Routes>

    );
};
