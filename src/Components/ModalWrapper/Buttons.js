import { Button } from '@material-ui/core';
import { HighlightOff, Delete, Edit} from '@material-ui/icons';
import withKeys from '@Components/withKeys';

const props = {
    color: 'primary',
    variant: 'outlined'
}

export const CloseButton = ({ handleDialogClose }) => 
	<Button startIcon={<HighlightOff />} onClick={handleDialogClose} {...props}>
        Cancel
    </Button>

export const DeleteButton = ({ withRef, handleDeleteButton }) =>
	<Button startIcon={<Delete />} onClick={handleDeleteButton} ref={withRef} {...props}>
        Delete
    </Button>

export const DeleteButtonWithKeys = withKeys(DeleteButton, 'ctrl+d', ({ element }) => element.click());

export const EditButton = ({ handleEditButton }) => 
	<Button startIcon={<Edit />} onClick={handleEditButton} {...props}>
        Edit
    </Button>