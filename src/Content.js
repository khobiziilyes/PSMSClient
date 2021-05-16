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
	'/stock': Pages.Stock
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

	return (
    	<QueryClientProvider client={queryClient}>
    		<Dialog open={dialogIsOpened} disableBackdropClick disableEscapeKeyDown>
	            <DialogTitle>{'Create new ' + dialogSelectedForm.toLowerCase()}</DialogTitle>

	            <Formik onSubmit={onSubmit} {...Pages['Create' + dialogSelectedForm].formikParams}>
		            {({ submitForm, isSubmitting, isValid, errors, touched }) => (
		                <>
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
		                        <Button onClick={() => setDialogIsOpened(false)} color="primary" disabled={isSubmitting}>
		                            Cancel
		                        </Button>
		                        
		                        <Button onClick={submitForm} color="primary" disabled={isSubmitting}>
		                            Submit
		                        </Button>
		                    </DialogActions>
		                </>
		            )}
		        </Formik>
	        </Dialog>

		   	<Switch>
		    	{Object.entries(RoutesObj).map(([index, value]) => <Route key={value + "-route"} path={index} component={value} />)}
	        </Switch>
        </QueryClientProvider>
    );
}