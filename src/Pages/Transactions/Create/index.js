import React from 'react';
import * as Yup from 'yup';

import { Button } from '@material-ui/core';

import AddItemDialog from './AddItemDialog';
import ItemsPanel from './ItemsPanel';

const formikParams = isBuy => ({
    //AdditionalActions: (ButtonsProps) => <Button onClick={() => {}} {...ButtonsProps}>Item</Button>,
    title: 'Perform new transaction',
    formSize: 'md',
    initialValues: {
        item_id: '',
        Delta: ''
    },
    validationSchema: Yup.object({
        item_id: Yup.string().required('Required'),
        Delta: Yup.string().required('Required')
    })
});

function TheForm({ isSubmitting, isBuy }) {
    const [addItemDialogOpened, setAddItemDialogOpened] = React.useState(false);
    const closeAddItemDialog = () => setAddItemDialogOpened(false);

    const [selectedItems, setSelectedItems] = React.useState([
        {
            "id": 12,
            "delta": 3,
            "productId": 1,
            "name": "Xiaomi Redmi Note 7",
            "brand": "Xiaomi",
            "isPhone": true,
            "showName": "Xiaomi Redmi Note 7 - 6/64 GB"
        },
        {
            "id": 13,
            "delta": 0,
            "productId": 1,
            "name": "Xiaomi Redmi Note 7",
            "brand": "Xiaomi",
            "isPhone": true,
            "showName": "Incassable - Galaxy M20"
        },
        {
            "id": 13,
            "delta": 0,
            "productId": 1,
            "name": "Xiaomi Redmi Note 7",
            "brand": "Xiaomi",
            "isPhone": true,
            "showName": "Checkout"
        }
    ]);

    const addItemToList = newItem => {
        const alreadyExists = selectedItems.some(item => item.id === newItem.id);
        
        if (alreadyExists) {
            // Show notif
        } else {
            setSelectedItems(localSelectedItems => [...localSelectedItems, newItem]);
            closeAddItemDialog();
        }
    }

    const AddItemDialogProps = {
        isBuy,
        addItemToList,
        closeAddItemDialog,
        open: addItemDialogOpened
    }

    return (
        <>
            <AddItemDialog {...AddItemDialogProps} />
            <ItemsPanel items={selectedItems} />
        </>
    );
}

export {
    formikParams,
    TheForm
}