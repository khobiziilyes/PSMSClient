import { SubmitButtonWithKeys } from '@Components/FormikDialog/TheDialog';
import { Button } from '@material-ui/core';

const AddItemButton = ({ openAddItemDialog, ...props }) => (
    <Button onClick={openAddItemDialog} {...props}>
        Item
    </Button>
);

const CustomActions = ({ openAddItemDialog, buttonsProps, submitForm }) => (
    <>
        <SubmitButtonWithKeys submitForm={submitForm} {...buttonsProps} />
        <AddItemButton openAddItemDialog={openAddItemDialog} {...buttonsProps} />
    </>
);

export default CustomActions;