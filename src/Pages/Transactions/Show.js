import React from 'react';
import {
	Typography,
	Grid,
	List,
	Button
} from '@material-ui/core';

import {
	AttachMoney,
	ImportExport,
	Person
} from '@material-ui/icons';

import { ListItem, IDListItem, UserTimeList, Notes } from '@Components/ShowResource';
import { Tabs, ModalWrapper } from '@Components';

import { Print } from '@material-ui/icons';

const CartsContent = ({ Cart }) => {
	return (
		<Grid container spacing={5}>
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
		</Grid>
	);
}

const MainContent = ( { id, isBuy, notes, created_by, created_at, deleted_at, updated_by, person, totalCost } ) => {
	return (
		<Grid container spacing={5}>
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

				<Notes notes={notes} />
			</Grid>
		</Grid>
	);
}

function ShowTransaction({ currentTab, setCurrentTab, rowData: {carts, ...rowData} }) {
	const totalCost = carts.reduce((a, cart) => a + (cart.Quantity * cart.costPerItem), 0);
	
	const tabsList = [
		{
            Title: 'Details',
            Icon: null,
            Content: <MainContent {...rowData} totalCost={totalCost} />
        },
        ...carts.map(cart => ({
        	Title: cart.item.itemable.name,
            Icon: null,
            Content: <CartsContent Cart={cart} />	
        }))
	]
	
	const itemsPanelProps = {
        tabsList,
        currentTab,
        setCurrentTab
    }

	return (
		<Tabs {...itemsPanelProps} />
	);
}

export default function Show({ rowData, isPhone, ...injected }) {
	const [currentTab, setCurrentTab] = React.useState(0);

	return ModalWrapper(<ShowTransaction rowData={rowData} currentTab={currentTab} setCurrentTab={setCurrentTab} />, {
		...injected,
		title: 'Transaction Details',
		extraButtons: [<ExtraDetailsDialogButtons />],
		ShowEditButton: false,
		height: '70%',
		maxWidth: 'lg'
	});
}

function ExtraDetailsDialogButtons() {
    return (
        <>
            <Button startIcon={<Print />} onClick={() => {}} color="primary" variant="outlined">
                Receipt
            </Button>
        </>
    );
}