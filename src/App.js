import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query'
import clsx from 'clsx';
import { MuiThemeProvider } from "@material-ui/core/styles";
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import { BrowserRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

import Theme from './Theme';

import { Drawer } from '@Components/Drawer';
import { MyAppBar } from '@Components/AppBar';
import { Copyright } from '@Components/Copyright';
import { Content } from './Content';
import SpeedDial from '@Components/SpeedDial';

const useStyles = makeStyles((theme) => ({
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

const queryClient = new QueryClient()

export const App = ({ drawerWidth }) => {
    const classes = useStyles();

    const [open, setOpen] = React.useState(false);
    const handleDrawerOpen = () => setOpen(true);    
    const handleDrawerClose = () => setOpen(false);
    
    return (
        <MuiThemeProvider theme={Theme}>
            <CssBaseline />

            <div className={classes.root}>
                <BrowserRouter>
                    <MyAppBar open={open} drawerWidth={drawerWidth} handleDrawerOpen={handleDrawerOpen}/>
                    <Drawer open={open} drawerWidth={drawerWidth} handleDrawerClose={handleDrawerClose}/>

                    <main className={clsx(classes.main)}>
                        <div className={classes.appBarSpacer} />
                        
                        <Container maxWidth='lg' className={clsx(classes.container)}>
                            <QueryClientProvider client={queryClient}>
                                <Content />
                            </QueryClientProvider>

                            <Box pt={4}>
                                <Copyright />
                            </Box>
                        </Container>
                    </main>

                    <SpeedDial />
                </BrowserRouter>
            </div>
        </MuiThemeProvider>
    );
}