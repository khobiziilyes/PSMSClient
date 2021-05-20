import React from 'react';
import { makeStyles, } from '@material-ui/core/styles';
import { Box, Container, CssBaseline } from '@material-ui/core';

import Content from '@src/Content';

import AppBar from '@Components/AppBar';
import Drawer from '@Components/Drawer';
import SpeedDial from '@Components/SpeedDial';
import Copyright from '@Components/Copyright';

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

export const App = ({ drawerWidth }) => {
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
                        <Content />

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