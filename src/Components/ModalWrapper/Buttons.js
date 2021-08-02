import { Button } from '@material-ui/core';
import withKeys from '@Components/withKeys';

import { HighlightOff, Delete, Edit, NavigateNext } from '@material-ui/icons';

const buttonsProps = {
    color: 'primary',
    variant: 'outlined'
}

export const BaseButton = ({ children, withRef, ...props }) => (
    <Button {...buttonsProps} ref={withRef} {...props}>
        { children }
    </Button>
);

export const CloseButton = props => (
	<BaseButton startIcon={<HighlightOff />} variant="text" {...props}>
        Cancel
    </BaseButton>
);

export const EditButton = props => (
	<BaseButton startIcon={<Edit />} {...props}>
        Edit
    </BaseButton>
);

export const DeleteButton = props => (
    <BaseButton startIcon={<Delete />} {...props}>
        Delete
    </BaseButton>
);

export const SubmitButton = props => (
    <BaseButton endIcon={<NavigateNext />} variant="contained" {...props}>
        Submit
    </BaseButton>
);

export const DeleteButtonWithKeys = withKeys(DeleteButton, 'ctrl+d', ({ element }) => 
    element.click() || true
, false);

export const SubmitButtonWithKeys = withKeys(SubmitButton, 'ctrl+enter', ({ element }) => 
    element.click() || true
, false);