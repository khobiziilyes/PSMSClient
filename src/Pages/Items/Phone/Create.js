import React from 'react';
import * as Yup from 'yup';

import Grid from '@material-ui/core/Grid';
import Notes from '@Components/Inputs/Notes';
import Text from '@Components/Inputs/Text';

import { FinalWrapper } from '@Components/FormikDialog/Wrappers';

const formatParams = () => () => ({
    baseURL: '/phones'
});

const initialValues = {
    name: '',
    brand: '',
    notes: '',
    is_public: false
}

const validationSchema = Yup.object({
    name: Yup.string().min(1).required('Required'),
    brand: Yup.string().required('Required'),
    notes: Yup.string().min(8)
});

function FormContent({ isSubmitting }) {
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

const PhoneForm = FinalWrapper(FormContent, validationSchema, initialValues, formatParams);
export default PhoneForm;