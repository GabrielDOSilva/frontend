import { FerramentasDeDetalhes, FerramentasDeListagem } from "../../shared/components";
import { LayoutBasePagina } from "../../shared/layouts"


export const Dashboard: React.FC = () => {

    return (
        <LayoutBasePagina
         titulo='Página Inicial'
        barraDeFerramentas={
          (
            <FerramentasDeDetalhes showButtonSalveBack/>
          )
        }>

          Testando

        </LayoutBasePagina>
    );
};