import React from 'react';
import { Form } from 'formik';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';
import withKeys from '@Components/withKeys';

export const CancelButton = ({ closeFormDialog, ...props }) => 
    <Button onClick={closeFormDialog} {...props}>
        Cancel
    </Button>

export const SubmitButton = ({ withRef, submitForm, ...props }) => 
    <Button onClick={submitForm} ref={withRef} {...props}>
        Submit
    </Button>

export const SubmitButtonWithKeys = withKeys(SubmitButton, 'ctrl+enter', ({ event, element }) => {
        const noSubmit = ['TEXTAREA'];
        const tagName = event.target.tagName;

        if (!noSubmit.includes(tagName)) element.click();
    }
);

export const DefaultActions = ({ ButtonsProps, closeFormDialog, submitForm }) => {
    return (
        <>
            <CancelButton closeFormDialog={closeFormDialog} {...ButtonsProps} />
            <SubmitButtonWithKeys submitForm={submitForm} {...ButtonsProps} />
        </>
    );
}

const TheDialog = ({
    formikBag: {
        submitForm,
        isSubmitting,
        setFieldValue,
        values
    },
    title,
    isOpened,
    closeFormDialog,
    formSize,
    children,
    CustomActions = null,
    isCreate
}) => {
    const dialogProps = {
        open: isOpened,
        disableBackdropClick: isSubmitting,
        disableEscapeKeyDown: isSubmitting,
        onClose: closeFormDialog,
        fullWidth: true,
        maxWidth: formSize || 'sm',
        disableRestoreFocus: true
    }

    const ButtonsProps = {
        color: 'primary',
        variant: 'outlined',
        disabled: isSubmitting
    }

    const actionsProps = {
        ButtonsProps,
        closeFormDialog,
        submitForm
    }

    return (
         <Dialog {...dialogProps}>
            <DialogTitle>{title}</DialogTitle>

            <DialogContent>
                <Form>
                    { React.cloneElement(children, { setFieldValue, isSubmitting, values, isCreate }) }
                </Form>
            </DialogContent>
            
            <DialogActions>
                { React.cloneElement(CustomActions ?? <DefaultActions />, actionsProps) }
            </DialogActions>
        </Dialog>
    );
}

export default TheDialog;