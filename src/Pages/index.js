import Dashboard from './Dashboard';
import Stock from './Stock';
import * as CreateAccessory from './Items/Accessory/Create';
import * as CreatePhone from './Items/Phone/Create';
import * as CreatePerson from './Person/Create';
import * as CreateItem from './Items/Create';
import * as CreateTransaction from './Transactions/Create';

const CreateVendorForm = (props) => <CreatePerson.TheForm isVendor {...props} />;
const CreateBuyForm = (props) => <CreateTransaction.TheForm isBuy {...props} />;

const CreateVendor = {
	...CreatePerson,
	TheForm: CreateVendorForm,
	formikProps: CreatePerson.formikParams
}

const CreateBuy = {
	...CreateTransaction,
	TheForm: CreateBuyForm,
	formikProps: CreateTransaction.formikParams
}

export {
	CreatePerson as CreateCustomer,
	CreateVendor,

	Dashboard,
	Stock,
	
	CreatePhone,
	CreateAccessory,
	CreateItem,
	
	CreateTransaction as CreateSell,
	CreateBuy
};