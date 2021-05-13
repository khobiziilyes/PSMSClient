import React from 'react';
import { RecoilRoot } from 'recoil';
import { MuiThemeProvider } from "@material-ui/core/styles";
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import { BrowserRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

import Theme from './Theme';

import Drawer from '@Components/Drawer';
import MyAppBar from '@Components/AppBar';
import Copyright from '@Components/Copyright';
import Content from './Content';
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

    const [drawerOpened, setDrawerOpened] = React.useState(false);
    const handleDrawerOpen = () => setDrawerOpened(true);    
    const handleDrawerClose = () => setDrawerOpened(false);
    
    const [selectedForm, setSelectedForm] = React.useState('Customer');
    const [dialogIsOpen, setDialogIsOpen] = React.useState(false);

    const setSelectedFormAndOpen = (newSelectedForm) => {
        setSelectedForm(newSelectedForm);
        setDialogIsOpen(true);
    }
    
    const handleDialogClose = () => setDialogIsOpen(false);
    
    const handleDialogSubmit = () => {
        alert('Form submited');
        setDialogIsOpen(false);
    }

    return (
        <MuiThemeProvider theme={Theme}>
            <CssBaseline />

            <div className={classes.root}>
                <RecoilRoot>
                    <MyAppBar
                        open={drawerOpened}
                        drawerWidth={drawerWidth}
                        handleDrawerOpen={handleDrawerOpen}
                    />

                    <BrowserRouter>    
                        <Drawer
                            open={drawerOpened}
                            drawerWidth={drawerWidth}
                            handleDrawerClose={handleDrawerClose}
                        />

                        <main className={classes.main}>
                            <div className={classes.appBarSpacer} />
                            
                            <Container maxWidth='lg' className={classes.container}>
                                <Content 
                                    dialogIsOpen={dialogIsOpen}
                                    selectedForm={selectedForm}
                                    handleDialogClose={handleDialogClose}
                                    handleDialogSubmit={handleDialogSubmit}
                                />

                                <Box pt={4}>
                                    <Copyright />
                                </Box>
                            </Container>
                        </main>
                    </BrowserRouter>
                    
                    <SpeedDial setSelectedForm={setSelectedFormAndOpen} />
                </RecoilRoot>
            </div>
        </MuiThemeProvider>
    );
}