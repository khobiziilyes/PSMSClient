import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';

import { QueryClient, QueryClientProvider } from 'react-query'
import { Route, Switch } from 'react-router-dom';

import { useRecoilState, useRecoilValue } from 'recoil';
import { dialogSelectedFormAtom, dialogIsOpenedAtom } from '@src/Atoms';

import * as Pages from './Pages';
import TestingForm from '@src/Pages/Person/Create/index0.js';

const RoutesObj = {
	'/dashboard': Pages.Dashboard,
	'/stock': Pages.Stock
};

const formsObj = {
	'Customer': <TestingForm />,
	'Phone': <Pages.CreatePhone />,
	'Vendor': <Pages.CreateVendor />,
	'Accessory': <Pages.CreateAccessory />,
	'Item': <Pages.CreateItem />
};

const queryClient = new QueryClient();

export default function Content() {
	const dialogSelectedForm = useRecoilValue(dialogSelectedFormAtom);
	const [dialogIsOpened, setDialogIsOpened] = useRecoilState(dialogIsOpenedAtom);
	const handleDialogClose = () => setDialogIsOpened(false);

	return (
		<>
	    	<QueryClientProvider client={queryClient}>
	    		<Dialog open={dialogIsOpened} onClose={handleDialogClose}>
		            <DialogTitle>{'Create new ' + dialogSelectedForm.toLowerCase()}</DialogTitle>
		            
		            <DialogContent style={{ overflow: 'hidden' }}>
		                {formsObj[dialogSelectedForm]}
		            </DialogContent>
		            
		            <DialogActions>
		                <Button onClick={handleDialogClose} color="primary">
		                    Cancel
		                </Button>
		                
		                <Button onClick={() => alert('Submited')} color="primary">
		                    Submit
		                </Button>
		            </DialogActions>
		        </Dialog>
		    </QueryClientProvider>

		   	<Switch>
		    	{Object.entries(RoutesObj).map(([index, value]) => <Route key={value + "-route"} path={index} component={value} />)}
	        </Switch>
	    </>
    );
}