import React from 'react';
import ReactDOM from 'react-dom';
import { RecoilRoot, useRecoilValue } from 'recoil';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import axios from 'axios';

import { MuiThemeProvider } from '@material-ui/core/styles';

import { userAtom } from './Atoms';
import { App } from './App';
import Signin from './Pages/Signin';
import Theme from '@src/Theme';


axios.defaults.baseURL = 'http://localhost:8000/api/';
axios.defaults.responseType = 'json';

axios.defaults.headers.common['accept'] = 'application/json';
axios.defaults.headers.common['content-type'] = 'application/json';

/*
	- Transactions Carts.

	- Show resources dialogs.
	- Show notes everywhere.
	- SearchBar to sell.
	- Show menus depending on authorizations.

	- Save Table as pdf.
	- enableNestedDataAccess
	- Print full table (Maybe serverside ?).
	
	- Main page containing quick actions & Infos.
	- Flexy page(s).
	- Log-in page.
	- https://stackoverflow.com/questions/1714786/query-string-encoding-of-a-javascript-object
*/

function FullApp() {
	const user = useRecoilValue(userAtom);
	return <Redirect to={user ? '/' : "/Signin"} />;
}

ReactDOM.render(
    <React.StrictMode>
    	<RecoilRoot>
    		<BrowserRouter>
    			<MuiThemeProvider theme={Theme}>
    				<Switch>
						<Route path='/Signin' component={Signin} exact />
						<Route path='/' component={() => <App drawerWidth={240} />} />
					</Switch>

					<FullApp />
    			</MuiThemeProvider>
    		</BrowserRouter>
    	</RecoilRoot>
    </React.StrictMode>,
    document.getElementById('root')
);