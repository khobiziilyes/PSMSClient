import React from 'react';
import { ModalWrapper } from '@Components/index';
import { SubmitButtonWithKeys } from '@Components/ModalWrapper/Buttons';

const TheDialog = ({
    formSize,
    children,

    formikBag: {
        submitForm,
        isSubmitting
    },
    CustomActions = [],
    ...props
}) => {
    const wrapperProps = {
        extraButtons: [...CustomActions, <SubmitButtonWithKeys onClick={submitForm} /> ],
        buttonsProps: { disabled: isSubmitting },
        
        disableRestoreFocus: true,
        maxWidth: formSize || 'sm',

        disableBackdropClick: isSubmitting,
        disableEscapeKeyDown: isSubmitting,

        ...props
    }

    return ModalWrapper(children, wrapperProps);
}

export default TheDialog;