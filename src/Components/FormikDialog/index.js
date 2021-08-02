import React from 'react';

import { useHistory } from "react-router-dom";
import { useSnackbar } from 'notistack';
import { useQueryClient } from 'react-query'
import { Formik, Form } from 'formik';

import { useRecoilState } from 'recoil';
import { formDialogParamsAtom } from '@src/Atoms';

import * as Pages from '@src/Pages';
import buildOnSubmit from './onSubmit';
import TheDialog from './TheDialog';

export default function FormikWrapper() {
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
	
	const dialogProps = {
		title: formikParams.title || ((isCreate ? 'Create' : 'Edit') + ' - ' + formDialogName),
		open: isOpened,
		handleDialogClose: closeFormDialog,
		formSize: formikParams.formSize,
	}

	return (
		<Formik {...formikProps}>
			{
				formikBag => 
					<TheForm
						dialogProps={{ ...dialogProps, formikBag }}
						isCreate={isCreate}
						formikBag={formikBag}
						{...injectedProps}
					/>
			}
		</Formik>
	);
}

export const TheFormWrapper = Content => ({ dialogProps, ...props }) => (
	<TheDialog {...dialogProps}>
		<Form>
			<Content {...props} />
		</Form>
	</TheDialog>
);