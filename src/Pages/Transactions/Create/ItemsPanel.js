import React from 'react';

import { Tabs, Tab, Typography, Grid, List, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

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
                            defaultOptions={[ { id: 0, name: 'UNKNOWN' } ]}
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

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        display: 'flex',
        height: 300
    },
    tabs: {
        borderRight: `1px solid ${theme.palette.divider}`,
        width: '50%'
    },
    typo: {
        padding: theme.spacing(3, 2),
        height: 200,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center"
    }
}));

export default function ItemsPanel({ currentTab, setCurrentTab, items, tabsList = [] }) {
    const classes = useStyles();

    const handleChange = (event, newValue) => setCurrentTab(newValue);

    return (tabsList.length > 0) ? (
        <div className={classes.root}>
            <Tabs orientation="vertical" variant="scrollable" value={currentTab} onChange={handleChange} className={classes.tabs}>
                {tabsList.map((tabItem, i) => <Tab icon={tabItem.Icon} label={tabItem.Title} key={'vertical-tab-' + i} />)};
            </Tabs>

            {tabsList.map((tabItem, i) =>
                <div role="tabpanel" hidden={currentTab !== i} style={{ padding: 20, width: '100%' }} key={'vertical-tabpanel-' + i}>
                    {
                        React.cloneElement(tabItem.Content, { index: i, setCurrentTab, items })
                    }
                </div>
            )}
        </div>
    ) :
    <div className={classes.typo}>
        <Typography variant="h1" color="secondary" align="center">Add items first</Typography>
    </div>
}