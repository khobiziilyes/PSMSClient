import React from 'react';
import { Field } from 'formik';
import * as Yup from 'yup';

import Grid from '@material-ui/core/Grid';
import Autocomplete from '@Components/Inputs/Autocomplete';
import TextField from '@Components/Inputs/Text';

import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';

import { FinalWrapper } from '@Components/FormikDialog/Wrappers';

const formatParams = () => () => ({
    baseURL: '/phones'
});

const initialValues = {}

const validationSchema = Yup.object({
    
});

function FormContent() {
    const [userisAdmin, handleUserisAdminChange] = React.useState('0');

    return (
    	<Grid container spacing={3}>
            <Grid item xs={12}>
                <Autocomplete 
                    name="store_id"
                    label="Current store"
                    options={[]}
                />
            </Grid>

            <Grid item xs={12} style={{ textAlign: "center" }}>
                <ToggleButtonGroup value={userisAdmin} exclusive onChange={handleUserisAdminChange} style={{ width: "90%" }}>
                    <ToggleButton value="0" style={{ width: "100%" }} >
                        User
                    </ToggleButton>
                    
                    <ToggleButton value="1" style={{ width: "100%" }} >
                        Admin
                    </ToggleButton>
                </ToggleButtonGroup>
            </Grid>

            <Grid item xs={6}>
                <Field
                    component={TextField}
                    name="name"
                    type="text"
                    label="Full name"
                />
            </Grid>

            <Grid item xs={6}>
                <Field
                    component={TextField}
                    name="phone"
                    type="text"
                    label="Phone number"
                />
            </Grid>

            <Grid item xs={12}>
                <Field
                    component={TextField}
                    name="phone"
                    type="text"
                    label="Password"
                />
            </Grid>
        </Grid>
    );
}

const UserForm = FinalWrapper(FormContent, validationSchema, initialValues, formatParams);
export default UserForm;