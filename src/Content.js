import React from 'react';
import { Route, Switch } from 'react-router-dom';
import FormDialog from '@Components/FormDialog';

import Dashboard from './Pages/Dashboard';
import Stock from './Pages/Stock';
import CreatePerson from './Pages/Person/Create';
import CreatePhone from './Pages/Items/Phone/Create';
import CreateAccessory from './Pages/Items/Accessory/Create';
import CreateOperation from './Pages/Operations/Create';
import CreateItem from './Pages/Items/Create';

/*
	- Some resources dialog.
	- Save as pdf.
	- enableNestedDataAccess
	- Print full table (Maybe serverside ?).
	- Tables: Accessories - Operations - People - Phones - Items.
	- Main page containing quick actions & Infos.
	- Flexy page(s).
	- Log-in page.
	- https://stackoverflow.com/questions/1714786/query-string-encoding-of-a-javascript-object
*/

const CreateVendor = (props) => <CreatePerson isVendor {...props} />;
const CreateBuy = (props) => <CreateOperation isBuy {...props} />;

const RoutesArr = {
	"/dashboard": Dashboard,
	"/stock": Stock
};

export const Content = ({ dialogIsOpen,  selectedForm, handleDialogClose, handleDialogSubmit }) => {
	return (
    	<>
    		<FormDialog open={dialogIsOpen} title={'Create new ' + selectedForm} handleClose={handleDialogClose} handleSubmit={handleDialogSubmit}>
                {selectedForm === 'Customer' && <CreatePerson />}
                {selectedForm === 'Phone' && <CreatePhone />}
                {selectedForm === 'Vendor' && <CreateVendor />}
                {selectedForm === 'Accessory' && <CreateAccessory />}
                {selectedForm === 'Item' && <CreateItem />}
                {selectedForm === 'Buy' && <CreateBuy />}
                {selectedForm === 'Sell' && <CreateOperation />}
            </FormDialog>

	    	<Switch>
	        	{Object.entries(RoutesArr).map(([index, value]) => <Route key={value + "-route"} path={index} component={value} />)}
	        </Switch>
	      </>
    );
}