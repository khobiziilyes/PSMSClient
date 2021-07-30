import React from 'react';
import MuiTable from '@Components/MuiTable';
import Show from './Show';

const columns = [
    {
        name: 'brand',
        label: 'Brand'
    },
    {
        name: 'name',
        label: 'Name'
    }
];

export default function PhonesList() {
    return (
        <MuiTable
            title="Phones list"
            URL="/phones"
            columns={columns}
            DetailsModal={<Show />}
            formName="Phone"
        />
    );
}