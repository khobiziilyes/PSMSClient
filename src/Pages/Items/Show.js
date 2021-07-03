import React from 'react';
import {
	Typography,
	Grid,
	List
} from '@material-ui/core';

import { Phone, AttachMoney, EmojiEmotions, ViewModule } from '@material-ui/icons';

import ListItem from '@Components/ShowResource/ListItem';
import { IDListItem } from '@Components/ShowResource/CommonListItem';
import { UserTimeList } from '@Components/ShowResource/CommonLists';
import ShowNotes from '@Components/ShowResource/Notes';

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
		<>
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
		</>
	);
}

const MainContent = ({ id, name, brand, delta, isPhone, currentQuantity, defaultPrice, created_by, created_at, updated_by, updated_at, notes }) => {
	const deltaText = (isPhone ? phonesTypes : accessoriesTypes)[delta];

	return (
		<>
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

					<ListItem primary="Price" secondary={defaultPrice}>
						<Phone />
					</ListItem>
				</List>
			</Grid>

			<Grid item xs={6}>
				<UserTimeList title="Creations" userName={created_by} time={created_at}/>
				<UserTimeList title="Updates" userName={updated_by} time={updated_at} />

				<ShowNotes notes={notes} />
			</Grid>
		</>
	);
}

export default function ShowItem({ rowData, viewStats }) {
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
	
	return (
        <Grid container spacing={5}>
			{viewStats ? <StatsContent {...Stats} /> : <MainContent {...MainContentProps} />}
		</Grid>
	);
}