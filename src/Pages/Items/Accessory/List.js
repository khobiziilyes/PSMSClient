import React from 'react';
import MuiTable from '@Components/MuiTable';
import { accessoriesNames } from '@src/Consts';
import ShowAccessory from './Show';

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
        options: {
            customBodyRender: (value, tableMeta, updateValue) => accessoriesNames[value]
        }

    }
];

export default function AccessoriesList() {
    return (
        <MuiTable
            title="Accessories list"
            URL="/accessories"
            columns={columns}
            getNameFromData={rowData => 'Accessories | ' + rowData.brand + ' | ' + rowData.name}
            DetailsContent={<ShowAccessory />}
            formName={'Accessory'}
        />
    );
}