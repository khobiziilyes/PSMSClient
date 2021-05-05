import React from 'react';
import MuiAutocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@Components/TextField';

export default function Autocomplete ({label, required, ...props}) {
	return (
		<MuiAutocomplete
            {...props}
            renderInput={(params) => <TextField {...params} label={label} required={required} />}
        />
	);
}