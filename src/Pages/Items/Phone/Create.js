import React from 'react';
import * as Yup from 'yup';

import Grid from '@material-ui/core/Grid';
import Notes from '@Components/Inputs/Notes';
import Text from '@Components/Inputs/Text';

const formikParams = {
    URL: '/phones',
    initialValues: {
        name: '',
        brand: '',
        notes: '',
        is_public: false
    },
    validationSchema: Yup.object({
        name: Yup.string().min(8).required('Required'),
        brand: Yup.string().required('Required'),
        notes: Yup.string().min(8)
    })
}

function TheForm({ isSubmitting }) {
	return (
        <Grid container spacing={3}>
            <Grid item xs={6}>
				<Text name="brand" label="Phone brand" />
            </Grid>

            <Grid item xs={6}>
                <Text name="name" label="Phone name" />
            </Grid>

            <Grid item xs>
                <Notes />
            </Grid>
        </Grid>
	);
}

export {
    formikParams,
    TheForm
}