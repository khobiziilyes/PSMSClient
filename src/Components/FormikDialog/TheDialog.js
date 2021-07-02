import React from 'react';
import { Form } from 'formik';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';

export const CancelButton = ({ closeFormDialog, ...props }) => 
    <Button onClick={closeFormDialog} {...props}>
        Cancel
    </Button>

export const SubmitButton = ({ submitForm, ...props }) => 
    <Button onClick={submitForm} {...props}>
        Submit
    </Button>

export const DefaultActions = ({ ButtonsProps, closeFormDialog, submitForm }) => (
    <>
        <CancelButton closeFormDialog={closeFormDialog} {...ButtonsProps} />
        <SubmitButton submitForm={submitForm} {...ButtonsProps} />
    </>
);

const TheDialog = ({
    formikBag: {
        submitForm,
        isSubmitting,
        setFieldValue
    },
    title,
    isOpened,
    closeFormDialog,
    formSize,
    children,
    CustomActions = null
}) => {
    const dialogProps = {
        open: isOpened,
        disableBackdropClick: isSubmitting,
        disableEscapeKeyDown: isSubmitting,
        onClose: closeFormDialog,
        fullWidth: true,
        maxWidth: formSize || 'sm'
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
                    { React.cloneElement(children, { setFieldValue, isSubmitting }) }
                </Form>
            </DialogContent>
            
            <DialogActions>
                { React.cloneElement(CustomActions ?? <DefaultActions />, actionsProps) }
            </DialogActions>
        </Dialog>
    );
}

export default TheDialog;