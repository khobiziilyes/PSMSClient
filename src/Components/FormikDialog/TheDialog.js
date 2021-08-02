import React from 'react';
import { Form } from 'formik';
import { Button } from '@material-ui/core';
import { ModalWrapper, withKeys } from '@Components/index';
import { injectProps } from '@src/Consts';

export const SubmitButton = ({ withRef, submitForm, ...props }) => (
    <Button onClick={submitForm} ref={withRef} {...props}>
        Submit
    </Button>
);

export const SubmitButtonWithKeys = withKeys(SubmitButton, 'enter', ({ event, element }) => {
        const noSubmit = ['TEXTAREA'];
        const tagName = event.target.tagName;

        if (!noSubmit.includes(tagName)) element.click();
    }
);

export const DefaultActions = ({ buttonsProps, submitForm }) => {
    return (
        <>
            <SubmitButtonWithKeys submitForm={submitForm} {...buttonsProps} />
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
    const buttonsProps = {
        color: 'primary',
        variant: 'outlined',
        disabled: isSubmitting
    }

    const actionsProps = {
        buttonsProps,
        submitForm
    }

    const dialogProps = {
        title,
        open: isOpened,
        handleDialogClose: closeFormDialog,
        extraButtons: injectProps(CustomActions ?? <DefaultActions />, actionsProps),
        buttonsProps,
        
        disableRestoreFocus: true,
        maxWidth: formSize || 'sm',

        disableBackdropClick: isSubmitting,
        disableEscapeKeyDown: isSubmitting
    }

    const content = (
        <Form>
        	{ injectProps(children, { setFieldValue, isSubmitting, values, isCreate }) }
        </Form>
    );

    return ModalWrapper(content, dialogProps);
}

export default TheDialog;