import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';

ReactDOM.render(
    <React.StrictMode>
        <App drawerWidth={240}/>
    </React.StrictMode>,
    document.getElementById('root')
);