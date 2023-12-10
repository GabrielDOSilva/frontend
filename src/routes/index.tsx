import { Routes, Route, Navigate } from 'react-router-dom';
import { useDrawerContext } from '../shared/contexts';
import { Dashboard } from '../pages';
import { useEffect } from 'react';

export const AppRouts = () => {
    const { setDrawerOptions } = useDrawerContext();
    useEffect(() => {
        setDrawerOptions([
          {
            icon: 'home',
            path: '/pagina-inicial',
            label: 'Página inicial',
          },
        ]);
      }, []);
    
      return (
        <Routes>
          <Route path="/pagina-inicial" element={<Dashboard />} />
    
          <Route path="*" element={<Navigate to="/pagina-inicial" />} />
        </Routes>
      );
};
