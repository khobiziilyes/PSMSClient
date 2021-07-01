import React from 'react';

import { Tabs, Tab, Typography, Box, Grid, List } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import Text from '@Components/Inputs/Text';
import ListItem from '@Components/ShowResource/ListItem';

import { AttachMoney, MoneyOff } from '@material-ui/icons';

function TabPanel({ children, value, index, ...props }) {
    return (
        <div role="tabpanel" hidden={value !== index} id={`vertical-tabpanel-${index}`} {...props}>
            {children}
        </div>
    );
}

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
        display: 'flex'
    },
    tabs: {
        borderRight: `1px solid ${theme.palette.divider}`,
        width: '50%'
    }
}));

export default function ItemsPanel({ items }) {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => setValue(newValue);
    
    const tabId = id => 'vertical-tab-' + id;

    return (
        <div className={classes.root}>
            <Tabs orientation="vertical" variant="scrollable" value={value} onChange={handleChange} className={classes.tabs}>
                {items.map((item, i) => <Tab label={item.showName} id={tabId(i)} key={tabId(i)} />)};
            </Tabs>

            {items.map((item, i) =>
                <TabPanel style={{ padding: 20, width: '100%' }} value={value} index={i} key={'vertical-tabpanel-' + i}>
                    <Grid container spacing={3}>
                        <Grid item xs={6}>
                            <Typography variant="h6" gutterBottom>
                                Basic informations
                            </Typography>

                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    <Text name="costPerItem" label="Cost per item" />
                                </Grid>

                                <Grid item xs={12}>
                                    <Text name="Quantity" label="Quantity" />
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid item xs={6}>
                            <Typography variant="h6">Current cart</Typography>

                            <List>
                                <ListItem primary="Total Price" secondary="60 000 DA">
                                    <MoneyOff />
                                </ListItem>

                                <ListItem primary="Profit" secondary="3 000 DA">
                                    <AttachMoney />
                                </ListItem>

                                <ListItem primary="Left Quantity" secondary="6">
                                    <AttachMoney />
                                </ListItem>
                            </List>
                        </Grid>
                    </Grid>
                </TabPanel>
            )}
        </div>
    );
}