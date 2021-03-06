import React from 'react';
import * as Yup from 'yup';

import Grid from '@material-ui/core/Grid';
import Autocomplete from '@Components/Inputs/Autocomplete';
import Notes from '@Components/Inputs/Notes';
import Text from '@Components/Inputs/Text';

import { accessoriesNames } from '@src/Consts';
import { FinalWrapper } from '@Components/FormikDialog/Wrappers';

const formatParams = () => () => ({
	baseURL: '/accessories'
});

const initialValues = {
	name: '',
	brand: '',
	type_id: 1,
	notes: '',
	is_public: false
}

const validationSchema = Yup.object({
	name: Yup.string().min(1).required('Required'),
	brand: Yup.string().min(5),
	type_id: Yup.number('Required').required('Required'),
	notes: Yup.string().min(8)
})

function FormContent({ formikBag: { isSubmitting }, isCreate }) {
	return (
	   <Grid container spacing={3}>
			<Grid item xs={4}>
				<Autocomplete 
					name="type_id"
					label="Accessory type"
					options={Object.keys(accessoriesNames)}
					getOptionLabel={option => accessoriesNames[option] || ''}
					disabled={!isCreate}
				/>
			</Grid>

			<Grid item xs={4}>
				<Text
					name="name"
					label="Accessory name"
				/>
			</Grid>

			<Grid item xs={4}>
				<Text
					name="brand"
					label="Accessory brand"
				/>
			</Grid>

			<Grid item xs={12}>
				<Notes />
			</Grid>
		</Grid>
	);
}

const AccessoryForm = FinalWrapper(FormContent, validationSchema, initialValues, formatParams);
export default AccessoryForm;