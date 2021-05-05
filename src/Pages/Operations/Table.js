import React from 'react';
import MuiTable from '@Components/MuiTable';

const columns = [
    {
        name: 'id',
        label: 'ID'
    },
    {
        name: 'first_name',
        label: 'First Name'
    },
    {
        name: 'last_name',
        label: 'Last Name'
    },
    {
        name: 'email',
        label: 'Email'
    }
];

export default function Stock() {
    return (
        <MuiTable title="Operations list" baseUrl="https://reqres.in/api/users" columns={columns} />
    );
}