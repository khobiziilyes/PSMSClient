import { Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core';

import { useSetRecoilState } from 'recoil';
import { formDialogNameAtom, formDialogInitValuesAtom, formDialogIsOpenedAtom } from '@src/Atoms';

import {
    EditButton,
    DeleteButton,
    CloseButton
} from './Buttons';

export default function DetailsDialog ({
    title,

    closeDetailsDialog,
    StandardDialog,
    openDetailsDialog,
    selectedRowData,
    formName,
    DetailsContent,
    
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

    const detailsContent = <DetailsContent rowData={selectedRowData} handleDialogClose={closeDetailsDialog} />;
    const isUpdatable = detailsContent && formName && selectedRowData && (selectedRowData.created_by !== 'PSMS');

    return (
        detailsContent && <Dialog onClose={closeDetailsDialog} fullWidth {...props}>
            <DialogTitle>{title}</DialogTitle>

            {StandardDialog ? (
                <>
                    <DialogContent>
                        {detailsContent}
                    </DialogContent>

                    <DialogActions>
                        <CloseButton handleDialogClose={closeDetailsDialog} />
                        {isUpdatable && <DeleteButton handleDeleteButton={openDetailsDialog} />}
                        {isUpdatable && <EditButton handleEditButton={openEditForm} />}
                    </DialogActions>
                </>
            ) : 
                detailsContent
            }
        </Dialog>);
}