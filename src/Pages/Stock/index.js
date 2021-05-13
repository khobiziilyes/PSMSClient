import React from 'react';
import MuiTable from '@Components/MuiTable';

const columns = [
    {
        name: 'id',
        label: 'ID'
    },
    {
        name: 'name',
        label: 'Name'
    },
    {
        name: 'createdAt',
        label: 'Created At',
        
        /*options: {
            customBodyRender: (value, tableMeta, updateValue) => {
                return <p>Something</p>;
            }
        }
        */
    }
];

export default function Stock() {
    return (
        <MuiTable title="Something" baseUrl="https://609c739b04bffa001792ceba.mockapi.io/phones" columns={columns} />
    );
}