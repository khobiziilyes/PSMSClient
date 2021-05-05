import React from 'react';
import { NavLink } from 'react-router-dom';

import { ListItem as MuiListItem, ListItemIcon, ListItemText, ListSubheader, List } from '@material-ui/core';
import { Collapse, Divider } from '@material-ui/core';

import {
    Apps as IconApps,
    ShoppingCart as IconShoppingCart,
    EmojiObjects as IconEmojiObjects,
    PhoneAndroid as IconPhoneAndroid,
    LocalShipping as IconLocalShipping,
    ExpandMore as IconExpandMore,
    ExpandLess as IconExpandLess,
    Dashboard as IconDashboard,
    AttachMoney as IconAttachMoney
} from '@material-ui/icons';

import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
    nested: {
        paddingLeft: theme.spacing(6)
    }
}));

function ListItem(props) {
    return (
        <MuiListItem button component={NavLink} activeClassName='Mui-selected' to={props.theTo} className={props.className} >
            {props.theIcon && <ListItemIcon children={<props.theIcon />} />}
            <ListItemText primary={props.theText} />
        </MuiListItem>
    );
}

function ListItems(props) {
    const [open, setOpen] = React.useState(false)

    return (
        <>
            <MuiListItem button onClick={() => setOpen(!open)}>
                <ListItemIcon>
                    <props.theIcon />
                </ListItemIcon>
                
                <ListItemText primary={props.theText} />
                {open ? <IconExpandLess /> : <IconExpandMore />}
            </MuiListItem>

            <Collapse in={open} timeout="auto" unmountOnExit>
                <Divider />
                
                <List component="div" disablePadding>
                    {props.children}
               </List>
            </Collapse>
        </>
    );
}

export const DrawerItems = ({open}) => {
    const classes = useStyles();
    const inset = open && classes.nested;

    return (
        <>
            <ListItem theTo='/dashboard' theIcon={IconDashboard} theText='Dashboard' />
            
            <Divider />

            <ListItem theTo='/stock' theText='Customers' theIcon={IconShoppingCart} />
            <ListItem theTo='/vendors/list' theText='Vendors' theIcon={IconLocalShipping} />

            <Divider />

            <ListItem theTo='/phones/list' theText='Phones' theIcon={IconPhoneAndroid} />
            <ListItem theTo='/accessories/list' theText='Accessories'theIcon={IconEmojiObjects} />
            <ListItem theTo='/items/list' theText='Items'theIcon={IconApps} />
            
            <Divider />

            <ListItem theTo='/payments/list' theText='Payments' theIcon={IconAttachMoney} />

            {false && <ListSubheader inset>Payments</ListSubheader>}
        </>
    );
}