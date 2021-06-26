import React from 'react';
import { Typography, Grid, List } from '@material-ui/core';

import { IDListItem } from '@Components/ShowResource/CommonListItem';

export default function ShowUser({ handleDialogClose, rowData: { permissions, ...rowData } }) {
	return (
	    <Grid container spacing={3}>
        	<Grid item xs={6}>
				<Typography variant="h6" gutterBottom>
	                Basic informations
	            </Typography>

				<List>
					<IDListItem ID={rowData.id} />
				</List>
			</Grid>

			<Grid item xs={6}>
				
			</Grid>
        </Grid>    
	);
}