import axios from 'axios';

import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
	root: {
		width: '100%',
		maxWidth: 500
	}
});

const ErrorTypo = ({ text, title = null }) => {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			{title && <Typography variant="h4" gutterBottom>{title}</Typography>}
			<Typography variant="body2">{text}</Typography>
		</div>
	);
}

const buildCatchError = ({ showNotification, setFieldError }) => error => {
	console.log(error);

	if (error.response && error.response.data && error.response.data.errors) {
		Object.entries(error.response.data.errors).forEach(([fieldName, fieldError]) => {
			showNotification(<ErrorTypo title={fieldName} text={fieldError} />, 'error');
			setFieldError(fieldName, fieldError);
		});
	} else if (error.request) {
		showNotification('Server not available.', 'error');
	} else {
		showNotification('Internal client error.', 'error');
	}
}

const buildOnSubmit = ({ initialId, isCreate, invalidateQueries, closeFormDialog, redirectTo, showNotification, formatParams }) => 
	(values, formikBag) => {
		const { finalURL, finalValues, finalTableRoute, finalTesting } = formatParams({ URL, values, isCreate, initialId });
		const { setSubmitting, resetForm, setFieldError } = formikBag;

		if (finalTesting) {
			setTimeout(() => setSubmitting(false), 5000);
			return;
		}

		axios({
			url: finalURL,
			data: finalValues,
			method: isCreate ? 'POST' : 'PUT'
		}).then(response => {
			if (response.data) {
				const resourceId = isCreate ? response.data.data.id : initialId;

				showNotification((isCreate ? 'Created' : 'Updated') + ' successfully, ID: #' + resourceId);
				invalidateQueries();

				resetForm(); // Zyada f denya? Now each time it's a new instance so ...
				closeFormDialog();

				if (isCreate)
					redirectTo(finalTableRoute, { highlightId: resourceId });
			} else {
				return Promise.reject({ request: response });
			}
		}).catch(buildCatchError({ showNotification, setFieldError })).finally(() => setSubmitting(false));
	}

export default buildOnSubmit;