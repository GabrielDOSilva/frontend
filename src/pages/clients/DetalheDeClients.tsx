import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { LayoutBasePagina } from '../../shared/layouts';
import { FerramentasDeDetalhes } from '../../shared/components';
import { ClientsService, IDetalhesClients } from '../../shared/services/api';
import { Form } from '@unform/web';
import { VTextField } from '../../shared/form';
import { FormHandles } from '@unform/core';
import { Box, Grid, LinearProgress, Paper, Typography } from '@mui/material';



interface IFormsData {
    email: string;
    name: string;
    cpf: number;
}

export const DetalheDeClients: React.FC = () => {
    const { id = 'nova' } = useParams<'id'>();
    const navigate = useNavigate();

    const formRef = useRef<FormHandles>(null);

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
                        formRef.current?.setData(result);
                    }
                });
        }
    }, [id]);

    const handleSave = (dados: IFormsData) => {
        setIsLoading(true);
        if (id === 'nova') {
            ClientsService.create(dados)
                .then((result) => {
                    setIsLoading(false);
                    if (result instanceof Error) {
                        alert(result.message)
                    } else {
                        navigate(`/clients/detalhes/${result}`)
                    }
                })
        } else {
            ClientsService.updateById(Number(id), { id: Number(id), ...dados })
                .then((result) => {
                    setIsLoading(false);
                    if (result instanceof Error) {
                        alert(result.message)
                    }
                })
        }
    };



    const handleDelete = (id: number) => {
        if (window.confirm('Realmente deseja apagar?')) {
            ClientsService.deleteById(id)
                .then(result => {
                    if (result instanceof Error) {
                        alert(result.message);
                    } else {
                        alert('Registro apagado com sucesso!');
                        navigate('/clients');
                    }
                });
        }
    };


    return (
        <LayoutBasePagina
            titulo={id === 'nova' ? 'Novo cliente' : `${nome}`}
            barraDeFerramentas={
                <FerramentasDeDetalhes
                    textButtonNew='Nova'
                    showButtonSalveBack
                    showButtonNew={id !== 'nova'}
                    showButtonDelete={id !== 'nova'}
                    clickOnButtonSalve={() => formRef.current?.submitForm()}
                    clickOnButtonBack={() => { navigate('/clients') }}
                    clickOnButtonDelete={() => handleDelete(Number(id))}
                    clickOnButtonNew={() => { navigate('/clients/detalhes/nova') }}
                    clickOnButtonSalveBack={() => formRef.current?.submitForm()}
                />
            }
        >

            <Form ref={formRef} onSubmit={handleSave}>
                <Box margin={1} display='flex' flexDirection='column' component={Paper} variant='outlined'>

                    <Grid container direction='column' padding={2} spacing={2}>

                        <Grid item>
                            <LinearProgress variant='indeterminate'/>
                        </Grid>
                        <Grid item>
                            <Typography variant='h6'>
                                Dados do cliente
                            </Typography>
                        </Grid>
                        <Grid container item direction='row' flexDirection='column'>
                            <Grid item xs={12} sm={8} md={6} lg={4} xl={4}>
                                <VTextField
                                    fullWidth
                                    placeholder='Nome completo'
                                    name='name' />
                            </Grid>
                        </Grid>



                        <Grid container item direction='row'>
                            <Grid item xs={12} sm={8} md={6} lg={4} xl={4}>
                                <VTextField
                                    fullWidth
                                    placeholder='email'
                                    name='email' />
                            </Grid>
                        </Grid>



                        <Grid container item direction='row'>
                            <Grid item xs={12} sm={8} md={6} lg={4} xl={4}>
                                <VTextField
                                    fullWidth
                                    placeholder='cpf'
                                    name='cpf' />
                            </Grid>
                        </Grid>


                    </Grid>




                </Box>
            </Form>
        </LayoutBasePagina>
    );
};


