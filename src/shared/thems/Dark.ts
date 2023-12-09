import { createTheme} from '@mui/material';
import { blueGrey, grey } from '@mui/material/colors';




export const darkTheme = createTheme ({
    palette: {
        primary: {
          main: grey[800],
          dark: grey[900],
          light: grey[500],
          contrastText: '#ffffff',
        },
        secondary: {
            main: blueGrey[800],
            dark: blueGrey[900],
            light: blueGrey[500],
            contrastText: '#ffffff',
        },
        background: {
            paper: '##78909c',
            default: '202124',
        }
      },
});