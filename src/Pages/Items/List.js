import React from 'react';
import MuiTable from '@Components/MuiTable';

/*
	totalBuyCost
	totalSellCost
	totalBuys
	totalSells
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
*/

const columns = [
    {
    	name: 'isPhone',
    	label: 'Type',
    	options: {
    		display: 'excluded',
            filterType: 'dropdown',
            filterOptions: {
                renderValue: value => value ? 'Phone' : 'Accessory'
            },
            customFilterListOptions: {
                render: value => value ? 'Phone' : 'Accessory'
            }
    	}
    },
    {
    	name: 'itemable.brand',
    	label: 'Brand'
    },
    {
    	name: 'itemable.name',
    	label: 'Name'
    },
    {
    	name: 'delta',
    	label: 'Type'
    },
    {
    	name: 'currentQuantity',
    	label: 'Quantity'
    },
    {
    	name: 'defaultPrice',
    	label: 'Price'
    }
];

export default function ItemsList() {
    return (
        <MuiTable title="Items list" URL="/items" columns={columns} dependingRowColor={(row) => row[1] ? '#cf352e' : '#2e8b57'} />
    );
}