import React from 'react';
import MuiTable from '@Components/MuiTable';
import { accessoriesNames } from '@src/Consts';
import Show from './Show';
import { getIdFromText } from '@src/Consts';

const columns = [
    {
        name: 'name',
        label: 'Name'
    },
    {
        name: 'brand',
        label: 'Brand'
    },
    {
        name: 'type_id',
        label: 'Type',
        filterName: ['type'],
        options: {
            filterType: 'dropdown',
            customBodyRender: value => accessoriesNames[value] + ' #' + value
        },
        formatValue: getIdFromText
    }
];

export default function AccessoriesList() {
    return (
        <MuiTable
            title="Accessories list"
            URL="/accessories"
            columns={columns}
            DetailsModal={<Show />}
            formName="Accessory"
        />
    );
}