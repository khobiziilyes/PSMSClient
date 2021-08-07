import React from 'react';
import { Grid, TextField } from '@material-ui/core';

import { accessoriesTypes, phonesTypes } from '@src/Consts';
import Autocomplete from '@material-ui/lab/Autocomplete';

import { LiveSearch } from '@Components';
import ModalWrapper from '@Components/ModalWrapper';
import { BaseButton } from '@Components/ModalWrapper/Buttons';

const ContinueButton = props => (
	<BaseButton {...props}>
		Continue
	</BaseButton>
);

export default function AddItemDialog({ isBuy, addItemToList, closeAddItemDialog, defaultSelectedProduct = null, ...props }) {
	const [selectedItem, setSelectedItem] = React.useState(null);

	const extraButtons = [
		<ContinueButton onClick={() => addItemToList(selectedItem)} disabled={selectedItem === null} />
	];

	const contentProps = { defaultSelectedProduct, setSelectedItem }

	return ModalWrapper(<DialogContent {...contentProps} />, {
		title: 'Add new item',
		handleDialogClose: closeAddItemDialog,
		ShowBaseButtons: false,
		maxWidth: 'sm',
		extraButtons,
		...props
	});
}

function DialogContent({ defaultSelectedProduct, setSelectedItem }) {
	const [selectedProduct, setSelectedProduct] = React.useState(defaultSelectedProduct);

	const setFormatedSelectedItem = theItem => 
		setSelectedItem({
			...selectedProduct,
			...theItem,
			productId: selectedProduct.id
		});

	const { isPhone, items } = selectedProduct || {};
	
	const deltaList = isPhone ? phonesTypes : accessoriesTypes;
	const deltaLabel = 'Select the ' + (isPhone ? 'version' : 'quality');

	return (
		<Grid container spacing={3}>
			<Grid item xs={12}>
				<LiveSearch
					formatURL={query => '/search/items/all'}
					withItems
					getOptionLabel={option => option.name}
					getOptionSelected={(option, value) => option.id === value.id}
					onChange={(event, value) => setSelectedProduct(value)}
					defaultValue={defaultSelectedProduct}
				/>
			</Grid>

			<Grid item xs={12}>
				{ 
					selectedProduct && <Autocomplete
						key={'selectItemAutoComplete-' + selectedProduct.id + (isPhone * 1)}
						label={deltaLabel}
						options={items}
						getOptionLabel={option => deltaList[option.delta]}
						onChange={(event, value) => setFormatedSelectedItem(value)}
						renderInput={params => <TextField {...params} variant="outlined" placeholder={deltaLabel} />}
					/>
				}
			</Grid>
		</Grid>
	);
}