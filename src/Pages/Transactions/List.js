import React from 'react';
import MuiTable from '@Components/MuiTable';
import { List, ListItem, ListItemText, ListItemIcon } from '@material-ui/core';
import { EmojiObjects, PhoneAndroid } from '@material-ui/icons';
import ShowTransaction from './Show';
import { makeStyles } from '@material-ui/core/styles';

const columns = [
	/*
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
    */
	{
		name: 'person.name',
		label: 'Person',
        filterName: 'person'
	},
	{
		name: 'deleted_at',
		label: 'Delete time',
        options: {
            customBodyRender: (value) => value || 'N/A'
        }
	},
    {
        name: 'carts',
        label: 'List',
        options: {
            filter: false,
            customBodyRender: (itemsList) => (
                <List dense>
                    {itemsList.map((item, i) => {
                        const colorProp = {
                            color: item.priceChanged ? 'error' : 'inherit'
                        };

                        return (
                            <ListItem key={'cart' + i + item.costPerItem + item.item.itemable.name}>
                                <ListItemIcon>
                                    {item.item.isPhone ? <PhoneAndroid {...colorProp} />  : <EmojiObjects {...colorProp} />}
                                </ListItemIcon>

                                <ListItemText
                                    primary={item.item.itemable.name}
                                    secondary={`${item.Quantity} ✖ ${item.costPerItem}`}
                                />
                            </ListItem>
                        );
                    })}
                </List>
            )
        }
    }
];

const useStyles = makeStyles({
    redRow: {
        '& td': {
            color: '#C40234'
        }
    }
});

export default function TransactionsList({ isBuy }) {
    const classes = useStyles();

    return (
        <MuiTable
        	title="Transactions list"
        	URL="/transactions"
        	columns={columns}
        	includeUpdateColumns={false}
            initialFilters={{ isBuy: isBuy ? 1 : 0, withTrashed: 1 }}
        	dependingRowColor={(row) => row.deleted_at && classes.redRow}
            getNameFromData={() => 'Transaction Details'}
            DialogContent={ShowTransaction}
            StandardDialog={false}
        />
    );
}