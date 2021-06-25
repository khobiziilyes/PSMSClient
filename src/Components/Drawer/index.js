import React from 'react';
import clsx from 'clsx';
import { useRecoilState } from 'recoil';

import {
    Drawer as MuiDrawer,
    List, IconButton
} from '@material-ui/core';

import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

import { DrawerItems } from './DrawerItems';
import { drawerIsOpenedAtom } from '@src/Atoms';

import useStyles from './Styles';

export default function Drawer() {
    const classes = useStyles();
    const [drawerIsOpened, setDrawerIsOpened] = useRecoilState(drawerIsOpenedAtom);

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