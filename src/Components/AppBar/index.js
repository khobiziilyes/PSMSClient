import React from 'react';
import clsx from 'clsx';
import MuiAppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles } from '@material-ui/core/styles';
import NotificationsIcon from '@material-ui/icons/Notifications';

import { useRecoilState } from 'recoil';
import { drawerIsOpenedAtom } from '@src/Atoms';

const useStyles = makeStyles((theme) => ({
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
    title: {
        flexGrow: 1,
    }
}));

export default function MyAppBar() {
    const [drawerIsOpened, setDrawerIsOpened] = useRecoilState(drawerIsOpenedAtom);
    const classes = useStyles();

    return (
        <MuiAppBar position='absolute' className={clsx(classes.appBar, drawerIsOpened && classes.appBarShift)} color="inherit">
            <Toolbar className={classes.toolbar}>
                <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="open drawer"
                    onClick={() => setDrawerIsOpened(true)}
                    className={clsx(classes.menuButton, drawerIsOpened && classes.menuButtonHidden)}
                >
                    
                    <MenuIcon />
                </IconButton>

                <Typography component="h1" variant="h4" color="inherit" noWrap className={classes.title}>
                    PSMS - Phone Store Management System
                </Typography>
                
                <IconButton color="inherit">
                    <Badge badgeContent={'99+'} color="secondary">
                        <NotificationsIcon />
                    </Badge>
                </IconButton>
            </Toolbar>
        </MuiAppBar>
    );
}