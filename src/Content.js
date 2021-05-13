import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query'
import { Route, Switch } from 'react-router-dom';
import FormDialog from '@Components/FormDialog';
import * as Pages from './Pages';

/*
	- Show resources dialog.
	- Save as pdf.
	- enableNestedDataAccess
	- Print full table (Maybe serverside ?).
	- Tables: Accessories - Operations - People - Phones - Items.
	- Main page containing quick actions & Infos.
	- Flexy page(s).
	- Log-in page.
	- https://stackoverflow.com/questions/1714786/query-string-encoding-of-a-javascript-object
*/

const RoutesArr = {
	"/dashboard": Pages.Dashboard,
	"/stock": Pages.Stock
};

const queryClient = new QueryClient();

export default function Content({ dialogIsOpen,  selectedForm, handleDialogClose, handleDialogSubmit }) {
	return (
    	<QueryClientProvider client={queryClient}>
    		<FormDialog open={dialogIsOpen} title={'Create new ' + selectedForm} handleClose={handleDialogClose} handleSubmit={handleDialogSubmit}>
                {selectedForm === 'Customer' && <Pages.CreateCustomer />}
                {selectedForm === 'Phone' && <Pages.CreatePhone />}
                {selectedForm === 'Vendor' && <Pages.CreateVendor />}
                {selectedForm === 'Accessory' && <Pages.CreateAccessory />}
                {selectedForm === 'Item' && <Pages.CreateItem />}
                {selectedForm === 'Buy' && <Pages.CreateBuy />}
                {selectedForm === 'Sell' && <Pages.CreateSell />}
            </FormDialog>

	    	<Switch>
	        	{Object.entries(RoutesArr).map(([index, value]) => <Route key={value + "-route"} path={index} component={value} />)}
	        </Switch>
	      </QueryClientProvider>
    );
}