import React from 'react';
import { NavLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';
import MuiSpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';

import {
    Apps as IconApps,
    ShoppingCart as IconShoppingCart,
    EmojiObjects as IconEmojiObjects,
    PhoneAndroid as IconPhoneAndroid,
    LocalShipping as IconLocalShipping
} from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
    speedDial: {
        position: 'absolute',
        bottom: theme.spacing(2),
        right: theme.spacing(2)
    }
}));

const actions = [
    {icon: <IconShoppingCart />, name: 'Customers'},
    {icon: <IconLocalShipping />, name: 'Vendors'},
    {icon: <IconPhoneAndroid />, name: 'Phones'},
    {icon: <IconEmojiObjects />, name: 'Accessories'},
    {icon: <IconApps />, name: 'Items'}
];

export default function SpeedDial() {
	const classes = useStyles();

	const [speedDialOpen, setSpeedDialOpen] = React.useState(false);
    const handleSpeedDialOpen = () => setSpeedDialOpen(true);
    const handleSpeedDialClose = () => setSpeedDialOpen(false);

    return (
    	<MuiSpeedDial
    		direction="left"
	        ariaLabel="SpeedDial"
	        className={classes.speedDial}
	        icon={<SpeedDialIcon />}
	        onClose={handleSpeedDialClose}
	        onOpen={handleSpeedDialOpen}
	        open={speedDialOpen}>

	        {actions.map(action => 
	            <SpeedDialAction
	                key={action.name + '-SpeedDialItem'}
	                icon={action.icon}
	                tooltipTitle={action.name}
	                onClick={handleSpeedDialClose}
	                component={NavLink}
	                to={'/' + action.name.toLowerCase() + '/create'}
	            />
	        ).reverse()}
	    </MuiSpeedDial>
    );
}