import React from 'react';
import MuiTable from '@Components/MuiTable';
import ShowItem from './Show';

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
    /*
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
    */
    {
    	name: 'itemable.name',
    	label: 'Name'
    },
    {
    	name: 'itemable.brand',
    	label: 'Brand'
    },
    {
    	name: 'delta',
    	label: 'Type'
    },
    {
    	name: 'currentQuantity',
    	label: 'Quantity',
        options: {
            filter: false
        }
    },
    {
    	name: 'defaultPrice',
    	label: 'Price',
        options: {
            filter: false
        }
    }
];

export default function ItemsList({ isPhone }) {
    return (
        <MuiTable
            title="Items list"
            URL="/items"
            columns={columns}
            initialFilters={{ isPhone: isPhone ? 1 : 0 }}
            getNameFromData={(rowData) => (isPhone ? 'Phones' : 'Accessories') + ' | ' + rowData.itemable.brand + ' | ' + rowData.itemable.name}
            DialogContent={ShowItem}
            StandardDialog={false}
        />
    );
}