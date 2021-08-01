import React from 'react';
import { Field } from 'formik';

import {
    Select as MuiSelect,
    FormControl,
    InputLabel
} from '@material-ui/core';

import { Select as MuiFormikSelect } from 'formik-material-ui';

export default function Select({ Component = MuiSelect, id, label, controlStyle = {}, children, ...props }) {
    return (
        <FormControl style={controlStyle}>
            <InputLabel shrink id={id}>{label}</InputLabel>

           	{ React.createElement(Component, { labelId: id, ...props }, children) }
        </FormControl>
    )
}

export function FormikSelect(props) {
	const TheComponent = (props2) => <Field component={MuiFormikSelect} {...props} {...props2} />
	return <Select Component={TheComponent} />;
}