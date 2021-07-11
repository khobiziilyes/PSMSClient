import React from 'react';
import { Field, getIn } from 'formik';
import MuiTextField from '@material-ui/core/TextField';

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

function TextField({ children, ...props }) {
	const newProps = fieldToTextField(props);
	return <MuiTextField {...newProps}>{children}</MuiTextField>;
}

function fieldToTextField({
	disabled,
	field: { onBlur, onChange, value, ...field },
	form: { isSubmitting, touched, errors, setFieldValue },
	onChange: _onChange,
	onBlur: _onBlur,
	helperText,
	inputProps = {},
	selfSetValue = false,
	...props
}) {
	const fieldError = getIn(errors, field.name);
	const showError = getIn(touched, field.name) && !!fieldError;

	return {
		autoComplete: 'off',
		variant: props.variant,
		error: showError,
		helperText: showError ? fieldError : helperText,
		disabled: disabled ?? isSubmitting,
		onBlur: _onBlur ?? (e => onBlur(e ?? field.name)),
		onChange: e => {
			if (!selfSetValue) onChange(e);
			_onChange && _onChange(e.target.value);
		},
		value: value ?? '',
		inputProps: selfSetValue ? 
			{
				...inputProps,
				setFieldValue
			} : inputProps,
		...field,
		...props
	}
}