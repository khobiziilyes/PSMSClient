import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';

/*
	- Show resources dialog.
	- Save as pdf.
	- enableNestedDataAccess
	- Print full table (Maybe serverside ?).
	- Tables: Accessories - Transactions - People - Phones - Items.
	- Main page containing quick actions & Infos.
	- Flexy page(s).
	- Log-in page.
	- https://stackoverflow.com/questions/1714786/query-string-encoding-of-a-javascript-object
*/

ReactDOM.render(
    <React.StrictMode>
        <App drawerWidth={240} />
    </React.StrictMode>,
    document.getElementById('root')
);