import React from 'react';
import { useSetRecoilState, useRecoilState } from 'recoil';
import { userAtom } from '@src/Atoms';
import clsx from 'clsx';
import { makeStyles, fade } from '@material-ui/core/styles';

import { AppBar as MuiAppBar, Toolbar, Typography, IconButton, Badge } from '@material-ui/core';

import MenuIcon from '@material-ui/icons/Menu';
import ExitToApp from '@material-ui/icons/ExitToApp';
import NotificationsIcon from '@material-ui/icons/Notifications';

import { drawerIsOpenedAtom } from '@src/Atoms';
import BarSearch from '@Components/BarSearch';

const useStyles = makeStyles((theme) => ({
    grow: {
        flexGrow: 1,
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: 240,
        width: `calc(100% - ${240}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    toolbar: {
        paddingRight: 24
    },
    menuButton: {
        marginRight: 36
    },
    menuButtonHidden: {
        display: 'none'
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25)
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto'
        }
    }
}));

export default function AppBar() {
    const [drawerIsOpened, setDrawerIsOpened] = useRecoilState(drawerIsOpenedAtom);
    const classes = useStyles();

    const setUser = useSetRecoilState(userAtom);
    const LogOut = () => setUser(null);

    return (
        <MuiAppBar position='absolute' className={clsx(classes.appBar, drawerIsOpened && classes.appBarShift)} color="inherit">
            <Toolbar className={classes.toolbar}>
                <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="open drawer"
                    onClick={() => setDrawerIsOpened(true)}
                    className={clsx(classes.menuButton, drawerIsOpened && classes.menuButtonHidden)}>
                    <MenuIcon />
                </IconButton>

                <Typography component="h1" variant="h4" color="inherit" noWrap className={classes.title}>
                    PSMS - Phone Store Management System
                </Typography>
                
                <div className={classes.search}>
                    <BarSearch
                        formatURL={(query) => "/phones"}
                        formatData={(data) => data}
                        getOptionLabel={(option) => option.name}
                        getOptionSelected={(option, value) => option.name === value.name}
                        onChange={(event, value) => console.log(value)}
                    />
                </div>
                
                <div className={classes.grow} />
                
                <IconButton color="inherit">
                    <Badge badgeContent={'99+'} color="secondary">
                        <NotificationsIcon />
                    </Badge>
                </IconButton>

                <IconButton color="inherit" onClick={LogOut}>
                    <ExitToApp />
                </IconButton>
            </Toolbar>
        </MuiAppBar>
    );
}