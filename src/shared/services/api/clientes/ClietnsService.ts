import { Api } from "../axios-config";

import { Environment } from "../../../environments";

interface IDetalhesClients {
    id: number;
    email: string;
    osId: number;
    name: string;
};

interface IListClients {
    id: number;
    email: string;
    osId: number;
    name: string;
};

type TClientsComTotalCount = {
    data: IListClients[];
    totalCount: number;
}

const GetAll = async (page = 1, filter = ''): Promise<TClientsComTotalCount | Error> => {

    try {
        const urlRelativa = `/clients?_page=${page}&_limit=${Environment.LIMITE_DE_LINHAS}$name_like=${filter}`;
        const { data, headers } = await Api.get(urlRelativa);
        
        if ( data ) {
            return {
                data,
                totalCount: Number(headers['x-total-data'] || Environment.LIMITE_DE_LINHAS),
            };
        }

        return new Error('Erro ao listar os registros.')
    } catch (error) {
        console.log(error)

        return new Error((error as {message:string}).message || 'Erro ao listar os registros.')

    };

};

const GetById = async (id : 1): Promise<IDetalhesClients | Error> => {
    try {

        const { data} = await Api.get(`/clietns/${id}`);
        
        if ( data ) {
            return data  
        }

        return new Error('Erro ao consultar os registros.')
    } catch (error) {
        console.log(error)

        return new Error((error as {message:string}).message || 'Erro ao consultar os registros.')

    };
};

const UpdateById = async (id: number, dados: IDetalhesClients): Promise<void | Error> => {
    try {

        await Api.put(`/clietns/${id}`, dados);
        

    } catch (error) {
        console.log(error)

        return new Error((error as {message:string}).message || 'Erro ao atualizar o registro.')

    };
};

const DeleteById = async (id: number): Promise<void | Error> => {
    try {

        await Api.delete(`/clietns/${id}`);
        

    } catch (error) {
        console.log(error)

        return new Error((error as {message:string}).message || 'Erro ao apagar o registro.')

    };
};

const Create = async (dados: Omit<IDetalhesClients, 'id'>): Promise<number | Error> => {
    try {

        const { data} = await Api.post<IDetalhesClients>('/clietns', dados);
        
        if ( data ) {
            return data.id; 
        }

        return new Error('Erro ao gadastrar o registro.')
    } catch (error) {
        console.log(error)

        return new Error((error as {message:string}).message || 'Erro ao gadastrar o registro.')

    };
};    



export const CliensService = {
    Create,
    GetAll,
    GetById,
    UpdateById,
    DeleteById,
};
