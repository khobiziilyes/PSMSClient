import React from 'react';
import {
	Typography,
	Grid,
	List
} from '@material-ui/core';

import {
	Assignment,
	Business
} from '@material-ui/icons';

import ListItem from '@Components/ShowResource/ListItem';
import { IDListItem } from '@Components/ShowResource/CommonListItem';
import { UserTimeList } from '@Components/ShowResource/CommonLists';

export default function ShowCustomer({ rowData }) {
	const {
		id,
		name,
		brand,
		created_by,
		created_at,
		updated_by,
		updated_at,
		notes,
	} = rowData;

	return (
	    <Grid container spacing={5}>
			<Grid item xs={6}>
				<Typography variant="h6" gutterBottom>
	                Basic informations
                </Typography>

				<List>
					<IDListItem ID={id} />
					
					<ListItem primary="Name" secondary={name}>
						<Assignment />
					</ListItem>

					<ListItem primary="Brand" secondary={brand}>
						<Business />
					</ListItem>
				</List>
			</Grid>

			<Grid item xs={6}>
				<UserTimeList title="Creations" userName={created_by} time={created_at}/>
				<UserTimeList title="Updates" userName={updated_by} time={updated_at} />

				{notes && <Typography variant="h6">
					Notes
				</Typography>}

				<p>{notes}</p>
			</Grid>
		</Grid>
	);
}