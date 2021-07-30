import React from 'react';
import MuiTable from '@Components/MuiTable';
import ShowUser from './Show';

import { useSetRecoilState } from 'recoil';
import { formDialogParamsAtom } from '@src/Atoms';

import { Button } from '@material-ui/core';

import { AccountTree } from '@material-ui/icons';

const columns = [
    {
        name: 'name',
        label: 'Name'
    }
];

const PermissionsButton = ({ handleDialogClose, rowData: { permissions, ...rowData } }) => {
    const setFormDialogParams = useSetRecoilState(formDialogParamsAtom);

    const handleOpenForm = (name, initialValues) => {
        handleDialogClose();
        
        setFormDialogParams({
            isOpened: true,
            name,
            initialValues
        });
    }

    const handlePermissionsFormOpen = () => {
        const initialValues = {id: rowData.id, ...permissions};
        handleOpenForm('Permissions', initialValues);
    }

    return (
        <Button startIcon={<AccountTree />} onClick={handlePermissionsFormOpen} color="primary" variant="outlined">
            Permissions
        </Button>
    );
}

export default function UsersList() {
    return (
        <MuiTable
        	title="Users list"
        	URL='/owner/users'
        	columns={columns}
            DetailsModal={<ShowUser />}
            DialogSize='sm'
            getNameFromData={rowData => rowData.name}
            ExtraDetailsDialogButtons={<PermissionsButton />}
        />
    );
}