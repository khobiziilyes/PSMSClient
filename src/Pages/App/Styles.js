import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    main: {
        height: '100vh',
        overflow: 'auto',
        margin: 'auto',
        flexGrow: 1
    },
    appBarSpacer: theme.mixins.toolbar,
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4)
    }
}));

export default useStyles;