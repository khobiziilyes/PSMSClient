import React from 'react';
import { Grid, Box } from '@material-ui/core';
import Text from '@Components/Inputs/Text';
import Autocomplete from '@Components/Inputs/Autocomplete';
import ItemToggle from '@Components/ItemToggle';

function ComplicatedGrid(props) {
    return (
        <Grid item xs={4}>
            <Box visibility={props.visibility || 'visible'}>
                <Grid container spacing={3} direction="column">
                    {props.children}
                </Grid>
            </Box>
        </Grid>
    );
}

export default function BasicInformations() {
    return (
        <Grid container spacing={3}>
            <Grid item xs={12} style={{ textAlign: "center" }}>
                <ItemToggle />
            </Grid>

            <ComplicatedGrid>
                <Grid item xs={12}>
                    <Autocomplete
                        options={['Redmi', 'Samsung', 'Nokia']}
                        name="item_id"
                        label={"Select the " + ''}
                    />
                </Grid>

                <Grid item xs={12}>
                    <Autocomplete
                        options={['Redmi', 'Samsung', 'Nokia']}
                        name="Delta"
                        label="Select the quality"
                    />
                </Grid>
            </ComplicatedGrid>

            <ComplicatedGrid>
                <Grid item xs={12}>
                    <Text name="costPerItem" label="Cost per item" />
                </Grid>

                <Grid item xs={12}>
                    <Text name="Quantity" label="Quantity" />
                </Grid>
            </ComplicatedGrid>
            
            <ComplicatedGrid>
                <Grid item xs={12}>
                    <Autocomplete
                        options={['Redmi', 'Samsung', 'Nokia']}
                        label="Select the seller"
                    />
                </Grid>
            </ComplicatedGrid>
        </Grid>
    );
}