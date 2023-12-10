import { createTheme} from '@mui/material';
import { blue, blueGrey, indigo } from '@mui/material/colors';




export const darkTheme = createTheme ({
    palette: {
      mode: 'dark',
      primary: {
        light: '#757ce8',
        main: '#3f50b5',
        dark: '#002884',
        contrastText: '#fff',
      },
      secondary: {
        light: '#ff7961',
        main: '#f44336',
        dark: '#ba000d',
        contrastText: '#000',
      },
      },
  typography: {
    allVariants: {
      color: '#cfd8dc',
    }
  }
});