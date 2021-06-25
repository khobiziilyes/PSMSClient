import { DialogActions, DialogContent } from '@material-ui/core';

import {
	CloseButton,
	DeleteButton,
	EditButton
} from './Buttons';

export default function EditResourceDialog({ children, isUpdatable, handleDialogClose, handleDeleteButton, handleEditButton }) {
	return (
		<>
            <DialogContent>
                {children}
            </DialogContent>

            <DialogActions>
                <CloseButton handleDialogClose={handleDialogClose} />
                {isUpdatable && <DeleteButton handleDeleteButton={handleDeleteButton} />}
                {isUpdatable && <EditButton handleEditButton={handleEditButton} />}
            </DialogActions>
        </>
	);
}