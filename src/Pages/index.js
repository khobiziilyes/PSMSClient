import React from 'react';

import Dashboard from './Dashboard';

import PhonesList from './Items/Phone/List';
import AccessoriesList from './Items/Accessory/List';
import ItemsList from './Items/List';
import PeopleList from './Person/List';
import TransactionsList from './Transactions/List';
import UsersList from './Users/List';

import * as AccessoryForm from './Items/Accessory/Create';
import * as PhoneForm from './Items/Phone/Create';
import * as PersonForm from './Person/Create';
import * as ItemForm from './Items/Create';
import * as TransactionForm from './Transactions/Create';
import * as UserForm from './Users/Create';
import * as PermissionsForm from './Users/Permissions';

const VendorsList = props => <PeopleList isVendor {...props} />;
const BuysList = props => <TransactionsList isBuy {...props} />;
const ItemsPhonesList = props => <ItemsList isPhone {...props} />;

const PersonFormForm = props => <PersonForm.TheForm isVendor {...props} />
const VendorForm = {
	...PersonForm,
	TheForm: PersonFormForm,
	formikParams: PersonForm.formikParams(true)
}

const CustomerForm = {
	...PersonForm,
	formikParams: PersonForm.formikParams(false)
}

const BuyFormForm = props => <TransactionForm.TheForm isBuy {...props} />;
const BuyForm = {
	...TransactionForm,
	TheForm: BuyFormForm,
	formikParams: TransactionForm.formikParams(true)
}

const SellForm = {
	...TransactionForm,
	formikParams: TransactionForm.formikParams(false)
}

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

	CustomerForm,
	VendorForm,
	PhoneForm,
	AccessoryForm,
	ItemForm,
	SellForm,
	BuyForm,
	UserForm,
	PermissionsForm
}