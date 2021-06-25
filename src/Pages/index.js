import Dashboard from './Dashboard';

import PhonesList from './Items/Phone/List';
import AccessoriesList from './Items/Accessory/List';
import ItemsList from './Items/List';
import PeopleList from './Person/List';
import TransactionsList from './Transactions/List';
import UsersList from './Users/List';

import * as CreateAccessory from './Items/Accessory/Create';
import * as CreatePhone from './Items/Phone/Create';
import * as CreatePerson from './Person/Create';
import * as CreateItem from './Items/Create';
import * as CreateTransaction from './Transactions/Create';
import * as CreateUser from './Users/Create';
import * as CreatePermissions from './Users/Permissions';

const VendorsList = (props) => <PeopleList isVendor {...props} />;
const BuysList = (props) => <TransactionsList isBuy {...props} />;
const ItemsPhonesList = (props) => <ItemsList isPhone {...props} />;

const personFormikParams = CreatePerson.formikParams;

const CreateVendorForm = (props) => <CreatePerson.TheForm isVendor {...props} />;
const CreateVendor = {
	...CreatePerson,
	TheForm: CreateVendorForm,
	formikParams: personFormikParams(true)
}

const CreateCustomer = {
	...CreatePerson,
	formikParams: personFormikParams(false)
}

const CreateBuyForm = (props) => <CreateTransaction.TheForm isBuy {...props} />;
const CreateBuy = {
	...CreateTransaction,
	TheForm: CreateBuyForm,
	formikParams: CreateTransaction.formikParams(true)
}

const CreateSell = {
	...CreateTransaction,
	formikParams: CreateTransaction.formikParams(false)
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

	CreateCustomer,
	CreateVendor,
	CreatePhone,
	CreateAccessory,
	CreateItem,
	CreateSell,
	CreateBuy,
	CreateUser,
	CreatePermissions
}