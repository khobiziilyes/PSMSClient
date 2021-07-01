import React from 'react';
import { QueryClientProvider, QueryClient } from 'react-query';
import { Route, Switch } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';

import { Box, Container, CssBaseline } from '@material-ui/core';

import {
    queryClientOptions,
    snackBarOptions
} from '@src/Consts.js';

import { RoutesList } from '@src/Pages/Routes';

import {
    AppBar,
    Drawer,
    SpeedDial,
    Copyright,
    FormikDialog
} from '@Components';

import useStyles from './Styles';

const queryClient = new QueryClient(queryClientOptions);

export default function App ({ drawerWidth }) {
    const classes = useStyles();
    
    return (
        <>
            <CssBaseline />

            <div className={classes.root}>
                <AppBar drawerWidth={drawerWidth} />
                <Drawer drawerWidth={drawerWidth} />

                <main className={classes.main}>
                    <div className={classes.appBarSpacer} />
                    
                    <Container maxWidth='lg' className={classes.container}>
                        <QueryClientProvider client={queryClient}>
                            <SnackbarProvider {...snackBarOptions}>
                                <FormikDialog />
                                
                                <Switch>
                                    {Object.values(RoutesList).map(value =>
                                        <Route key={value.URL + "-route"} path={value.URL} component={value.Component} />
                                    )}
                                </Switch>
                            </SnackbarProvider>
                        </QueryClientProvider>
                        
                        <Box pt={4}>
                            <Copyright />
                        </Box>
                    </Container>
                </main>
                
                <SpeedDial />
            </div>
        </>
    );
}