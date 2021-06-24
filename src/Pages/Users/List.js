import React from 'react';
import MuiTable from '@Components/MuiTable';
import ShowUser from './Show';

const columns = [
    {
        name: 'name',
        label: 'Name'
    }
];

export default function UsersList() {
    return (
        <MuiTable
        	title="Users list"
        	URL='/owner/users'
        	columns={columns}
            DetailsContent={ShowUser}
            StandardDialog={false}
            DialogSize='sm'
            getNameFromData={(rowData) => rowData.name}
        />
    );
}