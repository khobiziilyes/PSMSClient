import React from 'react';
import * as Yup from 'yup';

import Grid from '@material-ui/core/Grid';
import Notes from '@Components/Inputs/Notes';
import Text from '@Components/Inputs/Text';
import { TheFormWrapper, TheFormikWrapper } from '@Components/FormikDialog';

const formatParams = isVendor => ({ URL, values, isCreate, initialId }) => {
	return {
		finalURL: '/customers/' + (isCreate ? '' : initialId),
		finalValues: values,
		finalTableRoute: '/customers',
		finalTesting: false
	}
}

const validationSchema = Yup.object({
	name: Yup.string().required('Must be not empty'),
	phone1: Yup.number().required('This field is required.').typeError('Must be numeric'),
	phone2: Yup.string(),
	fax: Yup.string(),
	address: Yup.string()
});

const initialValues = {
	name: '',
	phone1: '',
	phone2: '',
	fax: '',
	address: '',
	notes: ''
}

function FormContent({ isVendor, formikBag, isCreate, initialValues, onSubmitParams }) {
	return (	
		<Grid container spacing={3}>
			<input type="hidden" value={isVendor ? '1' : '0'} />
			
			<Grid item xs={12} sm={12}>
				<Text name="name" label="Full name" />
			</Grid>

			<Grid item xs={12} sm={4}>
				<Text name="phone1" label="Phone number 1" />
			</Grid>

			<Grid item xs={12} sm={4}>
				<Text name="phone2" label="Phone number 2" />
			</Grid>

			<Grid item xs={12} sm={4}>
				<Text name="fax" label="Fax" />
			</Grid>

			<Grid item xs={12}>
				<Text name="address" label="Address line" />
			</Grid>

			<Grid item xs={12}>
				<Notes />
			</Grid>
		</Grid>
	);
}

const TheForm = isVendor =>
	TheFormikWrapper(
		TheFormWrapper(<FormContent isVendor={isVendor} />),
		validationSchema,
		initialValues,
		formatParams(isVendor)
	);

export const VendorForm = TheForm(true);
export const CustomerForm = TheForm(false);