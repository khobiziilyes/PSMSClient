import React from 'react';
import MuiTable from '@Components/MuiTable';

const columns = [
	{
		name: 'isBuy',
		label: 'Type',
		options: {
    		display: 'excluded',
            filterType: 'dropdown',
            filterOptions: {
                renderValue: value => value ? 'Buy' : 'Sell'
            },
            customFilterListOptions: {
                render: value => value ? 'Buy' : 'Sell'
            }
    	}
	},
	{
		name: 'person.name',
		label: 'Person'
	},
	{
		name: 'deleted_at',
		label: 'Delete time',
		options: {
			customBodyRender: (value) => value || 'N/A'
		}
	}
];

export default function TransactionsList() {
    return (
        <MuiTable
        	title="Transactions list"
        	URL="/transactions"
        	columns={columns}
        	includeUpdateAttributes={false}
        	dependingRowColor={(row) => row[1] ? '#cf352e' : '#2e8b57'}
        />
    );
}