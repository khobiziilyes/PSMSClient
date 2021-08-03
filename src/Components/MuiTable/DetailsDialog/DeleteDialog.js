import axios from 'axios';

import { useSnackbar } from 'notistack';
import { useQueryClient } from 'react-query'

import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@material-ui/core';
import { CloseButton, SubmitButton } from '@Components/ModalWrapper/Buttons';

const DeleteDialog = ({ URL, open, closeDeleteDialog, closeDetailsDialog }) => {
    const { enqueueSnackbar } = useSnackbar();
    const queryClient = useQueryClient();

    const handleContinue = () => axios.delete(URL).then(response => {
        closeDeleteDialog();
        
        if (response.data && response.data.deleted) {
            closeDetailsDialog();

            queryClient.invalidateQueries();
            enqueueSnackbar('The resource has been deleted successfully.', { variant: 'success' });
        } else {
            enqueueSnackbar('The resource could not be deleted.', { variant: 'error' });
        }
    });

    return (
        <Dialog open={open} onClose={closeDeleteDialog} fullWidth maxWidth="sm">
            <DialogTitle>Delete ?</DialogTitle>
            
            <DialogContent>
                <DialogContentText>
                    Do you wish to continue?
                </DialogContentText>
            </DialogContent>
            
            <DialogActions>
                <CloseButton onClick={closeDeleteDialog}>
                    Cancel
                </CloseButton>
                
                <SubmitButton onClick={handleContinue} autoFocus>
                    Continue
                </SubmitButton>
            </DialogActions>
        </Dialog>
    );
}

export default DeleteDialog;