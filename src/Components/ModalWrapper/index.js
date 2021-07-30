import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core';
import { injectProps } from '@src/Consts';
import { EditButton, DeleteButtonWithKeys, CloseButton } from './Buttons';

export default function ModalWrapper(children, {
    title, extraButtons = [],
    handleDialogClose, handleEditButton, handleDeleteButton,
    ShowDeleteButton = true, ShowEditButton = true,
    ...props
}) {
	return children ? (
		<Dialog fullWidth onClose={handleDialogClose} maxWidth="md" {...props}>
            <DialogTitle>{title}</DialogTitle>
    
            <DialogContent>
                {children}
            </DialogContent>

            <DialogActions>
                <CloseButton handleDialogClose={handleDialogClose} />
                
                { ShowDeleteButton && <DeleteButtonWithKeys handleDeleteButton={handleDeleteButton} /> }
                { ShowEditButton && <EditButton handleEditButton={handleEditButton} /> }
                
                { React.Children.map(extraButtons, ExtraButton => injectProps(ExtraButton, { handleDialogClose })) }
            </DialogActions>
        </Dialog>
	) : null;
}