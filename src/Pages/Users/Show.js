import React from 'react';
import { Typography, Grid, List } from '@material-ui/core';

import {
	HighlightOff,
	Delete,
	Edit,
	AccountTree
} from '@material-ui/icons';

import { IDListItem } from '@Components/ShowResource/CommonListItem';

import { Button, DialogActions, DialogContent as MuiDialogContent } from '@material-ui/core';

import { useSetRecoilState } from 'recoil';
import { formDialogNameAtom, formDialogInitValuesAtom, formDialogIsOpenedAtom } from '@src/Atoms';

export default function ShowUser({ handleDialogClose, rowData: { permissions, ...rowData } }) {
	const setFormDialogName = useSetRecoilState(formDialogNameAtom);
    const setFormDialogInitValues = useSetRecoilState(formDialogInitValuesAtom);
    const setFormDialogIsOpened = useSetRecoilState(formDialogIsOpenedAtom);
    
    const handleOpenForm = (name, initValues) => {
        handleDialogClose();
        
        setFormDialogName(name);
        setFormDialogInitValues(initValues);
        setFormDialogIsOpened(true);
    }

    const handlePermissionsFormOpen = () => {
    	const initValues = {id: rowData.id, ...permissions};
    	handleOpenForm('Permissions', initValues);
    }

    const handleEditFormOpen = () => {
    	handleOpenForm('User', rowData);
    }

	return (
		<>
			<MuiDialogContent>
		        <Grid container spacing={3}>
		        	<Grid item xs={6}>
						<Typography variant="h6" gutterBottom>
			                Basic informations
			            </Typography>

						<List>
							<IDListItem ID={rowData.id} />
						</List>
					</Grid>

					<Grid item xs={6}>
						
					</Grid>
		        </Grid>
			</MuiDialogContent>

	        <DialogActions>
	            <Button startIcon={<HighlightOff />} onClick={handleDialogClose} color="primary" variant="outlined">
	                Cancel
	            </Button>
	            
	            <Button startIcon={<Delete />} onClick={() => {}} color="primary" variant="outlined">
	                Delete
	            </Button>
	            
	            <Button startIcon={<AccountTree />} onClick={handlePermissionsFormOpen} color="primary" variant="outlined">
	                Permissions
	            </Button>

	            <Button startIcon={<Edit />}  onClick={handleEditFormOpen} color="primary" variant="outlined">
	                Edit
	            </Button>
	        </DialogActions>
       	</>
	);
}