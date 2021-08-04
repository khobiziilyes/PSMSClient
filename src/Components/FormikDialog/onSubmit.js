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
		const { URL, data, tableRoute, testing, baseURL, method } = formatParams({ values, isCreate, initialId });
		const { setSubmitting, setFieldError } = formikBag;

		const finalURL = URL ?? (baseURL + (isCreate ? '' : `/${initialId}`));
		const finalTableRoute = tableRoute ?? baseURL;

		if (testing) {
			setTimeout(() => setSubmitting(false), 5000);
			return;
		}

		axios({
			url: finalURL,
			data: data ?? values,
			method: method ?? (isCreate ? 'POST' : 'PUT')
		}).then(response => {
			if (response.data) {
				const resourceId = isCreate ? response.data.data.id : initialId;

				showNotification((isCreate ? 'Created' : 'Updated') + ' successfully, ID: #' + resourceId);
				invalidateQueries();

				closeFormDialog();

				if (isCreate)
					redirectTo(finalTableRoute, { highlightId: resourceId });
			} else {
				return Promise.reject({ request: response });
			}
		}).catch(buildCatchError({ showNotification, setFieldError })).finally(() => setSubmitting(false));
	}

export default buildOnSubmit;