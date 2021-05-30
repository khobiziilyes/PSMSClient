import React from 'react';
import {
	Typography,
	Grid,
	List
} from '@material-ui/core';

import {
	ArrowLeft,
	ArrowRight,
	AttachMoney,
	ImportExport,
	Person,
	Print,
	HighlightOff,
	Delete
} from '@material-ui/icons';

import ListItem from '@Components/ShowResource/ListItem';
import { IDListItem } from '@Components/ShowResource/CommonListItem';
import { UserTimeList } from '@Components/ShowResource/CommonLists';

import { Button, DialogActions, DialogContent as MuiDialogContent } from '@material-ui/core';

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

				{notes && <Typography variant="h6">
					Notes
				</Typography>}

				<p>{notes}</p>
			</Grid>
		</>
	);
}
export default function ShowItem({ handleDialogClose, rowData: {carts, ...rowData} }) {
	const [viewCart, setViewCart] = React.useState(0);
	const totalCost = carts.reduce((a, cart) => a + (cart.Quantity * cart.costPerItem), 0);

	return (
		<>
			<MuiDialogContent style={{ overflow: 'hidden' }}>
		        <Grid container spacing={5}>
					{viewCart ? <CartsContent Cart={carts[viewCart - 1]} /> : <MainContent {...rowData} totalCost={totalCost} />}
				</Grid>
			</MuiDialogContent>

	        <DialogActions>
	            <Button startIcon={<HighlightOff />} onClick={handleDialogClose} color="primary" variant="outlined">
	                Cancel
	            </Button>
	            
	            <Button startIcon={<Delete />} onClick={() => {}} color="primary" variant="outlined">
	                Delete
	            </Button>

	            <Button startIcon={<Print />} onClick={() => {}} color="primary" variant="outlined">
	                Receipt
	            </Button>

	            <Button startIcon={<ArrowLeft />} onClick={() => setViewCart(viewCart - 1)} color="primary" variant="outlined" disabled={viewCart === 0}>
	                Previous Cart
	            </Button>

	            <Button endIcon={<ArrowRight />} onClick={() => setViewCart(viewCart + 1)} color="primary" variant="outlined" disabled={viewCart === carts.length}>
	                Next Cart
	            </Button>
	        </DialogActions>
       	</>
	);
}