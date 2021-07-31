import React from 'react';

import { Typography, Grid, List, Button } from '@material-ui/core';

import MaskedInput from '@Components/Inputs/MaskedInput';
import Text from '@Components/Inputs/Text';
import { FormikLiveSearch } from '@Components/Inputs/LiveSearch';
import Notes from '@Components/Inputs/Notes';
import ListItem from '@Components/ShowResource/ListItem';

import { AttachMoney, MoneyOff } from '@material-ui/icons';

export function CheckoutTabContent({ isBuy, items }) {
    return (
        <Grid container spacing={3}>
            <Grid item xs={6}>
                <Typography variant="h6" gutterBottom>
                    Basic informations
                </Typography>

                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <FormikLiveSearch
                            name="person"
                            formatURL={query => '/search/people/' + (isBuy ? 'vendor' : 'customer')}
                            minLength={2}
                            placeholder="UNKNOWN"
                            withItems
                            getOptionLabel={option => option.name}
                            getOptionSelected={(option, value) => option.id === value.id}
                            defaultOptions={[ { id: isBuy ? 2 : 1, name: 'UNKNOWN' } ]}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Notes />
                    </Grid>

                    <Grid item xs={12}>
                        
                    </Grid>
                </Grid>
            </Grid>

            <Grid item xs={6}>
                <Typography variant="h6">Current item</Typography>

                <List>
                    <ListItem primary="Total Price" secondary={''}>
                        <MoneyOff />
                    </ListItem>

                    <ListItem primary="Profit" secondary="3 000 DA">
                        <AttachMoney />
                    </ListItem>

                    <ListItem primary="New Quantity" secondary={''}>
                        <AttachMoney />
                    </ListItem>
                </List>
            </Grid>
        </Grid>
    );
}

export function ProductItemTabContent({ isSubmitting, removeItem, isBuy, index, setCurrentTab, items }) {
    const { Quantity, costPerItem, currentQuantity } = items[index];

    return (
        <Grid container spacing={3}>
            <Grid item xs={6}>
                <Typography variant="h6" gutterBottom>
                    Basic informations
                </Typography>

                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <MaskedInput name={`items.${index}.costPerItem`} label="Cost per item" />
                    </Grid>

                    <Grid item xs={12}>
                        <Text name={`items.${index}.Quantity`} label="Quantity" />
                    </Grid>

                    <Grid item xs={12}>
                        <Button onClick={() => { setCurrentTab(0); removeItem(index); }} fullWidth color="primary" variant="outlined" disabled={isSubmitting}>
                            Remove
                        </Button>
                    </Grid>
                </Grid>
            </Grid>

            <Grid item xs={6}>
                <Typography variant="h6">Current item</Typography>

                <List>
                    <ListItem primary="Total Price" secondary={(Quantity * costPerItem) + ' DA'}>
                        <MoneyOff />
                    </ListItem>

                    <ListItem primary="Profit" secondary="3 000 DA">
                        <AttachMoney />
                    </ListItem>

                    <ListItem primary="New Quantity" secondary={currentQuantity + Quantity * (isBuy ? 1 : -1 )}>
                        <AttachMoney />
                    </ListItem>
                </List>
            </Grid>
        </Grid>
    );
}