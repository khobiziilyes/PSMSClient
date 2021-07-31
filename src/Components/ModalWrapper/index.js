import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core';
import { injectProps } from '@src/Consts';
import { EditButton, DeleteButtonWithKeys, CloseButton } from './Buttons';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
    dialogPaper: {
        height: ({ height }) => height
    }
});

export default function ModalWrapper(children, {
    title, extraButtons = [],
    handleDialogClose, handleEditButton, handleDeleteButton,
    ShowDeleteButton = true, ShowEditButton = true,
    height = null,
    ...props
}) {
    const classes = useStyles({ height });
    
    const dialogProps = {
        fullWidth: true,
        onClose: handleDialogClose,
        maxWidth: 'md',
        classes: height ? { paper: classes.dialogPaper } : {},
        ...props
    }

	return children ? (
		<Dialog {...dialogProps}>
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