import {
	Typography,
} from '@material-ui/core';

export default function ShowNotes({ notes }) {
	return notes ? (
		<>
			<Typography variant="h6">
				Notes
			</Typography>

			<p style={{ whiteSpace: 'pre-wrap', border: '1px solid #1a2035', padding: 10 }}>{notes}</p>
		</>
	) : null;
}