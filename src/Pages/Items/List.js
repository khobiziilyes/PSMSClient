import React from 'react';
import MuiTable from '@Components/MuiTable';
import ShowItem from './Show';

import { Assessment } from '@material-ui/icons';
import { Button } from '@material-ui/core';
import { accessoriesTypes, phonesTypes } from '@src/Consts'

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
            customBodyRender: value => (isPhone ? phonesTypes : accessoriesTypes)[value]
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

const ViewStatsButton = ({ viewStats, setViewStats, rowData: { itemable: {id: itemable_id} } }) => {
    const highlightItemable = () => {};

    return (
        <>
            <Button startIcon={<Assessment />} onClick={() => setViewStats(oldVal => !oldVal)} color="primary" variant="outlined">
                {(viewStats ? 'Hide ' : 'View') + ' Stats'}
            </Button>

            <Button startIcon={<Assessment />} onClick={highlightItemable} color="primary" variant="outlined">
                Got to Item
            </Button>
        </>
    );
}

export default function ItemsList({ isPhone }) {
    const [viewStats, setViewStats] = React.useState(false);

    return (
        <MuiTable
            title="Items list"
            URL="/items"
            columns={columns(isPhone)}
            getNameFromData={rowData => (isPhone ? 'Phones' : 'Accessories') + ' | ' + rowData.itemable.brand + ' | ' + rowData.itemable.name}
            DetailsContent={<ShowItem viewStats={viewStats} />}
            formName='Item'
            initialFilters={{ isPhone: isPhone ? 1 : 0 }}
            ExtraDetailsDialogButtons={<ViewStatsButton setViewStats={setViewStats} viewStats={viewStats} />}
        />
    );
}