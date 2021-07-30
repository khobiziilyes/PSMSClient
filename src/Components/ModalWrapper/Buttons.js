import { Button } from '@material-ui/core';
import { HighlightOff, Delete, Edit} from '@material-ui/icons';
import withKeys from '@Components/withKeys';

let buttonRef = null;

const props = {
    color: 'primary',
    variant: 'outlined'
}

export const CloseButton = ({ handleDialogClose }) => 
	<Button startIcon={<HighlightOff />} onClick={handleDialogClose} {...props}>
        Cancel
    </Button>

export const DeleteButton = ({ handleDeleteButton }) =>
	<Button startIcon={<Delete />} onClick={handleDeleteButton} ref={theidk => buttonRef = theidk} {...props}>
        Delete
    </Button>

export const DeleteButtonWithKeys = withKeys(DeleteButton, {
    'ctrl+d': {
        priority: 1,
        handler: event => {
            event.preventDefault();
            buttonRef.click();
        }
    }
});

export const EditButton = ({ handleEditButton }) => 
	<Button startIcon={<Edit />} onClick={handleEditButton} {...props}>
        Edit
    </Button>