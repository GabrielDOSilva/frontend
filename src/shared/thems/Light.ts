import { createTheme} from '@mui/material';
import { deepPurple, indigo } from '@mui/material/colors';




export const lightTheme = createTheme ({
    palette: {
        primary: {
          main: deepPurple[800],
          dark: deepPurple[900],
          light: deepPurple[500],
          contrastText: '#ffffff',
        },
        secondary: {
            main: indigo[800],
            dark: indigo[900],
            light: indigo[500],
            contrastText: '#ffffff',
        },
        background: {
            paper: '#ffffff',
            default: '#f7f6f3',
        }
      },
});
