import React from 'react';
import { Field } from 'formik';
import { TextField } from "@material-ui/core";
import MuiAutocomplete from '@material-ui/lab/Autocomplete';

export default function Autocomplete(props) {
    return (
		<Field
	        component={FormikAutoComplete}
	        fullWidth
	        {...props}
	    />
    );
}

function FormikAutoComplete(oldProps) {
    const newProps = BuildAutocompleteProps(oldProps)
    return <MuiAutocomplete {...newProps} />;
}

function BuildAutocompleteProps({ onItemChange = null, label, renderInputExtraProps, disabled, field, form, onChange, onBlur, freeSolo, ...props }) {
    const {
    	name,
        onChange: _onChange,
        onBlur: _onBlur,
        multiple: _multiple,
        value: fieldValue,
        ...fieldSubselection
    } = field;
    
    const { isSubmitting, setFieldValue, touched, errors } = form;

    const metaTouched = touched[name];
    const metaErrors = errors[name];
    
    const newProps = {
        freeSolo,
        disableClearable: true,
        onBlur: onBlur ?? function (event) {
            field.onBlur(event ?? name);
        },
        onChange: onChange ?? function (_event, value) {
            onItemChange && onItemChange(value);
            setFieldValue(name, value);
        },
        disabled: disabled ?? isSubmitting,
        renderInput: params => (
            <TextField
                {...params}
                variant="outlined"
                placeholder={label}

                error={metaTouched && !!metaErrors}
                helperText={metaTouched && metaErrors}
                {...(renderInputExtraProps ? renderInputExtraProps(params) : {})}
            />
        ),
        value: fieldValue ?? '',
        ...fieldSubselection,
        ...props
    };

    return newProps;
}