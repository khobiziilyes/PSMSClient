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

axios.defaults.headers.common['Accept'] = 'application/json';
//axios.defaults.headers.common['Content-Type'] = 'application/json';

/*
	- Hand mouse on table hover.
	
	- Add formatData(data) for MuiTable.
	- Deleted transactions should be colored.
	- Generate dummy data in tables to keep scroll.
	- Split items to Phones/Accessories & Transactions to Sell/Buy.

	- Show resources dialogs.
	- Show notes everywhere.
	- SearchBar to sell.
	- Show menus dependings on authorizations.

	- Save Table as pdf.
	- enableNestedDataAccess
	- Print full table (Maybe serverside ?).
	
	- Main page containing quick actions & Infos.
	- Flexy page(s).
	- Log-in page.
	- https://stackoverflow.com/questions/1714786/query-string-encoding-of-a-javascript-object
	- https://github.com/nwjs/nw.js/issues/7182 --disable-web-security
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