import React from 'react';
import { NavLink } from 'react-router-dom';

import {
    ListItem as MuiListItem,
    ListItemIcon, ListItemText,
    ListSubheader,
    List,
    Collapse,
    Divider
} from '@material-ui/core';

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
import { RoutesList } from '@src/Consts';

const useStyles = makeStyles(theme => ({
    nested: {
        paddingLeft: theme.spacing(6)
    }
}));

export const DrawerItems = ({ drawerIsOpened }) => {
    const classes = useStyles();
    const inset = drawerIsOpened && classes.nested;

    return (
        <>
            <ListItem theTo={RoutesList.Dashboard.URL} theIcon={IconDashboard} theText='Dashboard' />
            
            <Divider />

            <ListItem theTo={RoutesList.CustomersList.URL} theText='Customers' theIcon={IconShoppingCart} />
            <ListItem theTo={RoutesList.VendorsList.URL} theText='Vendors' theIcon={IconLocalShipping} />

            <Divider />

            <ListItem theTo={RoutesList.PhonesList.URL} theText='Phones' theIcon={IconPhoneAndroid} />
            <ListItem theTo={RoutesList.AccessoriesList.URL} theText='Accessories'theIcon={IconEmojiObjects} />
            
            <ListItem theTo={RoutesList.ItemsPhonesList.URL} theText='Items'theIcon={IconApps} />
            <ListItem theTo={RoutesList.ItemsAccessoriesList.URL} theText='Items'theIcon={IconApps} />
            
            <Divider />

            <ListItem theTo={RoutesList.SellsList.URL} theText='Sells' theIcon={IconAttachMoney} />
            <ListItem theTo={RoutesList.BuysList.URL} theText='Buys' theIcon={IconAttachMoney} />

            <ListItem theTo={RoutesList.UsersList.URL} theText='Users' theIcon={IconAttachMoney} />

            {false && <ListSubheader inset>Transactions</ListSubheader>}
        </>
    );
}

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