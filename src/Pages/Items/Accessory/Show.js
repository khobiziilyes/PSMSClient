import React from 'react';
import { accessoriesNames } from '@src/Consts';

import {
	Typography,
	Grid,
	List
} from '@material-ui/core';

import {
	Assignment,
	Business,
	List as ListIcon
} from '@material-ui/icons';

import ListItem from '@Components/ShowResource/ListItem';
import { IDListItem } from '@Components/ShowResource/CommonListItem';
import { UserTimeList } from '@Components/ShowResource/CommonLists';
import ShowNotes from '@Components/ShowResource/Notes';
import { ModalWrapper } from '@Components';

function ShowAccessory({
	rowData: {
		id,
		name,
		brand,
		type_id,
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

					<ListItem primary="Type" secondary={accessoriesNames[type_id]}>
						<ListIcon />
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
	return ModalWrapper(<ShowAccessory rowData={rowData} />, {
		...injected,
		title: 'Accessories | ' + rowData.brand + ' | ' + rowData.name
	});
}