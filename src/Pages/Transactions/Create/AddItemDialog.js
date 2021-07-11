import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Grid, TextField } from '@material-ui/core';

import Autocomplete from '@material-ui/lab/Autocomplete';
import LiveSearch from '@Components/Inputs/LiveSearch';
import { accessoriesTypes, phonesTypes } from '@src/Consts';

export default function AddItemDialog({ isBuy, addItemToList, closeAddItemDialog, defaultSelectedProduct = null, ...props }) {
    const [selectedProduct, setSelectedProduct] = React.useState(defaultSelectedProduct);
    const [selectedItem, setSelectedItem] = React.useState(null);
    
    const { isPhone, items } = selectedProduct || {};
    const deltaList = isPhone ? phonesTypes : accessoriesTypes;

    const setFormatedSelectedItem = theItem => 
        setSelectedItem({
            ...selectedProduct,
            ...theItem,
            productId: selectedProduct.id
        });
    
    return (
        <Dialog onClose={closeAddItemDialog} fullWidth maxWidth='sm' {...props}>
            <DialogTitle>Add new item</DialogTitle>
            
            <DialogContent>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <LiveSearch
                            formatURL={query => '/search/items/all'}
                            withItems
                            getOptionLabel={option => option.name}
                            getOptionSelected={(option, value) => option.id === value.id}
                            onChange={(event, value) => setSelectedProduct(value)}
                            defaultValue={defaultSelectedProduct}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        { 
                            selectedProduct && <Autocomplete
                                label={"Select the " + (isPhone ? 'version' : 'quality')}
                                options={items}
                                getOptionLabel={option => deltaList[option.delta]}
                                onChange={(event, value) => setFormatedSelectedItem(value)}
                                renderInput={params => <TextField {...params} variant="outlined" placeholder={'Something'} />}
                            />
                        }
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