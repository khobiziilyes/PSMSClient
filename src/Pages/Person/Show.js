import React from 'react';
import {
	Typography,
	Grid,
	List,
} from '@material-ui/core';

import {
	Smartphone,
	Person,
	LocationCity,
	Home,
	Phone
} from '@material-ui/icons';

import ListItem from '@Components/ShowResource/ListItem';
import { IDListItem } from '@Components/ShowResource/CommonListItem';
import { UserTimeList } from '@Components/ShowResource/CommonLists';

import ShowNotes from '@Components/ShowResource/Notes';
import { ModalWrapper } from '@Components';

function ShowPerson({
	rowData: {
		id,
		name,
		address,
		phone1,
		phone2,
		fax,
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
						<Person />
					</ListItem>

					<ListItem primary="Address" secondary={address}>
						<LocationCity />
					</ListItem>
				</List>

				<Typography variant="h6" gutterBottom>
	                Contact
                </Typography>

                <List>
                	<ListItem primary="Phone #1" secondary={phone1}>
						<Phone />
					</ListItem>

					<ListItem primary="Phone #2" secondary={phone2}>
						<Smartphone />
					</ListItem>

					<ListItem primary="Fax" secondary={fax}>
						<Home />
					</ListItem>
				</List>
			</Grid>

			<Grid item xs={6}>
				<UserTimeList title="Creations" userName={created_by} time={created_at}/>
				<UserTimeList title="Updates" userName={updated_by} time={updated_at} />

				<ShowNotes notes={notes} />
			</Grid>
		</Grid>
	);
}

export default function Show({ rowData, ...injected }) {
	return ModalWrapper(<ShowPerson rowData={rowData} />, {
		...injected,
		title: rowData.name
	});
}