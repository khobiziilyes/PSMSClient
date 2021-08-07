import React from 'react';
import MuiTable from '@Components/MuiTable';
import Show from './Show';

import { translateDelta } from '@src/Consts';

const columns = isPhone => [
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
    	label: 'Type',
        options: {
            customBodyRender: value => translateDelta(value, isPhone)
        }
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
            columns={columns(isPhone)}
            DetailsModal={<Show isPhone={isPhone} />}
            formName='Item'
            initialFilters={{ isPhone: isPhone ? 1 : 0 }}
        />
    );
}