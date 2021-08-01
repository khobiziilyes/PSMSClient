import React from 'react';
import clsx from 'clsx';

import { useSetRecoilState, useRecoilState } from 'recoil';
import { userAtom, drawerIsOpenedAtom, formDialogParamsAtom } from '@src/Atoms';

import {
    AppBar as MuiAppBar,
    Toolbar,
    Typography,
    IconButton,
    Badge,
    MenuItem
} from '@material-ui/core';

import { Select } from '@Components';

import {
    ExitToApp,
    Menu as MenuIcon,
    Notifications as NotificationsIcon
} from '@material-ui/icons';

import { LiveSearchWithKeys } from '@Components/Inputs/LiveSearch';

import useStyles from './Styles';

export default function AppBar() {
    const setFormDialogParams = useSetRecoilState(formDialogParamsAtom);

    const classes = useStyles();
    const [drawerIsOpened, setDrawerIsOpened] = useRecoilState(drawerIsOpenedAtom);

    const setUser = useSetRecoilState(userAtom);
    const LogOut = () => setUser(null);

    const [searchType, setSearchType] = React.useState('all');
    
    const onLiveSearchChange = (event, value) => {
        setFormDialogParams({
            isOpened: true,
            name: 'Sell',
            initialValues: null,
            injectedProps: {
                defaultSelectedProduct: value
            }
        });
    }

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
                        formatURL={query => '/search/items/' + searchType}
                        withItems
                        getOptionLabel={option => option.name}
                        getOptionSelected={(option, value) => option.id === value.id}
                        onChange={onLiveSearchChange}
                        style={{ width: 300 }}
                    />
                </div>
                
                <Select
                    id="searchType"
                    label="Type"
                    onChange={event => setSearchType(event.target.value)}
                    value={searchType}
                    controlStyle={{ minWidth: 120, paddingLeft: 10 }}
                >
                    <MenuItem value="all">All</MenuItem>
                    <MenuItem value="phone">Phone</MenuItem>
                    <MenuItem value="accessory">Accessory</MenuItem>
                </Select>

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