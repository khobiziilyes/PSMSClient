import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core';
import { EditButton, DeleteButtonWithKeys, CloseButton, SubmitButtonWithKeys } from './Buttons';
import { makeStyles } from '@material-ui/styles';
import { injectProps } from '@src/Consts';

const useStyles = makeStyles({
    dialogPaper: {
        height: ({ height }) => height
    }
});

export default function ModalWrapper(children, {
    title, extraButtons = [], disabled = false,
    handleDialogClose, handleEditButton = null, handleDeleteButton = null, handleSubmitButton = null,
    ShowBaseButtons = true, ShowDeleteButton = true, ShowEditButton = true, ShowSubmitButton = true,
    buttonsProps = {}, height = null,
    ...props
}) {
    const classes = useStyles({ height });
    
    const dialogProps = {
        fullWidth: true,
        onClose: handleDialogClose,
        maxWidth: 'md',
        
        classes: height ? { paper: classes.dialogPaper } : {},
        
        disableBackdropClick: disabled,
        disableEscapeKeyDown: disabled,
        
        disableRestoreFocus: true,

        ...props
    }

    const allButtonsProps = { disabled, ...buttonsProps };

	return children ? (
		<Dialog {...dialogProps}>
            <DialogTitle>{title}</DialogTitle>
    
            <DialogContent>
                {children}
            </DialogContent>

            <DialogActions>
                <CloseButton onClick={handleDialogClose} {...allButtonsProps} />
                
                { ShowBaseButtons && handleDeleteButton && ShowDeleteButton && <DeleteButtonWithKeys onClick={handleDeleteButton} {...allButtonsProps} /> }
                { ShowBaseButtons && handleEditButton && ShowEditButton && <EditButton onClick={handleEditButton} {...allButtonsProps} /> }
                
                { React.Children.map(extraButtons, extraButton => injectProps(extraButton, allButtonsProps)) }
                
                { ShowBaseButtons && handleSubmitButton && ShowSubmitButton && <SubmitButtonWithKeys onClick={handleSubmitButton} {...allButtonsProps} /> }
            </DialogActions>
        </Dialog>
	) : null;
}