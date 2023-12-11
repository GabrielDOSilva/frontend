import { Api } from "../axios-config";

import { Environment } from "../../../environments";

export interface IDetalhesClients {
    id: number;
    email: string;
    osId: number;
    name: string;
};

export interface IListClients {
    id: number;
    email: string;
    osId: number;
    name: string;
};

type TClientsComTotalCount = {
    data: IListClients[];
    totalCount: number;
}

const getAll = async (pagina = 1, filter = ''): Promise<TClientsComTotalCount | Error> => {

    try {
        const urlRelativa = `/clients?_page=${pagina}&_limit=${Environment.LIMITE_DE_LINHAS}&name_like=${filter}`;
        const { data, headers } = await Api.get(urlRelativa);
        
        if ( data ) {
            return {
                data,
                totalCount: Number(headers['x-total-count'] || Environment.LIMITE_DE_LINHAS),
            };
        }

        return new Error('Erro ao listar os registros.')
    } catch (error) {
        console.log(error)

        return new Error((error as {message:string}).message || 'Erro ao listar os registros.')

    };

};

const getById = async (id: number): Promise<IDetalhesClients | Error> => {
    try {
      const { data } = await Api.get(`/clients/${id}`);
  
      if (data) {
        return data;
      }
  
      return new Error('Erro ao consultar o registro.');
    } catch (error) {
      console.error(error);
      return new Error((error as { message: string }).message || 'Erro ao consultar o registro.');
    }
  };

const updateById = async (id: number, dados: IDetalhesClients): Promise<void | Error> => {
    try {

        await Api.put(`/clietns/${id}`, dados);
        

    } catch (error) {
        console.log(error)

        return new Error((error as {message:string}).message || 'Erro ao atualizar o registro.')

    };
};

const deleteById = async (id: number): Promise<void | Error> => {
    try {

        await Api.delete(`/clietns/${id}`);
        

    } catch (error) {
        console.log(error)

        return new Error((error as {message:string}).message || 'Erro ao apagar o registro.')

    };
};

const create = async (dados: Omit<IDetalhesClients, 'id'>): Promise<number | Error> => {
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



export const ClientsService = {
    create,
    getAll,
    getById,
    updateById,
    deleteById,
};
