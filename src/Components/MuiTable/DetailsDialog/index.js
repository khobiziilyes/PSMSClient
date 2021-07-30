import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core';

import { useSetRecoilState } from 'recoil';
import { formDialogParamsAtom } from '@src/Atoms';

import { EditButton, DeleteButtonWithKeys, CloseButton } from './Buttons';
import DeleteDialog from './DeleteDialog';

const injectProps = (element, newProps) => React.isValidElement(element) ? React.cloneElement(element, newProps) : null;

export default function DetailsDialog({
    title,
    URL,

    closeDetailsDialog,
    openDetailsDialog,
    
    selectedRowData,
    formName,
    
    DetailsContent,
    ShowDeleteButton,
    ShowEditButton,
    ExtraDetailsDialogButtons,

    ...props
}) {
    const setFormDialogParams = useSetRecoilState(formDialogParamsAtom);

    const openEditForm = () => {
        const { created_at, created_by, updated_at, updated_by, deleted_at, ...initialValues } = selectedRowData;
        closeDetailsDialog();

        setFormDialogParams({
            isOpened: true,
            name: formName,
            initialValues
        });
    }

    const standardProps = { rowData: selectedRowData, handleDialogClose: closeDetailsDialog };
    const detailsContent = selectedRowData && injectProps(DetailsContent, standardProps)
    const { isWritable, id } = selectedRowData;
    
    const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
    const openDeleteDialog = () => setDeleteDialogOpen(true);
    const closeDeleteDialog = () => setDeleteDialogOpen(false);

    const deleteDialogProps = {
        URL,
        id,
        open: deleteDialogOpen,
        closeDeleteDialog,
        closeDetailsDialog
    }

    return (
        detailsContent && <>
            <Dialog onClose={closeDetailsDialog} fullWidth {...props}>
                <DialogTitle>{title}</DialogTitle>
        
                <DialogContent>
                    {detailsContent}
                </DialogContent>

                <DialogActions>
                    <CloseButton handleDialogClose={closeDetailsDialog} />
                    
                    { isWritable && ShowDeleteButton && <DeleteButtonWithKeys handleDeleteButton={openDeleteDialog} /> }
                    { isWritable && ShowEditButton && formName && <EditButton handleEditButton={openEditForm} /> }
                    
                    { React.Children.map(ExtraDetailsDialogButtons, ExtraButton => injectProps(ExtraButton, standardProps) || null) }
                </DialogActions>
            </Dialog>

            <DeleteDialog {...deleteDialogProps} />
        </>
    );
}