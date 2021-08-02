import React from 'react';

import { useHistory } from "react-router-dom";
import { useSnackbar } from 'notistack';
import { useQueryClient } from 'react-query'
import { Formik } from 'formik';

import { useRecoilState } from 'recoil';
import { formDialogParamsAtom } from '@src/Atoms';

import * as Pages from '@src/Pages';

import TheDialog from './TheDialog';
import buildOnSubmit from './onSubmit';

export default function FormikDialog() {
	const history = useHistory();
	const queryClient = useQueryClient();
	const { enqueueSnackbar } = useSnackbar();
	
	const [formDialogParams, setFormDialogParams] = useRecoilState(formDialogParamsAtom);
	const { name: formDialogName, isOpened, initialValues: formDialogInitialValues, injectedProps = {} } = formDialogParams;

	if (!formDialogName) return null;
	
	const { formikParams, TheForm } = Pages[formDialogName + 'Form'];

	const closeFormDialog = () => setFormDialogParams({ isOpened: false });
	const showNotification = (child, variant = 'success') => enqueueSnackbar(child, { variant });
	const redirectTo = (pathname, state) => 
		history.push({
			pathname,
			state,
		});

	const invalidateQueries = URL => queryClient.invalidateQueries();
	
	const { id, ...initialValues } = formDialogInitialValues || formikParams.initialValues;
	
	const isCreate = !id;

	const onSubmit = buildOnSubmit({
		initialId : id || null,
		invalidateQueries,
		closeFormDialog,
		redirectTo,
		showNotification,
		formikParams
	});

	const { validationSchema, formatInitialValues } = formikParams;

	const formikProps = {
		enableReinitialize: true,
		onSubmit: formikParams.onSubmit || onSubmit,
		validationSchema,
		initialValues: isCreate ? initialValues : ( formatInitialValues ? formatInitialValues(initialValues) : initialValues )
	}
	
	const DialogComponent = formikBag => {
		const dialogProps = {
			isCreate,
			formikBag,
			title: formikParams.title || (isCreate ? 'Create' : 'Edit'),
			isOpened,
			closeFormDialog,
			formSize: formikParams.formSize,
		}

		if (formikParams.selfDialog) return (
			<TheForm {...injectedProps} isCreate={isCreate} formikBag={formikBag} dialogProps={dialogProps} />
		);

		return (
			<TheDialog {...dialogProps} >
				<TheForm {...injectedProps} isCreate={isCreate} />
			</TheDialog>
		);
	}

	return (
		<Formik {...formikProps}>
			{ DialogComponent }
		</Formik>
	);
}