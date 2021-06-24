import { createMuiTheme, colors } from '@material-ui/core';
import typography from './typography';
//import shadows from './shadows';

const Theme = createMuiTheme({
    overrides: {
        MuiTableBody: {
            root: {
                cursor: 'pointer'
            }
        },
        MuiTableCell: {
            root: {
                borderBottom: '1px solid #1a2035'
            }
        },
        MuiTable: {
            root: {
                borderCollapse: 'separate'
            }
        },
        MuiDialogContent: {
            root: {
                overflowY: 'hidden'
            }
        },
        MUIDataTable: {
            responsiveBase: {
                overflowY: 'hidden'
            }
        }
    },
    palette: {
        background: {
            dark: colors.indigo[100],
            default: '#1a2035',
            paper: '#202940'
        },
        primary: {
            main: '#fff'
        },
        secondary: {
            main: '#6c757d'
        },
        text: {
            primary: '#fff',
            secondary: '#a9afbb'
        },
        action: {
            active: '#8d9498'
        }
    },
    //shadows,
    typography
});

export default Theme;