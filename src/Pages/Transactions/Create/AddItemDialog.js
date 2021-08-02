import React from 'react';
import { Button, Grid, TextField } from '@material-ui/core';

import Autocomplete from '@material-ui/lab/Autocomplete';
import { accessoriesTypes, phonesTypes } from '@src/Consts';

import { LiveSearch, ModalWrapper } from '@Components';

export default function AddItemDialog({ isBuy, addItemToList, closeAddItemDialog, defaultSelectedProduct = null, ...props }) {
    const [selectedItem, setSelectedItem] = React.useState(null);

    const extraButtons = [
        <Button onClick={() => addItemToList(selectedItem)} color="primary" variant="outlined" disabled={selectedItem === null}>
            Continue
        </Button>
    ];

    const contentProps = { defaultSelectedProduct, setSelectedItem }

    return ModalWrapper(<DialogContent {...contentProps} />, {
		title: 'Add new item',
		handleDialogClose: closeAddItemDialog,
		ShowBaseButtons: false,
		maxWidth: 'sm',
		extraButtons,
		...props
	});
}

function DialogContent({ defaultSelectedProduct, setSelectedItem }) {
    const [selectedProduct, setSelectedProduct] = React.useState(defaultSelectedProduct);

    const setFormatedSelectedItem = theItem => 
        setSelectedItem({
            ...selectedProduct,
            ...theItem,
            productId: selectedProduct.id
        });

    const { isPhone, items } = selectedProduct || {};
    
    const deltaList = isPhone ? phonesTypes : accessoriesTypes;
    const deltaLabel = 'Select the ' + (isPhone ? 'version' : 'quality');

    return (
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
                        label={deltaLabel}
                        options={items}
                        getOptionLabel={option => deltaList[option.delta]}
                        onChange={(event, value) => setFormatedSelectedItem(value)}
                        renderInput={params => <TextField {...params} variant="outlined" placeholder={deltaLabel} />}
                    />
                }
            </Grid>
        </Grid>
    );
}