import { createTheme} from '@mui/material';
import { blueGrey, indigo } from '@mui/material/colors';




export const lightTheme = createTheme ({
    palette: {
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
        background: {
            paper: '#ffffff',
            default: '#f7f6f3',
        }
      },
});
