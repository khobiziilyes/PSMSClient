import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';

export default function FormDialog({ open, title, children, handleClose, handleSubmit }) {
    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>{title}</DialogTitle>
            
            <DialogContent style={{ overflow: 'hidden' }}>
                <Grid container justify="center">
					<Grid item xs={12}>
						{children}
					</Grid>
				</Grid>
            </DialogContent>
            
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                
                <Button onClick={handleSubmit} color="primary">
                    Submit
                </Button>

                <Button onClick={handleSubmit} color="primary">
                    Multi Submit
                </Button>
            </DialogActions>
        </Dialog>
    );
}