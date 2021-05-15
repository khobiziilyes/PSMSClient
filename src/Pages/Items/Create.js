import React from 'react';
import * as Yup from 'yup';

import Grid from '@material-ui/core/Grid';
import Autocomplete from '@Components/Inputs/Autocomplete';
import Notes from '@Components/Inputs/Notes';
import Text from '@Components/Inputs/Text';

import ItemToggle from '@Components/ItemToggle';

const formikParams = {
    initialValues: {
        item_id: '',
        Delta: '',
        currentQuantity: 0,
        defaultPrice: ''
    },
    validationSchema: Yup.object({
        item_id: Yup.string().required('Required'),
        Delta: Yup.string().required('Required'),
        currentQuantity: Yup.number().min(0).required('Required'),
        defaultPrice: Yup.number().min(0).required('Required')
    })
}

function TheForm({ isSubmitting }) {
	const [itemType, handleItemTypeChange] = React.useState('accessory');
	const callBack = (newItemType) => handleItemTypeChange(newItemType);

	return (
        <Grid container spacing={3}>
            <Grid item xs={12} style={{textAlign: 'center'}}>
				<ItemToggle callBack={callBack} value={itemType} />
            </Grid>

			<Grid item xs={12}>
            	<Autocomplete name="item_id" label={"Select the " + itemType} options={['Some', 'Text']} />
            </Grid>

            <Grid item xs={4}>
            	<Autocomplete name="Delta" label={"Select the " + ((itemType === 'phone') ? 'version' : 'quality')} options={['Idk', 'Haha']} />
            </Grid>
            
			<Grid item xs={4}>
            	<Text name="currentQuantity" label="Current quantity" />
            </Grid>

            <Grid item xs={4}>
            	<Text name="defaultPrice" label="Default price" />
            </Grid>

            <Grid item xs>
                <Notes />
            </Grid>
        </Grid>
	);
}

export {
    formikParams,
    TheForm
}