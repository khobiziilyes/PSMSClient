import React from 'react';
import { Typography, IconButton, Dialog, DialogTitle as MuiDialogTitle, DialogContent, DialogActions } from '@material-ui/core';

import { EditButton, DeleteButtonWithKeys, SubmitButtonWithKeys } from './Buttons';
import { makeStyles } from '@material-ui/styles';
import { injectProps } from '@src/Consts';

import CloseIcon from '@material-ui/icons/Close';

const titleUseStyles = makeStyles(theme => ({
	root: {
		margin: 0,
		padding: theme.spacing(2),
	},
	closeButton: {
		position: 'absolute',
		right: theme.spacing(1),
		top: theme.spacing(1),
		color: theme.palette.grey[500]
	}
}));

const dialogUseStyles = makeStyles({
	dialogPaper: {
		height: ({ height }) => height
	}
});

const DialogTitle = (({ disabled, children, onClose, ...props }) => {
	const classes = titleUseStyles();

	return (
		<MuiDialogTitle disableTypography className={classes.root} {...props}>
			<Typography variant="h6">{children}</Typography>
			
			{
				onClose ? (
					<IconButton disabled={disabled} className={classes.closeButton} onClick={onClose}>
						<CloseIcon />
					</IconButton>
				) : null
			}
		</MuiDialogTitle>
	);
});

export default function ModalWrapper(children, {
	title, extraButtons = [], disabled = false,
	handleDialogClose, handleEditButton = null, handleDeleteButton = null, handleSubmitButton = null,
	ShowBaseButtons = true, ShowDeleteButton = true, ShowEditButton = true, ShowSubmitButton = true,
	buttonsProps = {}, height = null,
	...props
}) {
	const classes = dialogUseStyles({ height });
	
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
			<DialogTitle onClose={handleDialogClose} disabled={disabled}>
				{title}
			</DialogTitle>
	
			<DialogContent>
				{children}
			</DialogContent>

			<DialogActions>
				{ ShowBaseButtons && handleDeleteButton && ShowDeleteButton && <DeleteButtonWithKeys onClick={handleDeleteButton} {...allButtonsProps} /> }
				{ ShowBaseButtons && handleEditButton && ShowEditButton && <EditButton onClick={handleEditButton} {...allButtonsProps} /> }
				
				{ React.Children.map(extraButtons, extraButton => injectProps(extraButton, allButtonsProps)) }
				
				{ ShowBaseButtons && handleSubmitButton && ShowSubmitButton && <SubmitButtonWithKeys onClick={handleSubmitButton} {...allButtonsProps} /> }
			</DialogActions>
		</Dialog>
	) : null;
}