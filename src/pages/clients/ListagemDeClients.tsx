import { useEffect, useMemo, useState } from 'react';
import { Icon, IconButton, LinearProgress, Pagination, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow } from '@mui/material';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { IListClients, ClientsService } from '../../shared/services/api/clientes/ClientsService';
import { FerramentasDeListagem } from '../../shared/components';
import { LayoutBasePagina } from '../../shared/layouts';
import { useDebounce } from '../../shared/hooks';
import { Environment } from '../../shared/environments';

export const ListagemDeClients: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { debounce } = useDebounce();
  const navigate = useNavigate();

  const [rows, setRows] = useState<IListClients[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);

  const busca = useMemo(() => {
    return searchParams.get('busca') || '';
  }, [searchParams]);

  const pagina = useMemo(() => {
    return Number(searchParams.get('pagina') || '1');
  }, [searchParams]);

  useEffect(() => {
    setIsLoading(true);
  
    const fetchClientData = async () => {
      try {
        const result = await ClientsService.getAll(pagina, busca);
        setIsLoading(false);
  
        if (result instanceof Error) {
          alert(result.message);
        } else {
          setTotalCount(result.totalCount);
          setRows(result.data);
        }
      } catch (error) {
        console.error(error);
        setIsLoading(false);
        alert('Erro ao buscar clientes.');
      }
    };
  
    const delayedFetch = debounce(() => {
      fetchClientData();
    });
  
   // Executa a busca inicial ao montar o componente
  
    return; // Cancela o debounce ao desmontar o componente
  }, [busca, pagina]);
  

  return (
    <LayoutBasePagina
      titulo='Listagem de clientes'
      barraDeFerramentas={
        <FerramentasDeListagem
          showSearchInput
          textSearch={busca}
          textButtonNew='Nova'
          clickOnButtonNew={() => navigate('/clients/detalhes/nova')}
          changeTextSearche={(texto) => setSearchParams({ busca: texto, pagina: '1' }, { replace: true })}
        />
      }
    >
      <TableContainer component={Paper} variant="outlined" sx={{ m: 1, width: 'auto' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Ações</TableCell>
              <TableCell>Nome completo</TableCell>
              <TableCell>email</TableCell>
              <TableCell>CPF</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell>
                  <IconButton onClick={() => navigate(`/clients/detalhes/${row.id}`)}>
                    <Icon>edit</Icon>
                  </IconButton>
                </TableCell>
                <TableCell>{`${row.firstName || ''} ${row.lastName || ''}`}</TableCell>
                <TableCell>{row.email || ''}</TableCell>
                <TableCell>{row.cpf || ''}</TableCell>
              </TableRow>
            ))}
          </TableBody>

          {totalCount === 0 && !isLoading && (
            <caption>{Environment.LISTAGEM_VAZIA}</caption>
          )}

          <TableFooter>
            {isLoading && (
              <TableRow>
                <TableCell colSpan={3}>
                  <LinearProgress variant='indeterminate' />
                </TableCell>
              </TableRow>
            )}
            {(totalCount > 0 && totalCount > Environment.LIMITE_DE_LINHAS) && (
              <TableRow>
                <TableCell colSpan={3}>
                  <Pagination
                    page={pagina}
                    count={Math.ceil(totalCount / Environment.LIMITE_DE_LINHAS)}
                    onChange={(_, newPage) => setSearchParams({ busca, pagina: newPage.toString() }, { replace: true })}
                  />
                </TableCell>
              </TableRow>
            )}
          </TableFooter>
        </Table>
      </TableContainer>
    </LayoutBasePagina>
  );
};
