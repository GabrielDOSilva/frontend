import { Routes, Route, Navigate } from 'react-router-dom';
import { useDrawerContext } from '../shared/contexts';
import { Dashboard } from '../pages';

export const AppRouts = () => {
    const { toggleDrawerOpen } = useDrawerContext();

    return (
        <Routes>
            <Route path='/pagina-inicial' element={<Dashboard/>}/>
            <Route path='*' element={<Navigate to="/pagina-inicial"/>}/>
        </Routes>

    );
};
