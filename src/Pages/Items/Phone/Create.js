import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@Components/TextField';
import Autocomplete from '@Components/Autocomplete';
import Notes from '@Components/Notes';

const CreatePhone = () => {
	return (
		<>
            <Typography variant="h6" gutterBottom>
                Basic Informations
            </Typography>
            
            <Grid container spacing={3}>
                <Grid item xs={6}>
					<Autocomplete
						options={['Redmi', 'Samsung', 'Nokia']}
						label="Brand name"
                        required
					/>
                </Grid>

                <Grid item xs={6}>
                    <TextField label="Phone name" required />
                </Grid>

                <Grid item xs>
                    <Notes />
                </Grid>
            </Grid>
		</>
	);
}

export default CreatePhone;