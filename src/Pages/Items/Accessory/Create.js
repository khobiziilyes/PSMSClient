import React from 'react';
import Form from '@Components/Form';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@Components/TextField';
import Autocomplete from '@Components/Autocomplete';
import Notes from '@Components/Notes';

const CreateAccessory = () => {
	return (
		<Form title='Create new accessory'>
            <Typography variant="h6" gutterBottom>
                Basic Informations
            </Typography>
            
            <Grid container spacing={3}>
                <Grid item xs={4}>
					<Autocomplete
						options={['Kit', 'Glass', 'AntiChoke']}
						label="Accessory type"
                        required
					/>
                </Grid>

                <Grid item xs={4}>
                    <TextField label="Accessory name" required />
                </Grid>

                <Grid item xs={4}>
                    <TextField label="Accessory brand" />
                </Grid>

                <Grid item xs={12}>
                    <Notes />
                </Grid>
            </Grid>
		</Form>
	);
}

export default CreateAccessory;