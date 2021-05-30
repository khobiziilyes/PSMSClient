import React from 'react';

import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { Route, Switch } from 'react-router-dom';

import FormikDialog from '@Components/FormikDialog';

import * as Pages from './Pages';

const RoutesObj = {
	'/dashboard': Pages.Dashboard,
	'/vendors': Pages.VendorsList,
	'/customers': Pages.CustomersList,
	'/phones': Pages.PhonesList,
	'/accessories': Pages.AccessoriesList,
	'/itemsAccessories': Pages.ItemsAccessoriesList,
	'/itemsPhones': Pages.ItemsPhonesList,
	'/sells': Pages.SellsList,
	'/buys': Pages.BuysList
}

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
			placeholderData: [],
			staleTime: 1 * 60 * 1000,
			refetchInterval: 1 * 60 * 1000,
			cacheTime: 5 * 60 * 1000
		}
	}
});

export default function Content() {
	return (
    	<QueryClientProvider client={queryClient}>
    		<FormikDialog />
    		
		   	<Switch>
		    	{Object.entries(RoutesObj).map(([index, value]) => <Route key={value + "-route"} path={index} component={value} />)}
	        </Switch>

	        <ReactQueryDevtools />
        </QueryClientProvider>
    );
}