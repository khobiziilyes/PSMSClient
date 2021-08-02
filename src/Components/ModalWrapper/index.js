import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core';
import { EditButton, DeleteButtonWithKeys, CloseButton } from './Buttons';
import { makeStyles } from '@material-ui/styles';
import { injectProps } from '@src/Consts';

const useStyles = makeStyles({
    dialogPaper: {
        height: ({ height }) => height
    }
});

export default function ModalWrapper(children, {
    title, extraButtons = [],
    handleDialogClose, handleEditButton = null, handleDeleteButton = null,
    ShowBaseButtons = true, ShowDeleteButton = true, ShowEditButton = true,
    buttonsProps = {}, height = null,
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
                <CloseButton onClick={handleDialogClose} {...buttonsProps} />
                
                { ShowBaseButtons && handleDeleteButton && ShowDeleteButton && <DeleteButtonWithKeys onClick={handleDeleteButton} {...buttonsProps} /> }
                { ShowBaseButtons && handleEditButton && ShowEditButton && <EditButton onClick={handleEditButton} {...buttonsProps} /> }
                
                { React.Children.map(extraButtons, extraButton => injectProps(extraButton, buttonsProps)) }
            </DialogActions>
        </Dialog>
	) : null;
}