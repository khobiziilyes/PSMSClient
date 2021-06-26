import React from 'react';
import MuiTable from '@Components/MuiTable';
import { List, ListItem, ListItemText, ListItemIcon, Button } from '@material-ui/core';
import { EmojiObjects, PhoneAndroid } from '@material-ui/icons';
import ShowTransaction from './Show';
import { makeStyles } from '@material-ui/core/styles';

import {
    ArrowLeft,
    ArrowRight,
    Print
} from '@material-ui/icons';


const columns = [
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

function ExtraDetailsDialogButtons({ viewCart, setViewCart, rowData }) {
    return (
        <>
            <Button startIcon={<Print />} onClick={() => {}} color="primary" variant="outlined">
                Receipt
            </Button>

            <Button startIcon={<ArrowLeft />} onClick={() => setViewCart(viewCart - 1)} color="primary" variant="outlined" disabled={viewCart === 0}>
                Previous Cart
            </Button>

            <Button endIcon={<ArrowRight />} onClick={() => setViewCart(viewCart + 1)} color="primary" variant="outlined" disabled={viewCart === rowData.carts.length}>
                Next Cart
            </Button>
        </>
    );
}

export default function TransactionsList({ isBuy }) {
    const classes = useStyles();
    const [viewCart, setViewCart] = React.useState(0);

    return (
        <MuiTable
        	title="Transactions list"
        	URL={"/" + (isBuy ? 'buy' : 'sell')}
        	columns={columns}
        	includeUpdateColumns={false}
            initialFilters={{ withTrashed: 1 }}
        	dependingRowColor={(row) => row.deleted_at && classes.redRow}
            getNameFromData={() => 'Transaction Details'}
            
            DetailsContent={<ShowTransaction viewCart={viewCart} />}
            ShowEditButton={true}
            ExtraDetailsDialogButtons={<ExtraDetailsDialogButtons viewCart={viewCart} setViewCart={setViewCart} />}
        />
    );
}