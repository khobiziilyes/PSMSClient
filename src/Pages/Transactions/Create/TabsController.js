import React from 'react';
import { Phone as PhoneIcon, EmojiObjects, AttachMoney } from '@material-ui/icons';

import { translateDelta } from '@src/Consts';
import { Tabs } from '@Components';

import { ProductItemTabContent, CheckoutTabContent } from './ItemsPanel';
import AddItemDialog from './AddItemDialog';

const CheckoutTab = isBuy => ({
	Title: 'Checkout',
	Icon: <AttachMoney />,
	Content: <CheckoutTabContent isBuy={isBuy} />
});

const TabsController = ({ defaultSelectedProduct, closeAddItemDialog, isBuy, addItemDialogOpened, helpers }) => {
	const { push, remove, form: { values } } = helpers;

	const addItemToList = newItem => {
		const { id, isPhone, delta, name, currentQuantity, defaultPrice: costPerItem } = newItem;

		const TabProps = {
			removeItem: remove,
			isBuy
		}

		const formatedItem = {
			id,

			Title: name + ' - ' + translateDelta(delta, isPhone),
			Icon: isPhone ? <PhoneIcon /> : <EmojiObjects />,
			Content: <ProductItemTabContent {...TabProps} />,
			
			currentQuantity,
			costPerItem,
			Quantity: 1
		}

		push(formatedItem);

		closeAddItemDialog();
	}

	const AddItemDialogProps = {
		defaultSelectedProduct,
		isBuy,
		addItemToList,
		closeAddItemDialog,
		open: addItemDialogOpened
	}

	const tabsList = values?.items?.length ? [...values.items, CheckoutTab(isBuy)] : [];

	const tabsProps = {
		tabsList,
		additionalProps: { items: values.items},
		minus: -2
	}

	return (
		<>
			<AddItemDialog {...AddItemDialogProps} />
			<Tabs {...tabsProps} />
		</>
	);
}

export default TabsController;