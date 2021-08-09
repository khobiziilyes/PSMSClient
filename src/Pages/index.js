import React from 'react';

import Dashboard from './Dashboard';

import PhonesList from './Items/Phone/List';
import AccessoriesList from './Items/Accessory/List';
import ItemsList from './Items/List';
import PeopleList from './Person/List';
import TransactionsList from './Transactions/List';
import UsersList from './Users/List';

import ItemsStats from './Stats/Items';

const VendorsList = props => <PeopleList isVendor {...props} />;
const BuysList = props => <TransactionsList isBuy {...props} />;
const ItemsPhonesList = props => <ItemsList isPhone {...props} />;

export {
	Dashboard,

	PeopleList as CustomersList,
	VendorsList,
	PhonesList,
	AccessoriesList,
	ItemsList as ItemsAccessoriesList,
	ItemsPhonesList,
	TransactionsList as SellsList,
	BuysList,
	UsersList,

	ItemsStats
}