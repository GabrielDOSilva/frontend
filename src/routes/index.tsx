import { Routes, Route, Navigate } from 'react-router-dom';
import { useDrawerContext } from '../shared/contexts';
import { Dashboard, DetalheDeClients, ListagemDeClients } from '../pages';
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
          {
            icon: 'group',
            path: '/clients',
            label: 'Clients',
          }
        ]);
      }, []);
    
      return (
        <Routes>
          <Route path="/pagina-inicial" element={<Dashboard />} />
          <Route path="/clients" element={<ListagemDeClients />} />
          <Route path="/clients/detalhes/:id" element={<DetalheDeClients/>}/>
          <Route path="*" element={<Navigate to="/pagina-inicial" />} />
        </Routes>
      );
};
