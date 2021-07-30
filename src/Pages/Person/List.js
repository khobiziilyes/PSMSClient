import React from 'react';
import MuiTable from '@Components/MuiTable';
import Show from './Show';

const columns = [
    {
        name: 'name',
        label: 'Name'
    },
    {
    	name: 'phone1',
    	label: 'Phone',
        options: {
            filter: false
        }
    }
];

export default function PeopleList({ isVendor }) {
    const personType = (isVendor ? 'Vendors' : 'Customers');

    return (
        <MuiTable
            title={personType  + " list"}
            URL={"/" + personType.toLowerCase()}
            columns={columns}
            DetailsModal={<Show />}
            formName={personType.slice(0, -1)}
        />
    );
}