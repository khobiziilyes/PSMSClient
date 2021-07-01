import React from 'react';
import { Form } from 'formik';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';

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
    AdditionalActions = null
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
        disabled: isSubmitting,
        variant: 'outlined'
    }

    return (
         <Dialog {...dialogProps}>
            <DialogTitle>{title}</DialogTitle>

            <DialogContent>
                <Form>
                    {
                        React.cloneElement(children, { setFieldValue, isSubmitting })
                    }
                </Form>
            </DialogContent>
    
            <DialogActions>
                <Button onClick={closeFormDialog} {...ButtonsProps}>
                    Cancel
                </Button>
                
                <Button onClick={submitForm} {...ButtonsProps}>
                    Submit
                </Button>

                { AdditionalActions && AdditionalActions(ButtonsProps) }
            </DialogActions>
        </Dialog>
    );
}

export default TheDialog;