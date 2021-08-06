import React from 'react';
import { Button } from '@material-ui/core';

import { useFormikContext, FieldArray } from 'formik';
import { TheFormikWrapper, DialogWrapper } from '@Components/FormikDialog/Wrappers';

import AddItemDialog from './AddItemDialog';
import { ProductItemTabContent, CheckoutTabContent } from './ItemsPanel';
import { Tabs } from '@Components';

import { Phone as PhoneIcon, AttachMoney } from '@material-ui/icons';
import { groupBy } from '@src/Consts';

const AddItemButton = ({ openAddItemDialog, ...props }) => (
	<Button onClick={openAddItemDialog} {...props}>
		Item
	</Button>
);

const formatParams = isBuy => ({ values }) => {
	const groupedItems = groupBy(values.items, 'id');
			
	const cart = groupedItems.map(group => ({
		item_id: group[0].id,
		list: group.map(item => ({
			costPerItem: parseInt(item.costPerItem),
			Quantity: parseInt(item.Quantity)
		}))
	}));

	const data = {
		person_id: values.person.id,
		cart,
		notes: values.notes
	}

	return {
		baseURL: '/' + (isBuy ? 'buy' : 'sell'),
		data
	}
}

const initialValues = isBuy => ({
	items: [],
	person: {
		id: isBuy ? 2 : 1,
		name: 'UNKNOWN'
	},
	notes: ''
});

const CheckoutTab = isBuy => ({
	Title: 'Checkout',
	Icon: <AttachMoney />,
	Content: <CheckoutTabContent isBuy={isBuy} />
})

const FieldArrayChild = ({ defaultSelectedProduct, closeAddItemDialog, isBuy, addItemDialogOpened, arrayHelpers: { push, remove }}) => {
	const { isSubmitting, values } = useFormikContext();
	const [currentTab, setCurrentTab] = React.useState(0);

	const addItemToList = newItem => {
		const TabProps = {
			removeItem: remove,
			isSubmitting,
			isBuy
		}
		
		const formatedItem = {
			id: newItem.id,
			Title: newItem.name + ' - ' + newItem.delta,
			Icon: newItem.isPhone ? <PhoneIcon /> : null,
			currentQuantity: newItem.currentQuantity,
			Content: <ProductItemTabContent {...TabProps} />,
			costPerItem: newItem.defaultPrice,
			Quantity: 1
		}

		setCurrentTab(values.items.length);
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

	const tabsList = (values.items && values.items.length) ? [...values.items, CheckoutTab(isBuy)] : [];

	const itemsPanelProps = {
		tabsList,
		currentTab,
		setCurrentTab,
		additionalProps: { items: values.items}
	}

	return (
		<>
			<AddItemDialog {...AddItemDialogProps} />
			<Tabs {...itemsPanelProps} />
		</>
	);
}

function Content({ dialogProps, formikBag, isBuy, isCreate, defaultSelectedProduct = null }) {
	const [addItemDialogOpened, setAddItemDialogOpened] = React.useState(true);
	const closeAddItemDialog = () => setAddItemDialogOpened(false);
	
	const finalDialogProps = {
		...dialogProps,
		formikBag,
		title: 'Perform new transaction',
		maxWidth: 'md',
		extraButtons: [<AddItemButton openAddItemDialog={() => setAddItemDialogOpened(true)} />]
	}

	return (
		<DialogWrapper {...finalDialogProps}>
			<FieldArray name="items">
				{
					arrayHelpers => {
						const FieldArrayChildProps = {
							defaultSelectedProduct,
							arrayHelpers,
							closeAddItemDialog,
							isBuy,
							addItemDialogOpened
						}

						return <FieldArrayChild {...FieldArrayChildProps} />;
					}
				}
			</FieldArray>
		</DialogWrapper>
	);
}

const theForm = isBuy => TheFormikWrapper(
	props => <Content isBuy={isBuy} {...props} />,
	null,
	initialValues(isBuy),
	formatParams(isBuy)
);

const BuyForm = theForm(true);
const SellForm = theForm(false);

export {
	BuyForm,
	SellForm
}