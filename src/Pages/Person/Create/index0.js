import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

import { Button } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Notes from '@Components/Notes';
import { TextField as MuiTextField } from 'formik-material-ui';

function TextField(props) {
    return (<MuiTextField fullWidth {...props} />);
}

export default function SignupForm() {
    return (
        <>
            <Typography variant="h6" gutterBottom>
                Basic Informations
            </Typography>

            <Formik
                initialValues={{
                    firstName: '',
                    lastName: '',
                    phone1: '',
                    phone2: '',
                    fax: '',
                    address: ''
                }}

                validationSchema={Yup.object({
                    firstName: Yup.string().required('Hmmmmmm'),
                    lastName: Yup.number().required('Hmmmmmm').typeError('Something'),
                    phone1: Yup.string(),
                    phone2: Yup.string(),
                    fax: Yup.string(),
                    address: Yup.string(),
                })}

                onSubmit={(values, { setSubmitting }) => {
                    setTimeout(() => {
                        setSubmitting(false);
                        alert(JSON.stringify(values, null, 4));
                    }, 4000);
                }}>

                {({ submitForm, isSubmitting }) => (
                    <Form>
                        <Grid container spacing={3}>
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
                                <Notes />
                            </Grid>
                        </Grid>
                    </Form>
                )}
            </Formik>
        </>
    );
};