import React from 'react';
import MuiTable from '@Components/MuiTable';
import ShowCustomer from './Show';

const columns = [
    {
        name: 'name',
        label: 'Name'
    },
    {
    	name: 'phone1',
    	label: 'Phone'
    }
];

export default function PeopleList({ isVendor }) {
    const personType = (isVendor ? 'Vendors' : 'Customers');

    return (
        <MuiTable
            title={personType  + " list"}
            URL={"/" + personType.toLowerCase()}
            columns={columns}
            getNameFromData={(rowData) => rowData.name}
            DialogContent={ShowCustomer}
        />
    );
}