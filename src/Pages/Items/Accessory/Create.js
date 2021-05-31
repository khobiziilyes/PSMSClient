import React from 'react';
import * as Yup from 'yup';

import Grid from '@material-ui/core/Grid';
import Autocomplete from '@Components/Inputs/Autocomplete';
import Notes from '@Components/Inputs/Notes';
import Text from '@Components/Inputs/Text';

import { useRecoilValue } from 'recoil';
import { accessoriesNamesAtom } from '@src/Atoms';

const formikParams = {
    URL: '/accessories',
    initialValues: {
        name: '',
        brand: '',
        type_id: 1,
        notes: ''
    },
    validationSchema: Yup.object({
        name: Yup.string().min(8).required('Required'),
        brand: Yup.string().min(8),
        type_id: Yup.number('Required').required('Required'),
        notes: Yup.string().min(8)
    })
}

function TheForm({ isSubmitting, isCreate }) {
    const accessoriesNames = useRecoilValue(accessoriesNamesAtom);

    return (
	   <Grid container spacing={3}>
            <Grid item xs={4}>
                <Autocomplete 
                    name="type_id"
                    label="Accessory type"
                    options={Object.keys(accessoriesNames)}
                    getOptionLabel={option => accessoriesNames[option] || ''}
                    disabled={!isCreate}
                />
            </Grid>

            <Grid item xs={4}>
                <Text
                    name="name"
                    label="Accessory name"
                />
            </Grid>

            <Grid item xs={4}>
                <Text
                    name="brand"
                    label="Accessory brand"
                />
            </Grid>

            <Grid item xs={12}>
                <Notes />
            </Grid>
        </Grid>
	);
}

export {
    formikParams,
    TheForm
}