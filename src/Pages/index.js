import React from 'react';

import Dashboard from './Dashboard';

import PhonesList from './Items/Phone/List';
import AccessoriesList from './Items/Accessory/List';
import ItemsList from './Items/List';
import PeopleList from './Person/List';
import TransactionsList from './Transactions/List';
import UsersList from './Users/List';

import { VendorForm, CustomerForm } from './Person/Create';
/*
import * as AccessoryForm from './Items/Accessory/Create';
import * as PhoneForm from './Items/Phone/Create';
import * as ItemForm from './Items/Create';
import * as TransactionForm from './Transactions/Create';
import * as UserForm from './Users/Create';
import * as PermissionsForm from './Users/Permissions';
*/

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

	VendorForm,
	CustomerForm,
	/*
	PhoneForm,
	AccessoryForm,
	ItemForm,
	SellForm,
	BuyForm,
	UserForm,
	PermissionsForm
	*/
}