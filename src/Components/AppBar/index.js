import React from 'react';
import clsx from 'clsx';

import { useSetRecoilState, useRecoilState } from 'recoil';
import { userAtom, drawerIsOpenedAtom } from '@src/Atoms';

import {
    AppBar as MuiAppBar,
    Toolbar,
    Typography,
    IconButton,
    Badge
} from '@material-ui/core';

import {
    ExitToApp,
    Menu as MenuIcon,
    Notifications as NotificationsIcon
} from '@material-ui/icons';

import { LiveSearchWithKeys } from '@Components/Inputs/LiveSearch';

import useStyles from './Styles';

export default function AppBar() {
    const classes = useStyles();
    const [drawerIsOpened, setDrawerIsOpened] = useRecoilState(drawerIsOpenedAtom);

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
                    <LiveSearchWithKeys
                        formatURL={query => '/search/items'}
                        getOptionLabel={option => option.name}
                        getOptionSelected={(option, value) => option.id === value.id}
                        onChange={(event, value) => console.log(value)}
                        style={{ width: 300 }}
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