import React from 'react';
import * as Yup from 'yup';

import Grid from '@material-ui/core/Grid';
import Autocomplete from '@Components/Inputs/Autocomplete';
import Notes from '@Components/Inputs/Notes';
import Text from '@Components/Inputs/Text';

const formikParams = {
    initialValues: {
        name: '',
        brand: '',
        type: null,
        notes: ''
    },
    validationSchema: Yup.object({
        name: Yup.string().min(8).required('Required'),
        brand: Yup.string().min(8),
        type: Yup.string().required('Required').typeError('Selection is required'),
        notes: Yup.string().min(8)
    })
}

function TheForm({ isSubmitting }) {
    return (
	   <Grid container spacing={3}>
            <Grid item xs={4}>
                <Autocomplete 
                    name="type"
                    label="Accessory type"
                    options={['A', 'B', 'C']}
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