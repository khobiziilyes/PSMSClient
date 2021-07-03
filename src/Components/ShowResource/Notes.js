import {
	Typography,
} from '@material-ui/core';

export default function ShowNotes({ notes }) {
	return notes ? (
		<>
			<Typography variant="h6">
				Notes
			</Typography>

			<p style={{ 'white-space': 'pre-wrap' }}>{notes}</p>
		</>
	) : null;
}