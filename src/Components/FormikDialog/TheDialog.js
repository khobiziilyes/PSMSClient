import React from 'react';
import { Form } from 'formik';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';
import withKeys from '@Components/withKeys';

let buttonRef = null;

export const CancelButton = ({ closeFormDialog, ...props }) => 
    <Button onClick={closeFormDialog} {...props}>
        Cancel
    </Button>

export const SubmitButton = ({ submitForm, ...props }) => 
    <Button onClick={submitForm} ref={theidk => buttonRef = theidk} {...props}>
        Submit
    </Button>

export const SubmitButtonWithKeys = withKeys(SubmitButton, {
    'ctrl+enter': {
        priority: 1,
        handler: event => {
            const noSubmit = ['TEXTAREA'];
            const tagName = event.target.tagName;

            if (buttonRef && !noSubmit.includes(tagName)) buttonRef.click();
        }
    }
});

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