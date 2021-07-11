import React from 'react';
import { useFormikContext, FieldArray } from 'formik';
// import * as Yup from 'yup';

import TheDialog from '@Components/FormikDialog/TheDialog';

import AddItemDialog from './AddItemDialog';
import ItemsPanel, { ProductItemTabContent, CheckoutTabContent } from './ItemsPanel';
import CustomActions from './Actions';

import { Phone as PhoneIcon, AttachMoney } from '@material-ui/icons';

function groupBy(collection, property) {
    var i = 0, val, index,
        values = [], result = [];
    for (; i < collection.length; i++) {
        val = collection[i][property];
        index = values.indexOf(val);
        if (index > -1)
            result[index].push(collection[i]);
        else {
            values.push(val);
            result.push([collection[i]]);
        }
    }

    return result;
}

const formikParams = isBuy => ({
    formatData: values => {
        const groupedItems = groupBy(values.items, 'id');
        
        const cart = groupedItems.map(group => ({
            item_id: group[0].id,
            list: group.map(item => ({
                costPerItem: parseInt(item.costPerItem),
                Quantity: parseInt(item.Quantity)
            }))
        }));

        return {
            person_id: values.person.id,
            cart,
            notes: values.notes
        }
    },
    URL: '/' + (isBuy ? 'buy' : 'sell'),
    dataURL: '/' + (isBuy ? 'buy' : 'sell'),
    tableRoute: '/' + (isBuy ? 'buys' : 'sells'),
    title: 'Perform new transaction',
    selfDialog: true,
    formSize: 'md',
    initialValues: {
        items: [],
        person: {
            id: 0,
            name: 'UNKNOWN'
        },
        notes: ''
    },
    // testing: true
});

const CheckoutTab = isBuy => ({
    Title: 'Checkout',
    Icon: <AttachMoney />,
    Content: <CheckoutTabContent isBuy={isBuy} />
})

const FieldArrayChild = ({ defaultSelectedProduct, closeAddItemDialog, isBuy, addItemDialogOpened, arrayHelpers: { push, remove }}) => {
    const { isSubmitting, values } = useFormikContext();
    const [currentTab, setCurrentTab] = React.useState(0);

    const addItemToList = newItem => {
        const TabProps = {
            removeItem: remove,
            isSubmitting,
            isBuy
        }
        
        const formatedItem = {
            id: newItem.id,
            Title: newItem.name + ' - ' + newItem.delta,
            Icon: newItem.isPhone ? <PhoneIcon /> : null,
            currentQuantity: newItem.currentQuantity,
            Content: <ProductItemTabContent {...TabProps} />,
            costPerItem: newItem.defaultPrice,
            Quantity: 1
        }

        setCurrentTab(values.items.length);
        push(formatedItem);

        closeAddItemDialog();
    }

    const AddItemDialogProps = {
        defaultSelectedProduct,
        isBuy,
        addItemToList,
        closeAddItemDialog,
        open: addItemDialogOpened
    }

    const tabsList = (values.items && values.items.length) ? [...values.items, CheckoutTab(isBuy)] : [];

    const itemsPanelProps = {
        tabsList,
        currentTab,
        setCurrentTab,
        items: values.items
    }

    return (
        <>
            <AddItemDialog {...AddItemDialogProps} />
            <ItemsPanel {...itemsPanelProps} />
        </>
    );
}

function TheForm({ formikBag, dialogProps, isBuy, isCreate, defaultSelectedProduct = null }) {
    const [addItemDialogOpened, setAddItemDialogOpened] = React.useState(true);
    const closeAddItemDialog = () => setAddItemDialogOpened(false);
    
    return (
        <TheDialog formikBag={formikBag} {...dialogProps} CustomActions={<CustomActions openAddItemDialog={() => setAddItemDialogOpened(true)} />}>
            <FieldArray name="items">
                {
                    arrayHelpers => {
                        const FieldArrayChildProps = {
                            defaultSelectedProduct,
                            arrayHelpers,
                            closeAddItemDialog,
                            isBuy,
                            addItemDialogOpened
                        }

                        return <FieldArrayChild {...FieldArrayChildProps} />;
                    }
                }
            </FieldArray>
        </TheDialog>
    );
}

export {
    formikParams,
    TheForm
}