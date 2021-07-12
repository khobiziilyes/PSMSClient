import { CancelButton, SubmitButtonWithKeys } from '@Components/FormikDialog/TheDialog';
import { Button } from '@material-ui/core';

const AddItemButton = ({ openAddItemDialog, ...props }) => (
    <Button onClick={openAddItemDialog} {...props}>
        Item
    </Button>
);

const CustomActions = ({ openAddItemDialog, ButtonsProps, closeFormDialog, submitForm }) => (
    <>
        <CancelButton closeFormDialog={closeFormDialog} {...ButtonsProps} />
        <SubmitButtonWithKeys submitForm={submitForm} {...ButtonsProps} />
        <AddItemButton openAddItemDialog={openAddItemDialog} {...ButtonsProps} />
    </>
);

export default CustomActions;