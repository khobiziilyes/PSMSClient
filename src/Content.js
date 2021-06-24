import React from 'react';

import { SnackbarProvider } from 'notistack';
import { QueryClient, QueryClientProvider } from 'react-query';
//import { ReactQueryDevtools } from 'react-query/devtools';
import { Route, Switch } from 'react-router-dom';

import FormikDialog from '@Components/FormikDialog';

import * as Pages from './Pages';

import {
	CheckCircleOutline as CheckCircleOutlineIcon,
	Error as ErrorIcon,
	Warning as WarningIcon,
	Info as InfoIcon
} from '@material-ui/icons';

const RoutesObj = {
	'/dashboard': Pages.Dashboard,
	
	'/vendors': Pages.VendorsList,
	'/customers': Pages.CustomersList,
	'/phones': Pages.PhonesList,
	'/accessories': Pages.AccessoriesList,
	'/itemsAccessories': Pages.ItemsAccessoriesList,
	'/itemsPhones': Pages.ItemsPhonesList,
	'/sells': Pages.SellsList,
	'/buys': Pages.BuysList,

	'/users': Pages.UsersList
}

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
			placeholderData: [],
			staleTime: 0.5 * 60 * 1000,
			refetchInterval: 0.5 * 60 * 1000,
			cacheTime: 5 * 60 * 1000
		}
	}
});

const iconsProps = {
	fontSize: "large",
	style: {
		marginRight: 20
	}
}

const snackBarOptions = {
	iconVariant: {
        success: <CheckCircleOutlineIcon {...iconsProps} />,
        error: <ErrorIcon {...iconsProps} />,
        warning: <WarningIcon {...iconsProps} />,
        info: <InfoIcon {...iconsProps} />
    },
    maxSnack: 8
}

export default function Content() {
	return (
		<QueryClientProvider client={queryClient}>
    		<SnackbarProvider {...snackBarOptions}>
	    		<FormikDialog />
			   	
			   	<Switch>
			    	{Object.entries(RoutesObj).map(([index, value]) => <Route key={value + "-route"} path={index} component={value} />)}
		        </Switch>
		    </SnackbarProvider>
        </QueryClientProvider>
    );
}