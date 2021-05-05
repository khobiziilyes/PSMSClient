import React from 'react';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';

export default function BasicInformations( {callBack, ...props} ) {
    const [itemType, setItemType] = React.useState('accessory');

    const handleItemType = (event, newItemType) => {
        if (newItemType !== null) {
        	setItemType(newItemType);
        	if (callBack) callBack(newItemType);
        }
    };

    return (
    	<ToggleButtonGroup value={itemType} exclusive onChange={handleItemType} style={{ width: "90%" }} {...props} >
            <ToggleButton style={{ width: "100%" }} value="accessory">
                Accessory
            </ToggleButton>
            
            <ToggleButton style={{ width: "100%" }} value="phone">
                Phone
            </ToggleButton>
        </ToggleButtonGroup>
    );
}