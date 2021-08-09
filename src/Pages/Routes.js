import * as Pages from '@src/Pages';

export const RoutesList = {
	Dashboard: {
		URL: '/',
		Component: Pages.Dashboard
	},
	VendorsList: {
		URL: '/vendors',
		Component: Pages.VendorsList
	},
	CustomersList: {
		URL: '/customers',
		Component: Pages.CustomersList
	},
	PhonesList: {
		URL: '/phones',
		Component: Pages.PhonesList
	},
	AccessoriesList: {
		URL: '/accessories',
		Component: Pages.AccessoriesList
	},
	ItemsAccessoriesList: {
		URL: '/itemsAccessories',
		Component: Pages.ItemsAccessoriesList	
	},
	ItemsPhonesList: {
		URL: '/itemsPhones',
		Component: Pages.ItemsPhonesList
	},
	SellsList: {
		URL: '/sell',
		Component: Pages.SellsList
	},
	BuysList: {
		URL: '/buy',
		Component: Pages.BuysList
	},
	UsersList: {
		URL: '/users',
		Component: Pages.UsersList
	},
	ItemsStats: {
		URL: '/items/stats',
		Component: Pages.ItemsStats
	}
}