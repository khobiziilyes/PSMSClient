import React from 'react';
import { Switch, FormControlLabel } from '@material-ui/core';
import TextField from '@Components/TextField';

export default function Notes(props) {
	const [showNotes, setShowNotes] = React.useState(false);
	const handleChange = (event) => {
		setShowNotes(!showNotes);
	}

	return (
		<>
			<FormControlLabel control={<Switch checked={showNotes} onChange={handleChange} />} label="Notes" />
            {showNotes && <TextField label="Notes" multiline rows={4} />}
        </>
	);
}