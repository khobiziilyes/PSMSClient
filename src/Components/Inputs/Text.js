import React from 'react';
import { Field } from 'formik';
import { TextField } from 'formik-material-ui';

export default function Text(props) {
	return (
        <Field
            component={TextField}
            type="text"
            fullWidth
            {...props}
        />
	);
}