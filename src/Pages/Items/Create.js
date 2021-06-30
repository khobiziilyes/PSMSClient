import React from 'react';
import * as Yup from 'yup';

import Grid from '@material-ui/core/Grid';
import Autocomplete from '@Components/Inputs/Autocomplete';
import Notes from '@Components/Inputs/Notes';
import Text from '@Components/Inputs/Text';

import { FormikLiveSearch } from '@Components/Inputs/LiveSearch';
import ItemToggle from '@Components/ItemToggle';
import { accessoriesTypes, phonesTypes } from '@src/Consts';

const formikParams = {
    URL: (initialId, isCreate, { product: { isPhone, id } }) => '/items/' + (isPhone ? 'phone' : 'accessory') + '/' + id,
    formatData: ({ product, ...data }) => {
        return data
    },
    tableRoute: ({ product: { isPhone } }) => 'items' + (isPhone ? 'Phones' : 'Accessories'),
    initialValues: {
        product: {},
        delta: 0,
        currentQuantity: 0,
        defaultPrice: 0,
        notes: ''
    },
    validationSchema: Yup.object({
        product: Yup.object().required('Required Nigga'),
        delta: Yup.number().required('Required'),
        currentQuantity: Yup.number().min(0).required('Required'),
        defaultPrice: Yup.number().min(0).required('Required')
    })
}

function TheForm({ isSubmitting }) {
	const [itemType, handleItemTypeChange] = React.useState('accessory');
    const isPhone = itemType === 'phone';

    const deltaList = isPhone ? phonesTypes : accessoriesTypes;

	return (
        <Grid container spacing={3}>
            <Grid item xs={12} style={{textAlign: 'center'}}>
				<ItemToggle callBack={handleItemTypeChange} value={itemType} />
            </Grid>

			<Grid item xs={12}>
            	<FormikLiveSearch
                    name="product"
                    formatURL={query => "/search/" + itemType}
                    getOptionLabel={option => option.name}
                    getOptionSelected={(option, value) => option.id === value.id}
                    key={'createItem-' + itemType}
                />
            </Grid>

            <Grid item xs={4}>
            	<Autocomplete
                    name="delta"
                    label={"Select the " + (isPhone ? 'version' : 'quality')}
                    options={Object.keys(deltaList)}
                    getOptionLabel={option => deltaList[option]}
                />
            </Grid>
            
			<Grid item xs={4}>
            	<Text name="currentQuantity" label="Current quantity" />
            </Grid>

            <Grid item xs={4}>
            	<Text name="defaultPrice" label="Default price" />
            </Grid>

            <Grid item xs>
                <Notes />
            </Grid>
        </Grid>
	);
}

export {
    formikParams,
    TheForm
}