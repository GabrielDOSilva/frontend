import { BrowserRouter } from 'react-router-dom';
import { AppRouts } from './routes';
import { SideBar } from './shared/components';
import { DrawerProvider, AppThemeProvider } from './shared/contexts';

export const App = () => {

  return (

    <AppThemeProvider>  
      <DrawerProvider>
      <BrowserRouter>
        <SideBar>
          <AppRouts />
        </SideBar>
      </BrowserRouter>
    </DrawerProvider>
    </AppThemeProvider>

  );

}
