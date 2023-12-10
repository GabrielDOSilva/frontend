import { FerramentasDeListagem } from "../../shared/components";
import { LayoutBasePagina } from "../../shared/layouts"


export const Dashboard: React.FC = () => {

    return (
        <LayoutBasePagina
         titulo='Página Inicial'
        barraDeFerramentas={
          (
            <FerramentasDeListagem
            showSearchInput/>
          )
        }>

          Testando

        </LayoutBasePagina>
    );
};