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
		initialValues: {},
		injectedProps: {}
	}
})

const userAtom = atom({
    key: 'user',
    default: { name: 'A', email: 'B' }
});

export {
	drawerIsOpenedAtom,
	
	userAtom,
	formDialogParamsAtom
};