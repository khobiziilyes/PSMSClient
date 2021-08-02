import { Button } from '@material-ui/core';
import { HighlightOff, Delete, Edit} from '@material-ui/icons';
import withKeys from '@Components/withKeys';

const buttonsProps = {
    color: 'primary',
    variant: 'outlined'
}

export const CloseButton = ({ handleDialogClose, ...props }) => (
	<Button startIcon={<HighlightOff />} onClick={handleDialogClose} {...buttonsProps} {...props}>
        Cancel
    </Button>
);

export const DeleteButton = ({ withRef, handleDeleteButton, ...props }) => (
	<Button startIcon={<Delete />} onClick={handleDeleteButton} ref={withRef} {...buttonsProps} {...props}>
        Delete
    </Button>
);

export const DeleteButtonWithKeys = withKeys(DeleteButton, 'ctrl+d', ({ element }) => element.click());

export const EditButton = ({ handleEditButton, ...props }) => (
	<Button startIcon={<Edit />} onClick={handleEditButton} {...buttonsProps} {...props}>
        Edit
    </Button>
);