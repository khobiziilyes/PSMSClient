import React from 'react';
import {
	Typography,
	Grid,
	List
} from '@material-ui/core';

import {
	AttachMoney,
	ImportExport,
	Person
} from '@material-ui/icons';

import ListItem from '@Components/ShowResource/ListItem';
import { IDListItem } from '@Components/ShowResource/CommonListItem';
import { UserTimeList } from '@Components/ShowResource/CommonLists';
import ShowNotes from '@Components/ShowResource/Notes';

const CartsContent = ({ Cart }) => {
	return (
		<>
			<Grid item xs={4}>
				<Typography variant="h6" gutterBottom>
	                Item Details
	            </Typography>

	            <List>
	            	<ListItem primary="Name" secondary={Cart.item.itemable.name}>
						<ImportExport />
					</ListItem>

					<ListItem primary="Brand" secondary={Cart.item.itemable.brand}>
						<ImportExport />
					</ListItem>

					<ListItem primary="Version" secondary={Cart.item.delta}>
						<ImportExport />
					</ListItem>

					<ListItem primary="Type" secondary={Cart.item.isPhone ? 'Phone' : 'Accessory'}>
						<ImportExport />
					</ListItem>
	            </List>
			</Grid>

			<Grid item xs={4}>
				<Typography variant="h6" gutterBottom>
	                Cart Details
	            </Typography>

	            <List>
					<ListItem primary="Quantity" secondary={Cart.Quantity}>
						<ImportExport />
					</ListItem>

					<ListItem primary="Cost Per Item" secondary={Cart.costPerItem}>
						<ImportExport />
					</ListItem>

					<ListItem primary="Total cost" secondary={Cart.Quantity * Cart.costPerItem}>
						<ImportExport />
					</ListItem>

					<ListItem primary="Price Changed" secondary={Cart.priceChanged ? 'Yes' : 'No'}>
						<ImportExport />
					</ListItem>
	            </List>
			</Grid>

			<Grid item xs={4}>
				<Typography variant="h6" gutterBottom>
	                Others
	            </Typography>
			</Grid>	
		</>
	);
}

const MainContent = ( { id, isBuy, notes, created_by, created_at, deleted_at, updated_by, person, totalCost } ) => {
	return (
		<>
			<Grid item xs={6}>
				<Typography variant="h6" gutterBottom>
	                Basic informations
	            </Typography>

				<List>
					<IDListItem ID={id} />
					
					<ListItem primary="Type" secondary={isBuy ? 'Buy' : 'Sell'}>
						<ImportExport />
					</ListItem>

					<ListItem primary="Person" secondary={person.name}>
						<Person />
					</ListItem>

					<ListItem primary="Total Cost" secondary={totalCost}>
						<AttachMoney />
					</ListItem>
				</List>
			</Grid>

			<Grid item xs={6}>
				<UserTimeList title="Creations" userName={created_by} time={created_at} />
				<UserTimeList title="Deletion" userName={deleted_at && updated_by} time={deleted_at} />

				<ShowNotes notes={notes} />
			</Grid>
		</>
	);
}

export default function ShowTransaction({ viewCart, rowData: {carts, ...rowData} }) {
	const totalCost = carts.reduce((a, cart) => a + (cart.Quantity * cart.costPerItem), 0);

	return (
	    <Grid container spacing={5}>
			{viewCart ? <CartsContent Cart={carts[viewCart - 1]} /> : <MainContent {...rowData} totalCost={totalCost} />}
		</Grid>
	);
}