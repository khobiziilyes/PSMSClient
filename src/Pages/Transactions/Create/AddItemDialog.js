import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Grid } from '@material-ui/core';

import Autocomplete from '@Components/Inputs/Autocomplete';
import LiveSearch from '@Components/Inputs/LiveSearch';
import { accessoriesTypes, phonesTypes } from '@src/Consts';

export default function AddFormDialog({ isBuy, addItemToList, closeAddItemDialog, ...props }) {
    const [selectedProduct, setSelectedProduct] = React.useState({});
    const [selectedItem, setSelectedItem] = React.useState(null);

    const { id: productId, name, brand, isPhone, items } = selectedProduct;
    const deltaList = isPhone ? phonesTypes : accessoriesTypes;

    const setFormatedSelectedItem = item => 
        setSelectedItem({
            id: item.id,
            delta: item.delta,
            productId,
            name,
            brand,
            isPhone,
            showName: name + ' - ' + deltaList[item.delta]
        });
    
    return (
        <Dialog onClose={closeAddItemDialog} fullWidth maxWidth='sm' {...props}>
            <DialogTitle>Add new item</DialogTitle>
            
            <DialogContent>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <LiveSearch
                            formatURL={query => "/search/all"}
                            withItems
                            onChange={(event, value) => setSelectedProduct(value)}
                            getOptionLabel={option => option.name}
                            getOptionSelected={(option, value) => option.id === value.id}
                            disableClearable
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Autocomplete
                            label={"Select the " + (isPhone ? 'version' : 'quality')}
                            options={items || []}
                            getOptionLabel={option => deltaList[option.delta]}
                            onChange={(event, value) => setFormatedSelectedItem(value)}
                        />
                    </Grid>
                </Grid>
            </DialogContent>
            
            <DialogActions>
                <Button onClick={closeAddItemDialog} color="primary">
                    Cancel
                </Button>
                
                <Button onClick={() => addItemToList(selectedItem)} color="primary" disabled={selectedItem === null}>
                    Continue
                </Button>
            </DialogActions>
        </Dialog>
    );
}