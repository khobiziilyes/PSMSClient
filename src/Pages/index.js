import Dashboard from './Dashboard';

import PhonesList from './Items/Phone/List';
import AccessoriesList from './Items/Accessory/List';
import ItemsList from './Items/List';
import PeopleList from './Person/List';
import TransactionsList from './Transactions/List';

import * as CreateAccessory from './Items/Accessory/Create';
import * as CreatePhone from './Items/Phone/Create';
import * as CreatePerson from './Person/Create';
import * as CreateItem from './Items/Create';
import * as CreateTransaction from './Transactions/Create';

const VendorsList = (props) => <PeopleList isVendor />;

const CreateVendorForm = (props) => <CreatePerson.TheForm isVendor {...props} />;
const CreateVendor = {
	...CreatePerson,
	TheForm: CreateVendorForm,
	formikProps: CreatePerson.formikParams
}

const CreateBuyForm = (props) => <CreateTransaction.TheForm isBuy {...props} />;
const CreateBuy = {
	...CreateTransaction,
	TheForm: CreateBuyForm,
	formikProps: CreateTransaction.formikParams
}

export {
	Dashboard,

	PeopleList as CustomersList,
	VendorsList,
	PhonesList,
	AccessoriesList,
	ItemsList,
	TransactionsList,

	CreatePerson as CreateCustomer,
	CreateVendor,
	CreatePhone,
	CreateAccessory,
	CreateItem,
	CreateTransaction as CreateSell,
	CreateBuy
};