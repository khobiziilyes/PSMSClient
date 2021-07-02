import React from 'react';
import { useFormikContext, FieldArray } from 'formik';
// import * as Yup from 'yup';

import TheDialog from '@Components/FormikDialog/TheDialog';

import AddItemDialog from './AddItemDialog';
import ItemsPanel, { ProductItemTabContent } from './ItemsPanel';
import CustomActions from './Actions';

import { Phone as PhoneIcon, AttachMoney } from '@material-ui/icons';

const formikParams = isBuy => ({
    onSubmit: (values, { setSubmitting }) => {
        console.log(values);
        setTimeout(() => setSubmitting(false), 5000);
    },
    title: 'Perform new transaction',
    selfDialog: true,
    formSize: 'md',
    initialValues: {
        items: []
    }
});

const CheckoutTab = {
    Title: 'Checkout',
    Icon: <AttachMoney />,
    Content: <></>
}

const FieldArrayChild = ({ closeAddItemDialog, isBuy, addItemDialogOpened, arrayHelpers: { push, remove }}) => {
    const { isSubmitting, values } = useFormikContext();

    const addItemToList = newItem => {
        const TabProps = {
            removeItem: remove,
            isSubmitting
        }

        const formatedItem = {
            id: newItem.id,
            Title: newItem.name + ' - ' + newItem.delta,
            Icon: newItem.isPhone ? <PhoneIcon /> : null,
            Content: <ProductItemTabContent {...TabProps} />,
            costPerItem: 1000,
            Quantity: 1
        }

        push(formatedItem);
        closeAddItemDialog();
    }

    const AddItemDialogProps = {
        isBuy,
        addItemToList,
        closeAddItemDialog,
        open: addItemDialogOpened
    }

    const tabsList = [
        ...(values.items ?? []),
        // CheckoutTab
    ];

    return (
        <>
            <AddItemDialog {...AddItemDialogProps} />
            <ItemsPanel tabsList={tabsList} />
        </>
    );
}

function TheForm({ formikBag, dialogProps, isBuy, isCreate }) {
    const [addItemDialogOpened, setAddItemDialogOpened] = React.useState(false);
    const closeAddItemDialog = () => setAddItemDialogOpened(false);
    
    return (
        <TheDialog formikBag={formikBag} {...dialogProps} CustomActions={<CustomActions openAddItemDialog={() => setAddItemDialogOpened(true)} />}>
            <FieldArray name="items">
                {
                    arrayHelpers => {
                        const FieldArrayChildProps = {
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