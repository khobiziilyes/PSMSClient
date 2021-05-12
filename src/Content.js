import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Dashboard from './Pages/Dashboard';
import Stock from './Pages/Stock';
import CreatePerson from './Pages/Person/Create';
import CreatePhone from './Pages/Items/Phone/Create';
import CreateAccessory from './Pages/Items/Accessory/Create';
import CreateOperation from './Pages/Operations/Create';
import CreateItem from './Pages/Items/Create';

import FormDialog from '@Components/FormDialog';

/*
	- Tables: Accessories - Operations - People - Phones - Items.
	- onRowsPerPage - OnSearchChange - OnFilterChange: setCurrentPage(1).
	- Main page containing quick actions & Infos.
	- Flexy page(s).
	- Log-in page.
	- https://stackoverflow.com/questions/1714786/query-string-encoding-of-a-javascript-object
*/

const CreateVendor = (props) => <CreatePerson isVendor {...props} />;
const CreateBuy = (props) => <CreateOperation isBuy {...props} />;

const RoutesArr = {
	"/dashboard": Dashboard,
	"/stock": Stock,

	"/vendors/create": CreateVendor,
	"/customers/create": CreatePerson,
	"/phones/create": CreatePhone,
	"/accessories/create": CreateAccessory,
	"/items/create": CreateItem,
	"/buy/create": CreateBuy,
	"/sell/create": CreateOperation
};

export const Content = () => {
	const [dialogIsOpen, setDialogIsOpen] = React.useState(true);
	
	const handleDialogClose = () => setDialogIsOpen(false);
	
	const handleDialogSubmit = () => {
		alert('Form submited');
		setDialogIsOpen(false);
	}

    return (
    	<>
	    	<FormDialog open={dialogIsOpen} title='Some title' handleClose={handleDialogClose} handleSubmit={handleDialogSubmit}>
	    		<CreateVendor />
	    	</FormDialog>
	        
	        <Switch>
	        	{Object.entries(RoutesArr).map(([index, value]) => <Route key={value + "-route"} path={index} component={value} />)}
	        </Switch>
        </>
    );
}