import React from 'react';
import MuiTable from '@Components/MuiTable';
import ShowItem from './Show';

const columns = [
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
            getNameFromData={(rowData) => (isPhone ? 'Phones' : 'Accessories') + ' | ' + rowData.itemable.brand + ' | ' + rowData.itemable.name}
            DetailsContent={ShowItem}
            formName='Item'

            StandardDialog={false}
            initialFilters={{ isPhone: isPhone ? 1 : 0 }}
        />
    );
}