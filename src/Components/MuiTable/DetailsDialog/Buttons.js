import { Button } from '@material-ui/core';

import {
    HighlightOff,
    Delete,
    Edit
} from '@material-ui/icons';

const props = {
    color: 'primary',
    variant: 'outlined'
}

export const CloseButton = ({ handleDialogClose }) => 
	<Button startIcon={<HighlightOff />} onClick={handleDialogClose} {...props}>
        Cancel
    </Button>

export const DeleteButton = ({ handleDeleteButton }) =>
	<Button startIcon={<Delete />} onClick={handleDeleteButton} {...props}>
        Delete
    </Button>

export const EditButton = ({ handleEditButton }) => 
	<Button startIcon={<Edit />} onClick={handleEditButton} {...props}>
        Edit
    </Button>