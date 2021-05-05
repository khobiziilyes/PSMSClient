import React from 'react';
import Form from '@Components/Form';
import { Typography, Grid } from '@material-ui/core';
import TextField from '@Components/TextField';
import ItemToggle from '@Components/ItemToggle';
import Autocomplete from '@Components/Autocomplete';
import Notes from '@Components/Notes';

export default function CreateItem() {
	const [itemType, handleItemTypeChange] = React.useState('accessory');
	const callBack = (newItemType) => handleItemTypeChange(newItemType);

	return (
		<Form title='Create new item'>
            <Typography variant="h6" gutterBottom>
                Basic Informations
            </Typography>
            
            <Grid container spacing={3}>
                <Grid item xs={12} style={{textAlign: 'center'}}>
					<ItemToggle callBack={callBack} value={itemType} />
                </Grid>

				<Grid item xs={12}>
                	<Autocomplete label={"Select the " + itemType} options={[]} required />
                </Grid>

                <Grid item xs={4}>
                	<Autocomplete label={"Select the " + ((itemType === 'phone') ? 'version' : 'quality')} options={[]} required />
                </Grid>
                
				<Grid item xs={4}>
                	<TextField label="Current quantity" required />
                </Grid>

                <Grid item xs={4}>
                	<TextField label="Default price" required />
                </Grid>

                <Grid item xs>
                    <Notes />
                </Grid>
            </Grid>
		</Form>
	);
}