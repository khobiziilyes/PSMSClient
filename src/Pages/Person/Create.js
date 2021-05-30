import React from 'react';
import { Field } from 'formik';
import * as Yup from 'yup';

import Grid from '@material-ui/core/Grid';
import Notes from '@Components/Inputs/Notes';
import TextField from '@Components/Inputs/Text';

const Params = {
    URL: '/customers',
    formatData: ({ firstName = '', lastName = '', ...values }) => ({name: firstName + ' ' + lastName, ...values})
}

const formikParams = {
    initialValues: {
        firstName: '',
        lastName: '',
        phone1: '',
        phone2: '',
        fax: '',
        address: ''
    },
    validationSchema: Yup.object({
        firstName: Yup.string().required('Must be not empty'),
        lastName: Yup.string().required('Must be not empty'),
        phone1: Yup.number().required('This field is required.').typeError('Must be numeric'),
        phone2: Yup.string(),
        fax: Yup.string(),
        address: Yup.string(),
    })
}

function TheForm({ isVendor, isSubmitting }) {
    return (
        <Grid container spacing={3}>
            <input type="hidden" value={isVendor ? '1' : '0'} />
            
            <Grid item xs={12} sm={6}>
                <Field
                    component={TextField}
                    name="firstName"
                    type="text"
                    label="First name"
                />
            </Grid>

            <Grid item xs={12} sm={6}>
                <Field
                    component={TextField}
                    name="lastName"
                    type="text"
                    label="Last name"
                />
            </Grid>

            <Grid item xs={12} sm={4}>
                <Field
                    component={TextField}
                    name="phone1"
                    type="text"
                    label="Phone number 1"
                />
            </Grid>

            <Grid item xs={12} sm={4}>
                <Field
                    component={TextField}
                    name="phone2"
                    type="text"
                    label="Phone number 2"
                />
            </Grid>

            <Grid item xs={12} sm={4}>
                <Field
                    component={TextField}
                    name="fax"
                    type="text"
                    label="Fax"
                />
            </Grid>

            <Grid item xs={12}>
                <Field
                    component={TextField}
                    name="address"
                    type="text"
                    label="Address line"
                />
            </Grid>

            <Grid item xs={12}>
                <Notes disabled={false} />
            </Grid>
        </Grid>
    );
}

export {
    Params,
    formikParams,
    TheForm
}