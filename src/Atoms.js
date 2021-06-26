import { atom } from 'recoil';

const drawerIsOpenedAtom = atom({
    key: 'drawerIsOpenedAtom',
    default: false
});


const formDialogParamsAtom = atom({
	key: 'formDialogParams',
	default: {
		isOpened: false,
		name: 'Customer',
		initialValues: null
	}
})

const userAtom = atom({
    key: 'user',
    default: {name: 'A', email: 'B'}
});

const accessoriesNamesAtom = atom({
	key: 'accessoriesNamesAtom',
	default: {
		1: 'AntiShock',
		2: 'Glass',
		3: 'AirPods',
		4: 'IDK'
	}
})

export {
	drawerIsOpenedAtom,
	
	userAtom,
	accessoriesNamesAtom,
	formDialogParamsAtom
};