import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import MuiDrawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { DrawerItems } from './DrawerItems';

import { useRecoilState } from 'recoil';
import { drawerIsOpenedAtom } from '@src/Atoms';

const useStyles = makeStyles(theme => ({
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: 240,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen
        })
    },
    drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        }),
        width: theme.spacing(7)
    },
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar
    }
}));

export default function Drawer (props) {
    const [drawerIsOpened, setDrawerIsOpened] = useRecoilState(drawerIsOpenedAtom);
    const classes = useStyles(props);

    return (
        <MuiDrawer
            classes={{
                paper: clsx(classes.drawerPaper, !drawerIsOpened && classes.drawerPaperClose),
            }}

            variant="permanent"
            open={drawerIsOpened} >

            <div className={classes.toolbarIcon}>
                <IconButton onClick={() => setDrawerIsOpened(false)}>
                    <ChevronLeftIcon />
                </IconButton>
            </div>

            <List>
                <DrawerItems drawerIsOpened={drawerIsOpened} />
            </List>
        </MuiDrawer>
    );
}