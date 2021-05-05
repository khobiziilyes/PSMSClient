import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@Components/TextField';
import Form from '@Components/Form';
import Notes from '@Components/Notes';

const CreatePerson = ({isVendor}) => {
	return (
		<Form title={'Create new ' + (isVendor ? 'vendor' : 'customer')}>
			<input type="hidden" value={isVendor ? '1' : '0'} />

            <Typography variant="h6" gutterBottom>
                Basic Informations
            </Typography>
            
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <TextField label="First name" required />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField label="Last name" required />
                </Grid>

                <Grid item xs={12} sm={4}>
                    <TextField label="Phone number 1" required />
                </Grid>

                <Grid item xs={12} sm={4}>
                    <TextField label="Phone number 2" />
                </Grid>

                <Grid item xs={12} sm={4}>
                    <TextField label="Fax" />
                </Grid>

                <Grid item xs={12}>
                    <TextField label="Address line 1" />
                </Grid>

                <Grid item xs={12}>
                    <Notes />
                </Grid>
            </Grid>
		</Form>
	);
}

export default CreatePerson;