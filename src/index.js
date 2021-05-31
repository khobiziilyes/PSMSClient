import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { RecoilRoot, useRecoilValue } from 'recoil';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import { MuiThemeProvider } from '@material-ui/core/styles';

import { userAtom } from './Atoms';
import { App } from './App';
import Signin from './Pages/Signin';
import Theme from '@src/Theme';

axios.defaults.baseURL = 'http://localhost:8000/api/';
axios.defaults.responseType = 'json';

axios.defaults.headers.common['Accept'] = 'application/json';

/*
	- Map accessoriesNames in the table.
	- Remove fields autocomplete.
	- notes are not showing new lines.
	- Hide edit items that are not owned.
	- SERVER: remove 0 page & remove GET RESOURCE.

	- SpeedDial problem.
	- win tl9a axios ma tnsach catch();

	- Add formatData(data) for MuiTable.
	- Generate dummy data in tables to keep scroll with length = rowsPerPage.
	
	- SearchBar action + searchType.
	- Hide items dependings on authorizations.

	- Save Table as pdf.
	
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
    			</MuiThemeProvider>
    		</BrowserRouter>
    	</RecoilRoot>
    </React.StrictMode>,
    document.getElementById('root')
);