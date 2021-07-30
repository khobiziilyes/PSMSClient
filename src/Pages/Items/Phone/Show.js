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
import ShowNotes from '@Components/ShowResource/Notes';
import { ModalWrapper } from '@Components';

function ShowPhone({
	rowData: {
		id,
		name,
		brand,
		created_by,
		created_at,
		updated_by,
		updated_at,
		notes,
	}
 }) {
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

				<ShowNotes notes={notes} />
			</Grid>

			<Grid item xs={6}>
				<UserTimeList title="Creations" userName={created_by} time={created_at}/>
				<UserTimeList title="Updates" userName={updated_by} time={updated_at} />
			</Grid>
		</Grid>
	);
}

export default function Show({ rowData, ...injected }) {
	return ModalWrapper(<ShowPhone rowData={rowData} />, {
		...injected,
		title: 'Phones | ' + rowData.brand + ' | ' + rowData.name
	});
}