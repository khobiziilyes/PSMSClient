import React from 'react';
import MuiTable from '@Components/MuiTable';
import ShowAccessory from './Show';

const columns = [
    {
        name: 'brand',
        label: 'Brand'
    },
    {
        name: 'name',
        label: 'Name'
    },
    {
        name: 'type_id',
        label: 'Type',
        options: {
            hint: 'SUP bitch',
            customBodyRender: (value, tableMeta, updateValue) => {
                return 'FUCK ' + value;
            }
        }

    }
];

export default function AccessoriesList() {
    return (
        <MuiTable
            title="Accessories list"
            URL="/accessories"
            columns={columns}
            getNameFromData={(rowData) => 'Accessories | ' + rowData.brand + ' | ' + rowData.name}
            DialogContent={ShowAccessory}
        />
    );
}