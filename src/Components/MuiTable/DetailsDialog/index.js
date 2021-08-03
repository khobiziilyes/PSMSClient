import React from 'react';
import { injectProps } from '@src/Consts';

import { useSetRecoilState } from 'recoil';
import { formDialogParamsAtom } from '@src/Atoms';

import DeleteDialog from './DeleteDialog';

export default function DetailsDialog({ URL, closeDetailsDialog, selectedRowData, formName, DetailsModal, ...props }) {
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

    const { isWritable, id } = selectedRowData || {};

    const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
    const openDeleteDialog = () => setDeleteDialogOpen(true);
    const closeDeleteDialog = () => setDeleteDialogOpen(false);

    const deleteDialogProps = {
        URL: URL + '/' + id,
        open: deleteDialogOpen,
        closeDeleteDialog,
        closeDetailsDialog
    }
    
    const DetailsModalInjected = injectProps(DetailsModal, {
        rowData: selectedRowData,
        handleDialogClose: closeDetailsDialog,
        ShowEditButton: !!(isWritable && formName),
        ShowDeleteButton: isWritable,

        handleEditButton: openEditForm,
        handleDeleteButton: openDeleteDialog,
        ...props
    });
    
    return selectedRowData ? (
        <>
            { DetailsModalInjected }
            <DeleteDialog {...deleteDialogProps} />
        </>
    ) : null;
}