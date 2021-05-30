import React from 'react';
 import { useQueryClient } from 'react-query'
import { Formik, Form } from 'formik';
import axios from 'axios';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@material-ui/core';

import { useRecoilState, useRecoilValue } from 'recoil';
import { formDialogSelectedFormAtom, formDialogIsOpenedAtom } from '@src/Atoms';

import * as Pages from '@src/Pages';

const onSubmit = (Params, queryClient) => {
    return (values, { setSubmitting }) => {
        const formatedData = Params.formatData ? Params.formatData(values) : values;

        axios.post(Params.URL, Object.fromEntries(Object.entries(formatedData).filter(([name, val]) => val))).then(response => {
            console.log(response);
            queryClient.invalidateQueries(Params.URL);

            setSubmitting(false);
        });
    }
}

export default function FormikDialog() {
	const formDialogSelectedForm = useRecoilValue(formDialogSelectedFormAtom);
	const [formDialogIsOpened, setFormDialogIsOpened] = useRecoilState(formDialogIsOpenedAtom);
	const handleFormDialogClose = () => setFormDialogIsOpened(false);

    const SelectedPage = Pages['Create' + formDialogSelectedForm];

    const queryClient = useQueryClient();

	return (
		<Formik onSubmit={onSubmit(SelectedPage.Params, queryClient)} {...SelectedPage.formikParams}>
            {({ submitForm, isSubmitting, isValid, errors, touched }) => (
                <Dialog open={formDialogIsOpened} disableBackdropClick={isSubmitting} disableEscapeKeyDown={isSubmitting} onClose={handleFormDialogClose} fullWidth maxWidth='sm'>
                    <DialogTitle>{'Create new ' + formDialogSelectedForm.toLowerCase()}</DialogTitle>

                    <DialogContent style={{ overflow: 'hidden' }}>
                        <Typography variant="h6" gutterBottom>
                            Basic Informations
                        </Typography>

                        <Form>
                            <SelectedPage.TheForm isSubmitting={isSubmitting} />
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
            )}
        </Formik>
	);
}