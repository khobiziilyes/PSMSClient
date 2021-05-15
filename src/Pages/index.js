import Dashboard from './Dashboard';
import Stock from './Stock';
import * as CreateAccessory from './Items/Accessory/Create';
import * as CreatePhone from './Items/Phone/Create';
import * as CreatePerson from './Person/Create';
import * as CreateItem from './Items/Create';
import * as CreateOperation from './Operations/Create';

const CreateVendorForm = (props) => <CreatePerson.TheForm isVendor {...props} />;
const CreateBuyForm = (props) => <CreateOperation.TheForm isBuy {...props} />;

const CreateVendor = {
	TheForm: CreateVendorForm,
	formikProps: CreatePerson.formikParams
}

const CreateBuy = {
	TheForm: CreateBuyForm,
	formikProps: CreateOperation.formikParams
}

export {
	CreatePerson as CreateCustomer,
	CreateVendor,

	Dashboard,
	Stock,
	
	CreatePhone,
	CreateAccessory,
	CreateItem,
	
	CreateOperation as CreateSell,
	CreateBuy
};