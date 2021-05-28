import React from 'react';
import MuiTable from '@Components/MuiTable';

import { TableCell, TableRow } from '@material-ui/core';
import { List, ListItem, ListItemText, ListItemIcon } from '@material-ui/core';
import { EmojiObjects, PhoneAndroid } from '@material-ui/icons';

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
        name: 'carts',
        label: 'carts',
        options: {
            display: 'excluded'
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
	},
    {
        name: 'carts',
        label: 'List',
        options: {
            customBodyRender: (itemsList) => (
                <List dense>
                    {itemsList.map((item) => {
                        const iconProps = {
                            color: item.priceChanged ? 'error' : 'inherit'
                        };

                        return (
                            <ListItem>
                                <ListItemIcon>
                                    {item.item.isPhone ? <PhoneAndroid {...iconProps} />  : <EmojiObjects {...iconProps} />}
                                </ListItemIcon>

                                <ListItemText
                                    {...iconProps}
                                    primaryTypographyProps={{style: iconProps}}
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

const moreOptions = (data) => {
    return {
        responsive: 'stacked',
        expandableRows: true,
        expandableRowsOnClick: true,
        renderExpandableRow: (rowData) => {
            const Carts = rowData[2];
            
            return Carts.map((Cart, i) => (
                <TableRow key={i + Cart.item.itemable.name} { ...(Cart.priceChanged && {style: {backgroundColor: 'rgba(255, 229, 3, 0.15)'}})}>
                    <TableCell component="th" scope="row">{'#' + (i + 1)}</TableCell>
                    <TableCell align="right">{Cart.item.itemable.name}</TableCell>
                    <TableCell align="right">{Cart.item.itemable.brand}</TableCell>
                    <TableCell align="right">{Cart.Quantity}</TableCell>
                    <TableCell align="right">{Cart.costPerItem}</TableCell>
                    <TableCell align="right">{Cart.costPerItem * Cart.Quantity}</TableCell>
                </TableRow>
            ));
        },
        //rowsExpanded: [...Array(data.data ? data.data.length : 0).keys()]
    };
}

export default function TransactionsList() {
    return (
        <MuiTable
        	title="Transactions list"
        	URL="/transactions"
        	columns={columns}
        	includeUpdateAttributes={false}
        	//dependingRowColor={(row) => row[1] ? '#cf352e' : '#2e8b57'}
            //moreOptions={moreOptions}
            //components={{ExpandButton: () => null}}
        />
    );
}