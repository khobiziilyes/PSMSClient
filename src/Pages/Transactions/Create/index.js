
import React from 'react';
import { FieldArray } from 'formik';

import { Button } from '@material-ui/core';

import withKeys from '@Components/withKeys';
import { groupBy } from '@src/Consts';
import { TheFormikWrapper, DialogWrapper } from '@Components/FormikDialog/Wrappers';

import TabsController from './TabsController';

const formatParams = isBuy => ({ values }) => {
	const { items, person: { id: person_id }, notes } = values;
	const groupedItems = groupBy(items, 'id');
	
	const cart = groupedItems.map(group => ({
		item_id: group[0].id,
		list: group.map(item => ({
			costPerItem: parseInt(item.costPerItem),
			Quantity: parseInt(item.Quantity)
		}))
	}));

	const data = {
		person_id,
		cart,
		notes
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

const AddItemButton = ({ openAddItemDialog, withRef, ...props }) => (
	<Button onClick={openAddItemDialog} {...props} ref={withRef} variant="outlined" >
		Item
	</Button>
);

const AddItemButtonWithKeys = withKeys(AddItemButton, '+', ({ element }) => element.click() || true);

function Content({ dialogProps, formikBag, isBuy, defaultSelectedProduct = null }) {
	const [addItemDialogOpened, setAddItemDialogOpened] = React.useState(true);
	const closeAddItemDialog = () => setAddItemDialogOpened(false);
	
	const finalDialogProps = {
		...dialogProps,
		formikBag,
		title: 'Perform new transaction',
		maxWidth: 'md',
		extraButtons: [<AddItemButtonWithKeys openAddItemDialog={() => setAddItemDialogOpened(true)} />]
	}

	const FieldArrayChildProps = {
		defaultSelectedProduct,
		closeAddItemDialog,
		isBuy,
		addItemDialogOpened
	}

	return (
		<DialogWrapper {...finalDialogProps}>
			<FieldArray name="items" component={helpers => <TabsController {...FieldArrayChildProps} helpers={helpers} />} />
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

export { BuyForm, SellForm }