import { createTheme} from '@mui/material';
import { blueGrey } from '@mui/material/colors';




export const darkTheme = createTheme ({
    palette: {
        primary: {
          main: blueGrey[800],
          dark: blueGrey[900],
          light: blueGrey[500],
          contrastText: '#cfd8dc',

        },
        secondary: {
            main: '#b0bec5',
            dark: '#455a64',
            light: '#78909c',
            contrastText: '#cfd8dc',

        },
        background: {
            paper: '#9e9e9e',
            default: '#616161',
        }
      },
});