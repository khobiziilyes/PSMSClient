import { Dialog, DialogTitle } from '@material-ui/core';
import EditResourceDialog from '@Components/EditResource';

import { useSetRecoilState } from 'recoil';
import { formDialogNameAtom, formDialogInitValuesAtom, formDialogIsOpenedAtom } from '@src/Atoms';

export const BuildHandleEditButton = ({ selectedRowData, dataToField, setDialogIsOpened, formName, setFormDialogName, setFormDialogIsOpened, setFormDialogInitValues }) => {
    return () => {
        const removedData = ['created_at', 'created_by', 'updated_at', 'updated_by', 'deleted_at'];
        
        const cleanData = Object.keys(selectedRowData).reduce((Obj, key) => {
            if (!removedData.includes(key)) {
                const oldValue = selectedRowData[key];
                Obj[key] = dataToField ? dataToField(key, oldValue) : oldValue;
            }

            return Obj;
        }, {});

        setFormDialogInitValues(cleanData);
        setFormDialogName(formName);
        setDialogIsOpened(false);

        setFormDialogIsOpened(true);
    }
}

export default function DetailsDialog ({
    title,

    handleDialogClose,
    StandardDialog,
    setDeleteDialogOpen,
    BuildHandleEditButtonArgs,
    selectedRowData,
    formName,
    DetailsContent,
    
    ...props
}) {
    const setFormDialogName = useSetRecoilState(formDialogNameAtom);
    const setFormDialogInitValues = useSetRecoilState(formDialogInitValuesAtom);
    const setFormDialogIsOpened = useSetRecoilState(formDialogIsOpenedAtom);

    const detailsContent = <DetailsContent rowData={selectedRowData} handleDialogClose={handleDialogClose} />;
    const isUpdatable = detailsContent && formName && selectedRowData && (selectedRowData.created_by !== 'PSMS');

    return (
        detailsContent && <Dialog onClose={handleDialogClose} fullWidth {...props}>
            <DialogTitle>{title}</DialogTitle>

            {StandardDialog ? (
                <EditResourceDialog
                    isUpdatable={isUpdatable}
                    handleDialogClose={handleDialogClose}
                    handleDeleteButton={() => setDeleteDialogOpen(true)}
                    handleEditButton={BuildHandleEditButton({ ...BuildHandleEditButtonArgs, setFormDialogName, setFormDialogIsOpened, setFormDialogInitValues })}>

                    {detailsContent}
                </EditResourceDialog>
            ) : 
                detailsContent
            }
        </Dialog>);
}