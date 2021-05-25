import { atom } from 'recoil';

const drawerIsOpenedAtom = atom({
    key: 'drawerIsOpenedAtom',
    default: false
});

const dialogIsOpenedAtom = atom({
	key: 'dialogIsOpenedAtom',
	default: false
});

const dialogSelectedFormAtom = atom({
	key: 'dialogSelectedFormAtom',
	default: 'Customer'
});

const userAtom = atom({
    key: 'user',
    default: {name: 'A', email: 'B'}
});


export { drawerIsOpenedAtom, dialogIsOpenedAtom, dialogSelectedFormAtom, userAtom };