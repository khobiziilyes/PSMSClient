import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core';

import { useSetRecoilState } from 'recoil';
import { formDialogNameAtom, formDialogInitValuesAtom, formDialogIsOpenedAtom } from '@src/Atoms';

import { EditButton, DeleteButton, CloseButton } from './Buttons';

export default function DetailsDialog({
    title,

    closeDetailsDialog,
    openDetailsDialog,
    openDeleteDialog,
    
    selectedRowData,
    formName,
    
    DetailsContent,
    ShowDeleteButton,
    ShowEditButton,
    ExtraDetailsDialogButtons,

    ...props
}) {
    const setFormDialogName = useSetRecoilState(formDialogNameAtom);
    const setFormDialogInitValues = useSetRecoilState(formDialogInitValuesAtom);
    const setFormDialogIsOpened = useSetRecoilState(formDialogIsOpenedAtom);

    const openEditForm = () => {
        const { created_at, created_by, updated_at, updated_by, deleted_at, ...initValues } = selectedRowData;
        
        setFormDialogInitValues(initValues);
        setFormDialogName(formName);
        closeDetailsDialog();

        setFormDialogIsOpened(true);
    }

    const detailsContent = selectedRowData && React.isValidElement(DetailsContent) ?
        React.cloneElement(DetailsContent, {rowData: selectedRowData, handleDialogClose: closeDetailsDialog}) : null;
    
    return (
        detailsContent && <Dialog onClose={closeDetailsDialog} fullWidth {...props}>
            <DialogTitle>{title}</DialogTitle>
    
            <DialogContent>
                {detailsContent}
            </DialogContent>

            <DialogActions>
                <CloseButton handleDialogClose={closeDetailsDialog} />
                
                {ShowDeleteButton && <DeleteButton handleDeleteButton={openDeleteDialog} />}
                {ShowEditButton && formName && <EditButton handleEditButton={openEditForm} />}
                
                {React.Children.map(ExtraDetailsDialogButtons, ExtraButton => {
                    if (React.isValidElement(ExtraButton)) 
                        return React.cloneElement(ExtraButton, { rowData: selectedRowData });
                    
                    return ExtraButton;
                })}
            </DialogActions>
        </Dialog>
    );
}