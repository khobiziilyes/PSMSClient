import React from 'react';

import { useHistory } from "react-router-dom";
import { useSnackbar } from 'notistack';
import { useQueryClient } from 'react-query'
import { Formik, Form } from 'formik';

import { useRecoilState } from 'recoil';
import { formDialogParamsAtom } from '@src/Atoms';
import buildOnSubmit from './onSubmit';

import { injectProps } from '@src/Consts';
import ModalWrapper from '@Components/ModalWrapper';

import * as Pages from '@src/Pages';

export default function FormikWrapper() {
	const history = useHistory();
	const queryClient = useQueryClient();
	const { enqueueSnackbar } = useSnackbar();
	
	const [formDialogParams, setFormDialogParams] = useRecoilState(formDialogParamsAtom);
	const { name: formDialogName, isOpened, initialValues, injectedProps = {} } = formDialogParams;

	if (!formDialogName) return null;

	const TheForm = Pages[formDialogName + 'Form'];
	
	const closeFormDialog = () => setFormDialogParams({ isOpened: false });
	const showNotification = (child, variant = 'success') => enqueueSnackbar(child, { variant });
	const invalidateQueries = () => queryClient.invalidateQueries();
	const redirectTo = history.push;
	
	const { id, ...formDialogInitialValues } = initialValues;
	
	const isCreate = !id;

	const onSubmitParams = {
		initialId : id,
		isCreate,
		invalidateQueries,
		closeFormDialog,
		redirectTo,
		showNotification
	}

	const dialogProps = {
		title: (isCreate ? 'Create' : 'Edit') + ' - ' + formDialogName,
		open: isOpened,
		handleDialogClose: closeFormDialog
	}

	return (
		<TheForm
			dialogProps={dialogProps}
			isCreate={isCreate}
			formDialogInitialValues={formDialogInitialValues}
			onSubmitParams={onSubmitParams}
			{...injectedProps}
		/>
	);
}

export const DialogWrapper = ({ formSize, children, formikBag: { submitForm, isSubmitting }, ...props }) => {
    const wrapperProps = {
    	disabled: isSubmitting,
    	handleSubmitButton: submitForm,
        maxWidth: formSize || 'sm',

        ...props
    }

    return ModalWrapper(<Form>{ children }</Form>, wrapperProps);
}

export const TheFormWrapper = Content => ({ dialogProps, formikBag, ...props }) => {
	return (
		<DialogWrapper {...dialogProps} formikBag={formikBag}>
			{ injectProps(Content, { formikBag, ...props }) }
		</DialogWrapper>
	);
}

export const TheFormikWrapper = (Content, validationSchema, initialValues, formatParams) => ({ isCreate, formDialogInitialValues, onSubmitParams, ...props }) => {
	const formikProps = {
		validationSchema,
		onSubmit: buildOnSubmit({
			...onSubmitParams,
			formatParams
		}),
		initialValues: isCreate ? initialValues : formDialogInitialValues
	}

	const contentProps = {
		isCreate,
		...props
	}

	return (
		<Formik {...formikProps}>
			{
				formikBag =>
					<Content formikBag={formikBag} {...contentProps} />
			}
		</Formik>
	);
}