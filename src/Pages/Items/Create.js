import React from 'react';
import * as Yup from 'yup';
import Grid from '@material-ui/core/Grid';

import Autocomplete from '@Components/Inputs/Autocomplete';
import Notes from '@Components/Inputs/Notes';
import Text from '@Components/Inputs/Text';
import MaskedInput from '@Components/Inputs/MaskedInput';

import { FormikLiveSearch } from '@Components/Inputs/LiveSearch';
import { accessoriesTypes, phonesTypes } from '@src/Consts';

import { FinalWrapper } from '@Components/FormikDialog/Wrappers';

const formatParams = () => ({ values: { product: { isPhone, id }, ...data } }) => ({
    method: 'POST',
    URL: '/items/' + (isPhone ? 'phone' : 'accessory') + '/' + id,
    tableRoute: 'items' + (isPhone ? 'Phones' : 'Accessories'),
    data
});

const initialValues = {
    product: null,
    delta: 0,
    currentQuantity: 0,
    defaultPrice: 1000,
    notes: ''
}

const validationSchema = Yup.object({
    product: Yup.object().required('Required Nigga'),
    delta: Yup.number().required('Required'),
    currentQuantity: Yup.number().min(0).required('Required'),
    defaultPrice: Yup.number().min(0).required('Required')
});

function FormContent({ isCreate, formikBag: { values: { product }, isSubmitting } }) {
    const [selectedProduct, setSelectedProduct] = React.useState(product ?? null);
    const { isPhone } = selectedProduct || {};

    const deltaList = isPhone ? phonesTypes : accessoriesTypes;

	return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
            	<FormikLiveSearch
                    name="product"
                    formatURL={query => '/search/products/all'}
                    getOptionLabel={option => option.name ?? ''}
                    getOptionSelected={(a, b) => a.id === b.id}
                    onItemChange={setSelectedProduct}
                    defaultOptions={selectedProduct ? [selectedProduct] : []}
                />
            </Grid>

            {selectedProduct &&
                <>
                    <Grid item xs={4}>
                    	<Autocomplete
                            name="delta"
                            label={"Select the " + (isPhone ? 'version' : 'quality')}
                            options={Object.keys(deltaList)}
                            getOptionLabel={option => deltaList[option]}
                            disabled={!isCreate}
                        />
                    </Grid>
                    
        			<Grid item xs={4}>
                    	<Text name="currentQuantity" label="Current quantity" />
                    </Grid>

                    <Grid item xs={4}>
                    	<MaskedInput name="defaultPrice" label="Default price" />
                    </Grid>

                    <Grid item xs>
                        <Notes />
                    </Grid>
                </>
            }
        </Grid>
	);
}

const formatInitialValues = ({ itemable, isPhone, delta, currentQuantity, defaultPrice, notes }) => ({
    product: { ...itemable, isPhone },
    delta,
    currentQuantity,
    defaultPrice,
    notes
});

const ItemForm = FinalWrapper(FormContent, validationSchema, initialValues, formatParams, {}, formatInitialValues);
export default ItemForm;