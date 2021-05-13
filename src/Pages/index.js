import Dashboard from './Dashboard';
import Stock from './Stock';
import CreatePerson from './Person/Create';
import CreatePhone from './Items/Phone/Create';
import CreateAccessory from './Items/Accessory/Create';
import CreateOperation from './Operations/Create';
import CreateItem from './Items/Create';

const CreateVendor = (props) => <CreatePerson isVendor {...props} />;
const CreateBuy = (props) => <CreateOperation isBuy {...props} />;

export {
	Dashboard,
	Stock,
	CreatePerson as CreateCustomer,
	CreatePhone,
	CreateAccessory,
	CreateOperation as CreateSell,
	CreateItem,
	CreateVendor,
	CreateBuy
};