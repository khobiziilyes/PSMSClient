import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@material-ui/core';
import { Formik, Form } from 'formik';

import { QueryClient, QueryClientProvider } from 'react-query'
import { Route, Switch } from 'react-router-dom';

import { useRecoilState, useRecoilValue } from 'recoil';
import { dialogSelectedFormAtom, dialogIsOpenedAtom } from '@src/Atoms';

import * as Pages from './Pages';

const RoutesObj = {
	'/dashboard': Pages.Dashboard,
	'/vendors': Pages.VendorsList,
	'/customers': Pages.CustomersList,
	'/phones': Pages.PhonesList,
	'/accessories': Pages.AccessoriesList,
	'/items': Pages.ItemsList,
	'/transactions': Pages.TransactionsList
}

const onSubmit = (values, { setSubmitting }) => {
    setTimeout(() => {
        setSubmitting(false);
        alert(JSON.stringify(values, null, 4));
    }, 4000);
}

const queryClient = new QueryClient();

export default function Content() {
	const dialogSelectedForm = useRecoilValue(dialogSelectedFormAtom);
	const [dialogIsOpened, setDialogIsOpened] = useRecoilState(dialogIsOpenedAtom);
	const handleDialogClose = () => setDialogIsOpened(false);

	return (
    	<QueryClientProvider client={queryClient}>
    		<Formik onSubmit={onSubmit} {...Pages['Create' + dialogSelectedForm].formikParams}>
	            {({ submitForm, isSubmitting, isValid, errors, touched }) => (
	                <Dialog open={dialogIsOpened} disableBackdropClick={isSubmitting} disableEscapeKeyDown={isSubmitting} onClose={handleDialogClose}>
	                    <DialogTitle>{'Create new ' + dialogSelectedForm.toLowerCase()}</DialogTitle>

	                    <DialogContent style={{ overflow: 'hidden' }}>
	                        <Typography variant="h6" gutterBottom>
	                            Basic Informations
	                        </Typography>

	                        <Form>
	                            {React.createElement(Pages['Create' + dialogSelectedForm].TheForm, {
	                            	isSubmitting
	                            })}
	                        </Form>
	                    </DialogContent>
	            
	                    <DialogActions>
	                        <Button onClick={handleDialogClose} color="primary" disabled={isSubmitting}>
	                            Cancel
	                        </Button>
	                        
	                        <Button onClick={submitForm} color="primary" disabled={isSubmitting}>
	                            Submit
	                        </Button>
	                    </DialogActions>
	                </Dialog>
	            )}
	        </Formik>

		   	<Switch>
		    	{Object.entries(RoutesObj).map(([index, value]) => <Route key={value + "-route"} path={index} component={value} />)}
	        </Switch>
        </QueryClientProvider>
    );
}