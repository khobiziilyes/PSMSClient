import { atom } from 'recoil';

const drawerIsOpenedAtom = atom({
    key: 'drawerIsOpenedAtom',
    default: false
});

const formDialogIsOpenedAtom = atom({
	key: 'formDialogIsOpenedAtom',
	default: false
});

const formDialogNameAtom = atom({
	key: 'formDialogNameAtom',
	default: 'Customer'
});

const formDialogInitValuesAtom = atom({
	key: 'formDialogInitValuesAtom',
	default: { id: 0 }
});

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
	
	formDialogIsOpenedAtom,
	formDialogNameAtom,
	formDialogInitValuesAtom,
	
	userAtom,
	accessoriesNamesAtom
};