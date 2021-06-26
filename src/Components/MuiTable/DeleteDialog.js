import axios from 'axios';

import { useSnackbar } from 'notistack';
import { useQueryClient } from 'react-query'

import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button
} from '@material-ui/core';

const DeleteDialog = ({ URL, id, open, closeDeleteDialog, closeDetailsDialog }) => {
    const { enqueueSnackbar } = useSnackbar();
    const queryClient = useQueryClient();

    const handleContinue = () => axios.delete(URL + '/' + id).then(response => {
        closeDeleteDialog();
        
        if (response.data && response.data.deleted) {
            closeDetailsDialog();

            queryClient.invalidateQueries(URL);
            enqueueSnackbar('The customer has been deleted successfully.', { variant: 'success' });
        } else {
            enqueueSnackbar('The customer could not be deleted.', { variant: 'error' });
        }
    });

    return (
        <Dialog open={open} onClose={closeDeleteDialog}>
            <DialogTitle>Delete ?</DialogTitle>
            
            <DialogContent>
                <DialogContentText>
                    Do you wish to continue?
                </DialogContentText>
            </DialogContent>
            
            <DialogActions>
                <Button onClick={closeDeleteDialog} color="primary">
                    Cancel
                </Button>
                
                <Button onClick={handleContinue} color="primary" autoFocus>
                    Continue
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default DeleteDialog;