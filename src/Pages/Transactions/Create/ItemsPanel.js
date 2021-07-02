import React from 'react';

import { Tabs, Tab, Typography, Grid, List, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import Text from '@Components/Inputs/Text';
import ListItem from '@Components/ShowResource/ListItem';

import { AttachMoney, MoneyOff } from '@material-ui/icons';

export function ProductItemTabContent({ isSubmitting, removeItem, index, setValue }) {
    // Nrmlement t5dm b "values" instead.
    
    const [costPerItem, setCostPerItem] = React.useState(0);
    const [Quantity, setQuantity] = React.useState(0);

    return (
        <Grid container spacing={3}>
            <Grid item xs={6}>
                <Typography variant="h6" gutterBottom>
                    Basic informations
                </Typography>

                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Text name={`items.${index}.costPerItem`} label="Cost per item" />
                    </Grid>

                    <Grid item xs={12}>
                        <Text name={`items.${index}.Quantity`} label="Quantity" />
                    </Grid>

                    <Grid item xs={12}>
                        <Button onClick={() => { setValue(0); removeItem(index); }} fullWidth color="primary" variant="outlined" disabled={isSubmitting}>
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

                    <ListItem primary="Left Quantity" secondary={6 - Quantity}>
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

export default function ItemsPanel({ tabsList = [] }) {
    console.log(tabsList);

    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => setValue(newValue);

    return (tabsList.length > 0) ? (
        <div className={classes.root}>
            <Tabs orientation="vertical" variant="scrollable" value={value} onChange={handleChange} className={classes.tabs}>
                {tabsList.map((tabItem, i) => <Tab icon={tabItem.Icon} label={tabItem.Title} key={'vertical-tab-' + i} />)};
            </Tabs>

            {tabsList.map((tabItem, i) =>
                <div role="tabpanel" hidden={value !== i} style={{ padding: 20, width: '100%' }} key={'vertical-tabpanel-' + i}>
                    {
                        React.cloneElement(tabItem.Content, { index: i, setValue })
                    }
                </div>
            )}
        </div>
    ) :
    <div className={classes.typo}>
        <Typography variant="h1" color="secondary" align="center"> Add items first </Typography>
    </div>
}