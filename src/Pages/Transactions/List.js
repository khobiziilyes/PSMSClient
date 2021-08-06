import React from 'react';
import MuiTable from '@Components/MuiTable';
import { List, ListItem, ListItemText, ListItemIcon } from '@material-ui/core';
import { EmojiObjects, PhoneAndroid } from '@material-ui/icons';
import Show from './Show';
import { makeStyles } from '@material-ui/core/styles';

const cartBody = itemsList => (
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
);

const columns = [
	{
		name: 'person.name',
		label: 'Person',
        filterName: ['person']
	},
	{
		name: 'deleted_at',
		label: 'Delete time',
        options: {
            customBodyRender: value => value || 'N/A'
        }
	},
    {
        name: 'carts',
        label: 'List',
        options: {
            filter: false,
            customBodyRender: cartBody
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
        	URL={"/" + (isBuy ? 'buy' : 'sell')}
        	columns={columns}
        	includeUpdateColumns={false}
            initialFilters={{ withTrashed: 1 }}
        	dependingRowColor={rowData => rowData.deleted_at && classes.redRow}
            
            DetailsModal={<Show />}
        />
    );
}