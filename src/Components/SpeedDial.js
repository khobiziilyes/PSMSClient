import React from 'react';
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
    {icon: <IconShoppingCart />, name: 'Customer'},
    {icon: <IconLocalShipping />, name: 'Vendor'},
    {icon: <IconPhoneAndroid />, name: 'Phone'},
    {icon: <IconEmojiObjects />, name: 'Accessory'},
    {icon: <IconApps />, name: 'Item'}
];

export default function SpeedDial({ setSelectedForm }) {
	const classes = useStyles();

	const [speedDialOpen, setSpeedDialOpen] = React.useState(false);
    
    const handleSpeedDialOpen = () => setSpeedDialOpen(true);
    const handleSpeedDialClose = () => setSpeedDialOpen(false);

    const handleSpeedDialSelect = (name) => {
        setSelectedForm(name);
        setSpeedDialOpen(false);
    }

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
	                onClick={() => handleSpeedDialSelect(action.name)}
	            />
	        ).reverse()}
	    </MuiSpeedDial>
    );
}