import { BrowserRouter } from 'react-router-dom';
import { AppRouts } from './routes';
import { ThemeProvider } from '@mui/material';
import { darkTheme, lightTheme  } from './shared/thems';

export const App = () => {

  return (

    <ThemeProvider theme={darkTheme}>
      <BrowserRouter>
        <AppRouts />
      </BrowserRouter>
    </ThemeProvider>

  );

}
