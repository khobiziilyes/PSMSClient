import { atom } from 'recoil';

const drawerIsOpenedAtom = atom({
    key: 'drawerIsOpenedAtom',
    default: false
});

const formDialogIsOpenedAtom = atom({
	key: 'formDialogIsOpenedAtom',
	default: false
});

const formDialogSelectedFormAtom = atom({
	key: 'formDialogSelectedFormAtom',
	default: 'Customer'
});

const userAtom = atom({
    key: 'user',
    default: {name: 'A', email: 'B'}
});


export {
	drawerIsOpenedAtom,
	
	formDialogIsOpenedAtom,
	formDialogSelectedFormAtom,
	
	userAtom
};