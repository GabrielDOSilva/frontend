import { Api } from "../axios-config";

import { Environment } from "../../../environments";

export interface IDetalhesClients {
    id: number;
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

};


export interface IListClients {
    id: number;
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

};

type TClientsComTotalCount = {
    data: IListClients[];
    totalCount: number;
}

const getAll = async (pagina = 1, filter = ''): Promise<TClientsComTotalCount | Error> => {

    try {
        const urlRelativa = `/clients?_page=${pagina}&_limit=${Environment.LIMITE_DE_LINHAS}&firstName_like=${filter}`;
        const { data, headers } = await Api.get(urlRelativa);

        if (data) {
            return {
                data,
                totalCount: Number(headers['x-total-count'] || Environment.LIMITE_DE_LINHAS),
            };
        }

        return new Error('Erro ao listar os registros.')
    } catch (error) {
        console.log(error)

        return new Error((error as { message: string }).message || 'Erro ao listar os registros.')

    };

};

const getById = async (id: number): Promise<IDetalhesClients> => {
    try {
        const { data } = await Api.get(`/clients/${id}`);

        if (data) {
            return data;
        }

        throw new Error('Erro ao consultar o registro.');
    } catch (error) {
        console.error(error);
        throw new Error((error as { message: string }).message || 'Erro ao consultar o registro.');
    }
};

const updateById = async (id: number, clientData: IDetalhesClients): Promise<Error | void> => {
    try {
        await Api.put(`/clients/${id}`, clientData);
        // Se a atualização for bem-sucedida, não retorna nada (void)
    } catch (error) {
        console.log(error);
        return new Error((error as { message: string }).message || 'Erro ao atualizar o registro.');
    }
};

const deleteById = async (id: number): Promise<void | Error> => {
    try {

        await Api.delete(`/clients/${id}`);


    } catch (error) {
        console.log(error)

        return new Error((error as { message: string }).message || 'Erro ao apagar o registro.')

    };
};

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

type CreateClientData = Omit<IDetalhesClients, 'id'> & {
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
};

const create = async (clientData: CreateClientData): Promise<number | Error> => {
    try {
        const { data } = await Api.post<IDetalhesClients>('/clients', {
            email: clientData.email,

            firstName: clientData.firstName,
            lastName: clientData.lastName,
            tellFixo: clientData.tellFixo,
            celular: clientData.celular,
            cpf: clientData.cpf,

            street: clientData.street,
            city: clientData.city,
            state: clientData.state,
            postalCode: clientData.postalCode,

        });

        if (data) {
            return data.id;
        }

        return new Error('Erro ao cadastrar o registro.');
    } catch (error) {
        console.log(error);

        return new Error((error as { message: string }).message || 'Erro ao cadastrar o registro.');
    }
};



export const ClientsService = {
    create,
    getAll,
    getById,
    updateById,
    deleteById,
};
