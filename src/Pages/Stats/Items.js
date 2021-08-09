import React from 'react';

import { Grid } from '@material-ui/core';
import { Budget, TotalCustomers, TasksProgress } from '@Components/Cards';

export default function ItemsStats() {
	return (
		<Grid container spacing={3}>
            <Grid item xs>
                <Budget />
            </Grid>
            
            <Grid item xs>
                <TotalCustomers />
            </Grid>

            <Grid item xs>
                <TasksProgress />
            </Grid>
        </Grid>
	);
}

/*
	totalProfitPrice
	averageBuyPricePerItem
	averageSellPricePerItem
	averageProfitPricePerItem
	averageTotalProfitPrice
	currentQuantityBuyWorth
	currentQuantitySellWorth
	expectedCurrentQuantityProfitPrice
	expectedTotalProfitPrice
	requiredMinimumPrice
	totalBuyCost
	totalSellCost
	totalBuys
	totalSells
*/