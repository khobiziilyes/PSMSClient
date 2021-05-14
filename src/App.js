import React from 'react';
import { RecoilRoot } from 'recoil';
import { MuiThemeProvider } from "@material-ui/core/styles";
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import { BrowserRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

import Theme from '@src/Theme';
import Content from '@src/Content';

import Drawer from '@Components/Drawer';
import MyAppBar from '@Components/AppBar';
import Copyright from '@Components/Copyright';
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

export const App = ({ drawerWidth }) => {
    const classes = useStyles();
    
    return (
        <MuiThemeProvider theme={Theme}>
            <CssBaseline />

            <div className={classes.root}>
                <RecoilRoot>
                    <MyAppBar drawerWidth={drawerWidth} />

                    <BrowserRouter>    
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
                    </BrowserRouter>
                    
                    <SpeedDial />
                </RecoilRoot>
            </div>
        </MuiThemeProvider>
    );
}