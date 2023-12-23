import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { LayoutBasePagina } from '../../shared/layouts';
import { FerramentasDeDetalhes } from '../../shared/components';
import { ClientsService, IDetalhesClients } from '../../shared/services/api';
import { VTextField, VForm, useVForms } from '../../shared/form';
import { Divider, Grid, Icon, IconButton, Paper, Typography } from '@mui/material';

interface IFormsData {
    email: string;
    tellFixo: number;
    celular: number;
    firstName: string;
    lastName: string;
    cpf: number;
    street: string;
    city: string;
    state: string;
    postalCode: string;

}






export const DetalheDeClients: React.FC = () => {
    const { formRef, save, saveAndClose, isSaveAndClose } = useVForms();
    const { id = 'nova' } = useParams<'id'>();
    const navigate = useNavigate();



    const [isLoading, setIsLoading] = useState(false);
    const [hideTypography, setHideTypography] = useState(false);
    const [clientData, setClientData] = useState<IDetalhesClients>();

    const [isNewForm, setIsNewForm] = useState(false);
    const [isEditing, setIsEditing] = useState(false);


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
                        setClientData(result);
                        formRef.current?.setData(result);
                    }
                });
        } else {
            setHideTypography(true);
            setIsNewForm(true);
        }
    }, [id]);

    const handleEditClick = () => {
        setHideTypography(true);
        setIsEditing(true);
        if (id !== 'nova') {
            setIsLoading(true);

            ClientsService.getById(Number(id))
                .then((result) => {
                    setIsLoading(false);

                    if (result instanceof Error) {
                        alert(result.message);
                        navigate('/clients');
                    } else {
                        setClientData(result);
                        formRef.current?.setData(result);
                    }
                });
        }
    };


    const handleSave = (dados: IFormsData) => {
        setIsLoading(true);
        if (id !== 'nova') {
            ClientsService.updateById(Number(id), { id: Number(id), ...dados })
                .then((result) => {
                    setIsLoading(false);
                    if (result instanceof Error) {
                        alert(result.message);
                    } else {
                        if (isSaveAndClose()) {
                            navigate('/clients');
                        } else {
                            navigate(`/clients/detalhes/${id}`)
                        }
                    }
                })
        } else {
            ClientsService.create(dados)
                .then((result) => {

                    setIsLoading(false);
                    
                    if (result instanceof Error) {
                        alert(result.message)
                    } else {

                        if (isSaveAndClose()) {
                            navigate('/clients');

                        } else {
                            navigate(`/clients/detalhes/${result}`);
                        };
                    };


                });
            setHideTypography(false);
            setIsNewForm(false)
        };

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
                    };
                });
        };
    };


    return (
        <LayoutBasePagina
            titulo={id === 'nova' ? 'Novo cliente' : `${clientData?.firstName} ${clientData?.lastName}`}
            barraDeFerramentas={
                <FerramentasDeDetalhes
                    textButtonNew='Nova'
                    showButtonSalveBack={id === 'nova' || isEditing}
                    showButtonSalve={id === 'nova' || isEditing}
                    showButtonNew={id !== 'nova' && !isEditing}
                    showButtonDelete={id !== 'nova' && !isEditing}
                    showButtonBack
                    clickOnButtonSalve={save}
                    clickOnButtonBack={() => { navigate('/clients') }}
                    clickOnButtonDelete={() => handleDelete(Number(id))}
                    clickOnButtonNew={() => { navigate('/clients/detalhes/nova') }}
                    clickOnButtonSalveBack={saveAndClose}
                />
            }
        >
            {isNewForm && !isEditing && (
                <VForm ref={formRef} onSubmit={handleSave}>
                    <Grid item component={Paper} variant='outlined' margin={1} padding={1}>
                        <Typography align='center' margin={1} variant="h4"><strong>Cadastro de cliente</strong></Typography>
                        <>
                            <Grid item xs={12}>
                                <Divider />
                            </Grid>
                            <Grid container>

                                <Typography margin={1} variant='h5'><strong>Dados gerais</strong></Typography>
                            </Grid>
                            <br />
                            <Grid container spacing={3}>
                                <Grid item xs={12} sm={6} md={4} lg={4}>
                                    <Typography margin={1}><strong>Nome</strong></Typography>
                                    <VTextField
                                        fullWidth
                                        name="firstName"


                                    />
                                </Grid>
                                <Grid item xs={12} sm={6} md={4} lg={4}>
                                    <Typography margin={1}><strong>Sobrenome</strong></Typography>
                                    <VTextField
                                        fullWidth
                                        name="lastName"


                                    />
                                </Grid>
                                <Grid item xs={12} sm={6} md={4} lg={4}>
                                    <Typography margin={1}><strong>CPF</strong></Typography>
                                    <VTextField
                                        fullWidth
                                        name="cpf"


                                    />
                                </Grid>

                            </Grid>
                            <br />
                            <Grid item sx={{ width: 'auto' }}>
                                <Typography margin={1} variant='h5'><strong>Dados de contato</strong></Typography>
                            </Grid>
                            <br />
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={8} md={4}>
                                    <Typography margin={1}><strong>Telefone</strong></Typography>
                                    <VTextField
                                        fullWidth
                                        name="tellFixo"

                                    />
                                </Grid>
                                <Grid item xs={12} sm={8} md={4}>
                                    <Typography margin={1}><strong>Celular</strong></Typography>
                                    <VTextField
                                        fullWidth
                                        name="celular"

                                    />
                                </Grid>
                                <Grid item xs={12} sm={8} md={4}>
                                    <Typography margin={1}><strong>Email</strong></Typography>
                                    <VTextField
                                        fullWidth
                                        name="email"

                                    />
                                </Grid>

                            </Grid>
                            <br />
                            <Grid item sx={{ width: 'auto' }}>
                                <Typography margin={1} variant='h5'><strong>Endereço</strong></Typography>
                            </Grid>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={8} md={4}>
                                    <Typography margin={1}><strong>Rua</strong></Typography>
                                    <VTextField
                                        fullWidth
                                        name="street"


                                    />
                                </Grid>
                                <Grid item xs={12} sm={8} md={4}>
                                    <Typography margin={1}><strong>Cidade</strong></Typography>
                                    <VTextField
                                        fullWidth
                                        name="city"

                                    />
                                </Grid>
                                <Grid item xs={12} sm={8} md={4}>
                                    <Typography margin={1}><strong>Estado</strong></Typography>
                                    <VTextField
                                        fullWidth
                                        name="state"


                                    />
                                </Grid>
                                <Grid item xs={12} sm={8} md={4}>
                                    <Typography margin={1}><strong>CEP</strong></Typography>
                                    <VTextField
                                        fullWidth
                                        name="postalCpde"

                                    />
                                </Grid>

                            </Grid>


                        </>

                    </Grid>


                    {/* ... (outros detalhes do cliente) */}
                </VForm>
            )}

            {!isNewForm && (

                isEditing ? (
                    <VForm ref={formRef} onSubmit={handleSave} >
                        <Grid item component={Paper} variant='outlined' margin={1} padding={1}>
                            <Typography align='center' margin={2} variant="h4"><strong>Atualizar dados do cliente </strong></Typography>
                            <br />
                            <Grid item xs={12}>
                                <Divider />
                            </Grid>
                            <Grid container>

                                <Typography margin={1} variant='h5'><strong>Dados gerais</strong></Typography>
                            </Grid>
                            <br />
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6} md={4} lg={4}>
                                    <Typography margin={1}><strong>Nome</strong></Typography>
                                    <VTextField
                                        fullWidth
                                        name="firstName"



                                    />
                                </Grid>
                                <Grid item xs={12} sm={6} md={4} lg={4}>
                                    <Typography margin={1}><strong>Sobrenome</strong></Typography>
                                    <VTextField
                                        fullWidth
                                        name="lastName"


                                    />
                                </Grid>
                                <Grid item xs={12} sm={6} md={4} lg={4}>
                                    <Typography margin={1}><strong>CPF</strong></Typography>
                                    <VTextField
                                        fullWidth
                                        name="cpf"



                                    />
                                </Grid>

                            </Grid>
                            <br />
                            <Grid item sx={{ width: 'auto' }}>
                                <Typography margin={1} variant='h5'><strong>Dados de contato</strong></Typography>
                            </Grid>
                            <br />
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6} md={4} lg={4}>
                                    <Typography margin={1}><strong>Telefone</strong></Typography>
                                    <VTextField
                                        fullWidth
                                        name="tellFixo"

                                    />
                                </Grid>
                                <Grid item xs={12} sm={6} md={4} lg={4}>
                                    <Typography margin={1}><strong>Celular</strong></Typography>
                                    <VTextField
                                        fullWidth
                                        name="celular"

                                    />
                                </Grid>
                                <Grid item xs={12} sm={6} md={4} lg={4}>
                                    <Typography margin={1}><strong>Email</strong></Typography>
                                    <VTextField
                                        fullWidth
                                        name="email"

                                    />
                                </Grid>

                            </Grid>
                            <br />
                            <Grid item sx={{ width: 'auto' }}>
                                <Typography margin={1} variant='h5'><strong>Endereço</strong></Typography>
                            </Grid>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6} md={4} lg={4}>
                                    <Typography margin={1}><strong>Rua</strong></Typography>
                                    <VTextField
                                        fullWidth
                                        name="street"

                                    />
                                </Grid>
                                <Grid item xs={12} sm={6} md={4} lg={4}>
                                    <Typography margin={1}><strong>Cidade</strong></Typography>
                                    <VTextField
                                        fullWidth
                                        name="city"

                                    />
                                </Grid>
                                <Grid item xs={12} sm={6} md={4} lg={4}>
                                    <Typography margin={1}><strong>Estado</strong></Typography>
                                    <VTextField
                                        fullWidth
                                        name="state"

                                    />
                                </Grid>
                                <Grid item xs={12} sm={6} md={4} lg={4}>
                                    <Typography margin={1}><strong>CEP</strong></Typography>
                                    <VTextField
                                        fullWidth
                                        name="postalCode"

                                    />
                                </Grid>

                            </Grid>




                        </Grid>


                        {/* ... (outros detalhes do cliente) */}
                    </VForm>

                ) : (
                    <>

                        <Grid container component={Paper} spacing={1} style={{ display: hideTypography ? 'none' : 'flex' }} direction='column' sx={{ m: 1, p: 2, width: 'auto' }}>
                            <Grid item xs={12} sm={8} md={4}>
                                <Typography align='center' margin={1} variant="h4"><strong>Dados do Cliente</strong></Typography>
                                <Divider />
                            </Grid>
                            <Grid item container direction='row' justifyContent='center' xs={12} sm={8} md={4}>
                                <Grid item xs={12} sm={8} md={4}>
                                    <Typography variant="h6"><strong>{`Dados gerais:`}</strong></Typography>
                                    <br />
                                    <Typography><strong>Nome:    </strong>{`${clientData?.firstName} ${clientData?.lastName}`}</Typography>
                                    <Typography><strong>CPF:    </strong> {clientData?.cpf}</Typography>
                                </Grid>
                                <Grid item xs={12} sm={8} md={4}>
                                    <Typography variant="h6"><strong>Informações de Contato</strong></Typography>
                                    <br />
                                    <Typography><strong>Email:</strong> {clientData?.email}</Typography>
                                    <Typography><strong>Telefone:</strong> {clientData?.tellFixo || 'Não disponível'}</Typography>
                                    <Typography><strong>Celular:</strong> {clientData?.celular || 'Não disponível'}</Typography>
                                </Grid>
                                <Grid item xs={12} sm={8} md={4}>
                                    <Typography variant="h6"><strong>Endereço</strong></Typography>
                                    <br />
                                    <Typography><strong>Rua:</strong> {clientData?.street}</Typography>
                                    <Typography><strong>Cidade:</strong> {clientData?.city}</Typography>
                                    <Typography><strong>Estado:</strong> {clientData?.state}</Typography>
                                    <Typography><strong>CEP:</strong> {clientData?.postalCode}</Typography>
                                </Grid>

                                <Grid item display='flx' alignItems='right' justifyContent="right">
                                    <IconButton
                                        component={Paper}
                                        onClick={handleEditClick}>
                                        <Icon>edit</Icon>
                                    </IconButton>
                                </Grid>
                            </Grid>
                        </Grid>
                    </>
                )
            )}

        </LayoutBasePagina >

    )
};


export default DetalheDeClients;
