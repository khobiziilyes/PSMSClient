import React from 'react';
import axios from 'axios';

import { useHistory } from "react-router-dom";
import { useSnackbar } from 'notistack';
import { useQueryClient } from 'react-query'
import { Formik, Form } from 'formik';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@material-ui/core';

import { useRecoilState } from 'recoil';
import { formDialogParamsAtom } from '@src/Atoms';

import * as Pages from '@src/Pages';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    root: {
        width: '100%',
        maxWidth: 500
    }
});

const ErrorTypo = ({ text, title = null}) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            {title && <Typography variant="h4" gutterBottom>{title}</Typography>}
            <Typography variant="body2">{text}</Typography>
        </div>
    );
}

export default function FormikDialog() {
	const queryClient = useQueryClient();
    const history = useHistory();
    const { enqueueSnackbar } = useSnackbar();

	const [formDialogParams, setFormDialogParams] = useRecoilState(formDialogParamsAtom);
    const formDialogName = formDialogParams.name;
    const formDialogInitialValues = formDialogParams.initialValues;
	const handleFormDialogClose = () => setFormDialogParams({ isOpened: false });

    const { formikParams, TheForm } = Pages['Create' + formDialogName] || {};
    const isCreate = formDialogInitialValues === null;
    
    const onSubmit = (values, { setSubmitting, resetForm, setFieldError }) => {
        const URL = formikParams.URL;

        axios({
            url: (typeof URL === 'function') ? URL(formDialogInitialValues.id, isCreate) : (formikParams.URL + '/' + (isCreate ? '' : formDialogInitialValues.id)),
            method: isCreate ? 'POST' : 'PATCH',
            data: formikParams.fieldToData ? formikParams.fieldToData(values) : values
        }).then(response => {
            if (response.data) {
                const resourceId = isCreate ? response.data.data.id : response.data.id;

                enqueueSnackbar((isCreate ? 'Created' : 'Updated') + ' successfully, ID: #' + resourceId, { variant: 'success' });
                queryClient.invalidateQueries((URL instanceof Function) ? formikParams.dataURL : formikParams.URL);

                resetForm();
                handleFormDialogClose();

                if (isCreate)
                    history.push(formikParams.tableRoute || formikParams.URL +
                        '?totalRows=' + response.data.totalRows +
                        '&highlightId=' + resourceId
                    );
            } else {
                // Wsh a frr
            }
        }).catch(error => {
            if (error.response) {
                const errorsList = Object.entries(error.response.data.errors)
                
                errorsList.forEach(([fieldName, fieldError]) => {
                    enqueueSnackbar(
                        <ErrorTypo title={fieldName} text={fieldError} />,
                    { variant: 'error' });

                    setFieldError(fieldName, fieldError);
                });
            } else if (error.request) {
                enqueueSnackbar('Server not available.', { variant: 'error' });
            } else {
                enqueueSnackbar('Coding error.', { variant: 'error' });
            }
        }).finally(() => {
            setSubmitting(false);
        });
    }

    const { id, ...initialValues } = (isCreate ? formikParams.initialValues : formDialogInitialValues) || {};
    
    return TheForm ?
        <Formik onSubmit={formikParams.onSubmit || onSubmit} enableReinitialize validationSchema={formikParams.validationSchema} initialValues={initialValues}>
            {({ submitForm, isSubmitting, setFieldValue }) => 
                <Dialog open={formDialogParams.isOpened} disableBackdropClick={isSubmitting} disableEscapeKeyDown={isSubmitting} onClose={handleFormDialogClose} fullWidth maxWidth={formikParams.formSize || 'sm'}>
                    <DialogTitle>{'Create new ' + formDialogName.toLowerCase()}</DialogTitle>

                    <DialogContent>
                        {false && <Typography variant="h6" gutterBottom>
                            Basic Informations
                        </Typography>}

                        <Form>
                            <TheForm setFieldValue={setFieldValue} isSubmitting={isSubmitting} isCreate={isCreate} />
                        </Form>
                    </DialogContent>
            
                    <DialogActions>
                        <Button onClick={handleFormDialogClose} color="primary" disabled={isSubmitting} variant="outlined">
                            Cancel
                        </Button>
                        
                        <Button onClick={submitForm} color="primary" disabled={isSubmitting} variant="outlined">
                            Submit
                        </Button>
                    </DialogActions>
                </Dialog>
            }
        </Formik> : null;
}