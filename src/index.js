import React from 'react';
import ReactDOM from 'react-dom';
import { RecoilRoot } from 'recoil';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import { MuiThemeProvider } from '@material-ui/core/styles';

import { App } from './App';
import Signin from './Pages/Signin';
import Theme from '@src/Theme';

/*
	- Show resources dialog.
	- SearchBar onChange.
	
	- Save Table as pdf.
	- enableNestedDataAccess
	- Print full table (Maybe serverside ?).
	- Tables: Accessories - Transactions - People - Phones - Items.
	
	- Main page containing quick actions & Infos.
	- Flexy page(s).
	- Log-in page.
	- https://stackoverflow.com/questions/1714786/query-string-encoding-of-a-javascript-object
*/

function FullApp() {
	return (
		<>
			<Switch>
				<Route path='/Signin' component={Signin} exact />
				<Route path='/' component={() => <App drawerWidth={240} />} />
			</Switch>

			<Redirect to='/Signin' />
		</>
	);
}

ReactDOM.render(
    <React.StrictMode>
    	<RecoilRoot>
    		<BrowserRouter>
    			<MuiThemeProvider theme={Theme}>
    				<FullApp />
    			</MuiThemeProvider>
    		</BrowserRouter>
    	</RecoilRoot>
    </React.StrictMode>,
    document.getElementById('root')
);