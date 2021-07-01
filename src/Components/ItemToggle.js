import React from 'react';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';

export default function ItemToggle(props) {
    const [itemType, setItemType] = React.useState('accessory');

    const handleItemTypeChange = (event, newItemType) => {
        if (newItemType !== null) {
        	setItemType(newItemType);
        }
    };

    return (
    	<ToggleButtonGroup exclusive style={{ width: "90%" }} value={itemType} onChange={handleItemTypeChange} {...props} >
            <ToggleButton style={{ width: "100%" }} value="accessory">
                Accessory
            </ToggleButton>
            
            <ToggleButton style={{ width: "100%" }} value="phone">
                Phone
            </ToggleButton>
        </ToggleButtonGroup>
    );
}