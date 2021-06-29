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

const buildOnSubmit = ({
    initialId = null,
    formikParams,
    invalidateQueries,
    closeFormDialog,
    redirectTo,
    showNotification
}) => (values, { setSubmitting, resetForm, setFieldError }) => {
    const URL = formikParams.URL;
    const isCreate = (initialId === null);

    axios({
        url: (typeof URL === 'function') ? URL(initialId, isCreate) : (URL + '/' + (isCreate ? '' : initialId)),
        method: isCreate ? 'POST' : 'PATCH',
        data: values
    }).then(response => {
        if (response.data) {
            const resourceId = isCreate ? response.data.data.id : initialId;

            showNotification((isCreate ? 'Created' : 'Updated') + ' successfully, ID: #' + resourceId);
            invalidateQueries((URL instanceof Function) ? formikParams.dataURL : URL);

            resetForm();
            closeFormDialog();

            if (isCreate)
                redirectTo(formikParams.tableRoute || (URL + '?totalRows=' + response.data.totalRows + '&highlightId=' + resourceId));
        } else {
            return Promise.reject({ request: response });
        }
    }).catch(buildCatchError({ showNotification, setFieldError })).finally(() => setSubmitting(false));
}

export default buildOnSubmit;