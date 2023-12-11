import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { LayoutBasePagina } from '../../shared/layouts';
import { FerramentasDeDetalhes } from '../../shared/components';
import { ClientsService } from '../../shared/services/api';
import { Form } from '@unform/web';
import { TextField } from '@mui/material';


export const DetalheDeClients: React.FC = () => {
    const { id = 'nova' } = useParams<'id'>();
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);
    const [nome, setNome] = useState('');

    useEffect(() => {
        if (id !== 'nova') {
            setIsLoading(true);

            ClientsService.getById(Number(id))
                .then((result) => {
                    setIsLoading(false);

                    if (result instanceof Error) {
                        alert(result.message);
                        navigate('/clients');
                    } else {
                        setNome(result.name);
                        console.log(result);
                    }
                });
        }
    }, [id]);

    const handleSave = () => {
        console.log('Save');
      };
    


    const handleDelete = (id: number) => {
        if (window.confirm('Realmente deseja apagar?')) {
          ClientsService.deleteById(id)
            .then(result => {
              if (result instanceof Error) {
                alert(result.message);
              } else {
                alert('Registro apagado com sucesso!');
                navigate('/pessoas');
              }
            });
        }
      };
    

    return (
        <LayoutBasePagina
            titulo={id === 'nova' ? 'Novo cliente' : `Informações de: ${nome}`}
            barraDeFerramentas={
                <FerramentasDeDetalhes
                    textButtonNew='Nova'
                    showButtonSalveBack
                    showButtonNew={id !== 'nova'}
                    showButtonDelete={id !== 'nova'}
                    clickOnButtonSalve={() => handleSave}
                    clickOnButtonBack={() => { navigate('/clients') }}
                    clickOnButtonDelete={() => handleDelete(Number(id))}
                    clickOnButtonNew={() => { navigate('/clients/detalhes/nova') }}
                    clickOnButtonSalveBack={() => { }}
                />
            }
        >

            <Form onSubmit={console.log}>
            <TextField
            
            />
            </Form>
        </LayoutBasePagina>
    );
};


