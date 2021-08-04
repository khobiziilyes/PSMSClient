import React from 'react';

import { Assessment } from '@material-ui/icons';
import { Button } from '@material-ui/core';

import {
	Typography,
	Grid,
	List
} from '@material-ui/core';

import { Phone, AttachMoney, EmojiEmotions, ViewModule } from '@material-ui/icons';

import { ListItem, IDListItem, UserTimeList, Notes } from '@Components/ShowResource';

import { Tabs } from '@Components';
import ModalWrapper from '@Components/ModalWrapper';

import { accessoriesTypes, phonesTypes } from '@src/Consts';

const StatsContent = ( {
	totalBuyCost,
	totalSellCost,
	totalBuys,
	totalSells,
	totalProfitPrice,

	averageBuyPricePerItem,
	averageSellPricePerItem,
	averageProfitPricePerItem,
	averageTotalProfitPrice,
	
	currentQuantityBuyWorth,
	currentQuantitySellWorth,
	
	expectedCurrentQuantityProfitPrice,
	expectedTotalProfitPrice,
	
	requiredMinimumPrice
} ) => {
	return (
		<Grid container spacing={5}>
			<Grid item xs={4}>
				<Typography variant="h6" gutterBottom>
	                Totality
	            </Typography>

				<List>
					<ListItem primary="Profit" secondary={totalProfitPrice}>
						<EmojiEmotions />
					</ListItem>

					<ListItem primary="Purchased cost" secondary={totalBuyCost}>
						<AttachMoney />
					</ListItem>

					<ListItem primary="Sold cost" secondary={totalSellCost}>
						<AttachMoney />
					</ListItem>

					<ListItem primary="Bought quantity" secondary={totalBuys}>
						<ViewModule />
					</ListItem>

					<ListItem primary="Sold quantity" secondary={totalSells}>
						<ViewModule />
					</ListItem>
				</List>
			</Grid>

			<Grid item xs={4}>
				<Typography variant="h6" gutterBottom>
	                Averages
	            </Typography>

				<List>
					<ListItem primary="Total Profit" secondary={averageTotalProfitPrice}>
						<EmojiEmotions />
					</ListItem>

					<ListItem primary="Profit Per Item" secondary={averageProfitPricePerItem}>
						<EmojiEmotions />
					</ListItem>

					<ListItem primary="Bought cost per item" secondary={averageBuyPricePerItem}>
						<AttachMoney />
					</ListItem>

					<ListItem primary="Sold cost per item" secondary={averageSellPricePerItem}>
						<AttachMoney />
					</ListItem>
				</List>
			</Grid>

			<Grid item xs={4}>
				<Typography variant="h6" gutterBottom>
	                Others
	            </Typography>

				<List>
					<ListItem primary="Expected total profit" secondary={expectedTotalProfitPrice}>
						<EmojiEmotions />
					</ListItem>
					
					<ListItem primary="Expected quantity profit" secondary={expectedCurrentQuantityProfitPrice}>
						<AttachMoney />
					</ListItem>

					<ListItem primary="Required minimum price" secondary={requiredMinimumPrice}>
						<AttachMoney />
					</ListItem>
					
					<ListItem primary="Quantity in sell worth" secondary={currentQuantitySellWorth}>
						<AttachMoney />
					</ListItem>

					<ListItem primary="Quantity in buy worth" secondary={currentQuantityBuyWorth}>
						<AttachMoney />
					</ListItem>
				</List>
			</Grid>	
		</Grid>
	);
}

const MainContent = ({ id, name, brand, delta, isPhone, currentQuantity, defaultPrice, created_by, created_at, updated_by, updated_at, notes }) => {
	const deltaText = (isPhone ? phonesTypes : accessoriesTypes)[delta];

	return (
			<Grid container spacing={5}>
				<Grid item xs={6}>
					<Typography variant="h6" gutterBottom>
		                Basic informations
		            </Typography>

					<List>
						<IDListItem ID={id} />
						
						<ListItem primary="Name" secondary={name}>
							<Phone />
						</ListItem>

						<ListItem primary="Brand" secondary={brand}>
							<Phone />
						</ListItem>

						<ListItem primary="Version" secondary={deltaText}>
							<Phone />
						</ListItem>

						<ListItem primary="Quantity" secondary={currentQuantity}>
							<Phone />
						</ListItem>

						<ListItem primary="Default price" secondary={defaultPrice}>
							<Phone />
						</ListItem>
					</List>
				</Grid>

				<Grid item xs={6}>
					<UserTimeList title="Creations" userName={created_by} time={created_at}/>
					<UserTimeList title="Updates" userName={updated_by} time={updated_at} />

					<Notes notes={notes} />
				</Grid>
			</Grid>
	);
}

function ShowItem({ rowData }) {
	const {
		id,
		itemable: {
			name,
			brand
		},
		delta,
		currentQuantity,
		defaultPrice,
		created_by,
		created_at,
		updated_by,
		updated_at,
		notes,
		isPhone,
		...Stats
	} = rowData;

	const MainContentProps = { id, name, brand, delta, isPhone, currentQuantity, defaultPrice, created_by, created_at, updated_by, updated_at, notes };
	const [currentTab, setCurrentTab] = React.useState(0);

	const tabsList = [
		{
            Title: 'Details',
            Icon: null,
            Content: <MainContent {...MainContentProps} />
        },
        {
            Title: 'Stats',
            Icon: null,
            Content: <StatsContent {...Stats} />
        }
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
	return ModalWrapper(<ShowItem rowData={rowData} />, {
		...injected,
		title: (isPhone ? 'Phones' : 'Accessories') + ' | ' + rowData.itemable.brand + ' | ' + rowData.itemable.name,
		extraButtons: [<ViewStatsButton rowData={rowData} />],
		maxWidth: 'lg',
		height: '83%'
	});
}

const ViewStatsButton = ({rowData: { itemable: { id: itemable_id } } }) => {
    const highlightProduct = () => {};

    return (
        <Button startIcon={<Assessment />} onClick={highlightProduct} color="primary" variant="outlined">
            Got to Product
        </Button>
    );
}