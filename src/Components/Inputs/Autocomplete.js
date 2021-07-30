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
        autoSelect: true,
        disableClearable: true,
        onBlur: onBlur ?? function (event) {
            field.onBlur(event ?? name);
        },
        onChange: onChange ?? function (_event, value) {
            onItemChange && onItemChange(value);
            setFieldValue(name, value);
        },
        disabled: isSubmitting,
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
        getOptionSelected: (curr, id) => parseInt(curr) === parseInt(id),
        ...fieldSubselection,
        ...props
    };

    return newProps;
}