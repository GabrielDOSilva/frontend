import { createTheme} from '@mui/material';
import { blueGrey } from '@mui/material/colors';




export const darkTheme = createTheme ({
    palette: {
      mode: 'dark',
        primary: {
          main: blueGrey[800],
          dark: blueGrey[900],
          light: blueGrey[500],
          contrastText: '#ffffff',

        },
        secondary: {
            main: '#b0bec5',
            dark: '#455a64',
            light: '#78909c',
            contrastText: '#ffffff',

        },
        background: {
          paper: '#303134',
          default: '#202124',
        },
      },
  typography: {
    allVariants: {
      color: '#cfd8dc',
    }
  }
});