import { Field } from 'formik';
import { TextField as MuiTextField } from "@material-ui/core";
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

function FormikAutoComplete({ label, disabled, field, form: { isSubmitting, setFieldValue, errors, touched }, type, onChange, onBlur, freeSolo, ...props }) {
    const {
    	name,
        onChange: _onChange,
        onBlur: _onBlur,
        multiple: _multiple,
        ...fieldSubselection
    } = field;

    const metaTouched = touched[name];
    const metaErrors = errors[name];

    const newProps = {
        freeSolo,
        onBlur: onBlur ?? function (event) {
            field.onBlur(event ?? name);
        },
        onChange: onChange ?? function (_event, value) {
            setFieldValue(name, value);
        },
        disabled: disabled ?? isSubmitting,
        loading: isSubmitting,
        renderInput: (params) => (
            <MuiTextField
                {...params}
                error={metaTouched && !!metaErrors}
                helperText={metaTouched && metaErrors}
                label={label}
                variant="outlined"
                fullWidth
            />
        ),
        ...fieldSubselection,
        ...props
    };

    return <MuiAutocomplete {...newProps} />;
}