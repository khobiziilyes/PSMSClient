import React from 'react';
import { Grid, Box } from '@material-ui/core';
import TextField from '@Components/TextField';
import Autocomplete from '@Components/Autocomplete';
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
                        label="Select the item"
                        required
                    />
                </Grid>

                <Grid item xs={12}>
                    <Autocomplete
                        options={['Redmi', 'Samsung', 'Nokia']}
                        label="Select the quality"
                        required
                    />
                </Grid>
            </ComplicatedGrid>

            <ComplicatedGrid>
                <Grid item xs={12}>
                    <TextField label="Cost per item" required />
                </Grid>

                <Grid item xs={12}>
                    <TextField label="Quantity" required />
                </Grid>
            </ComplicatedGrid>
            
            <ComplicatedGrid>
                <Grid item xs={12}>
                    <Autocomplete
                        options={['Redmi', 'Samsung', 'Nokia']}
                        label="Select the seller"
                        required
                    />
                </Grid>

                <Grid item xs={12}>
                    <TextField label="Default price" required />
                </Grid>
            </ComplicatedGrid>
        </Grid>
    );
}