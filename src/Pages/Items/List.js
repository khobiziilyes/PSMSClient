import React from 'react';
import MuiTable from '@Components/MuiTable';
import ShowItem from './Show';

import { Assessment } from '@material-ui/icons';
import { Button } from '@material-ui/core';

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

const ViewStatsButton = ({ viewStats, setViewStats }) => (
    <Button startIcon={<Assessment />} onClick={() => setViewStats(oldVal => !oldVal)} color="primary" variant="outlined">
        {(viewStats ? 'Hide ' : 'View') + ' Stats'}
    </Button>
);

export default function ItemsList({ isPhone }) {
    const [viewStats, setViewStats] = React.useState(false);

    return (
        <MuiTable
            title="Items list"
            URL="/items"
            columns={columns}
            getNameFromData={(rowData) => (isPhone ? 'Phones' : 'Accessories') + ' | ' + rowData.itemable.brand + ' | ' + rowData.itemable.name}
            DetailsContent={<ShowItem viewStats={viewStats} />}
            formName='Item'
            initialFilters={{ isPhone: isPhone ? 1 : 0 }}
            ExtraDetailsDialogButtons={<ViewStatsButton setViewStats={setViewStats} viewStats={viewStats} />}
        />
    );
}