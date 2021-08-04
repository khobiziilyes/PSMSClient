import React from 'react';
import { makeStyles } from '@material-ui/styles';
import MuiSpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';

import { useSetRecoilState } from 'recoil';
import { formDialogParamsAtom } from '@src/Atoms';

import {
    Apps as IconApps,
    ShoppingCart as IconShoppingCart,
    EmojiObjects as IconEmojiObjects,
    AttachMoney as AttachMoneyIcon,
    MoneyOff as MoneyOffIcon,
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
    {icon: <IconEmojiObjects />, name: 'Accessory'},
    {icon: <IconPhoneAndroid />, name: 'Phone'},
    {icon: <IconApps />, name: 'Item'},
    {icon: <MoneyOffIcon />, name: 'Buy'},
    {icon: <AttachMoneyIcon />, name: 'Sell'}
];

export default function SpeedDial() {
	const setFormDialogParams = useSetRecoilState(formDialogParamsAtom);

    const classes = useStyles();

	const [speedDialOpen, setSpeedDialOpen] = React.useState(false);
    
    const handleSpeedDialOpen = () => setSpeedDialOpen(true);
    const handleSpeedDialClose = () => setSpeedDialOpen(false);

    const handleSpeedDialSelect = name => {
        handleSpeedDialClose();
        
        setFormDialogParams({
            isOpened: true,
            name,
            initialValues: {},
            injectedProps: {}
        });
    }

    return (
    	<MuiSpeedDial
            FabProps={{ size: "large" }}
    		direction="up"
	        ariaLabel="SpeedDial"
	        className={classes.speedDial}
	        icon={<SpeedDialIcon />}
	        onClose={handleSpeedDialClose}
	        onOpen={handleSpeedDialOpen}
	        open={speedDialOpen}>

	        {actions.map(action => 
	            <SpeedDialAction
                    FabProps={{size: 'medium'}}
	                key={action.name + '-SpeedDialItem'}
	                icon={action.icon}
	                tooltipTitle={action.name}
                    tooltipOpen
	                onClick={() => handleSpeedDialSelect(action.name)}
	            />
	        ).reverse()}
	    </MuiSpeedDial>
    );
}