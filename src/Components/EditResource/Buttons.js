import { Button } from '@material-ui/core';

import {
    HighlightOff,
    Delete,
    Edit
} from '@material-ui/icons';

export const CloseButton = ({ handleDialogClose }) => 
	<Button startIcon={<HighlightOff />} onClick={handleDialogClose} color="primary" variant="outlined">
        Cancel
    </Button>

export const DeleteButton = ({ handleDeleteButton }) =>
	<Button startIcon={<Delete />} onClick={handleDeleteButton} color="primary" variant="outlined">
        Delete
    </Button>

export const EditButton = ({ handleEditButton }) => 
	<Button startIcon={<Edit />} onClick={handleEditButton} color="primary" variant="outlined">
        Edit
    </Button>