import React from 'react';
import ReactDOM from 'react-dom';

import { RecoilRoot, useRecoilValue } from 'recoil';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import axios from 'axios';

import { MuiThemeProvider } from '@material-ui/core/styles';

import { userAtom } from './Atoms';
import Theme from '@src/Theme';

import App from '@src/Pages/App';
import Signin from '@src/Pages/Signin';

axios.defaults.baseURL = 'http://192.168.43.192:8000/api/';
axios.defaults.responseType = 'json';

axios.defaults.headers.common['Accept'] = 'application/json';

/*
	- Add isUpdatable to data from server.
	- Brand in Accessory shouldn't be required.
	- Accessory isn't highlighted
	
	- Remove fields autocomplete.
	- notes are not showing new lines.
	
	- SpeedDial problem.
	- win tl9a axios ma tnsach .catch();

	- SearchBar action + searchType.
	- Hide components dependings on authorizations.

	- Main page containing quick actions & Infos.
	- Flexy page(s).
	
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