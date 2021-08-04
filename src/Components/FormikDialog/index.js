import React from 'react';

import { useHistory } from "react-router-dom";
import { useSnackbar } from 'notistack';
import { useQueryClient } from 'react-query'

import { useRecoilState } from 'recoil';
import { formDialogParamsAtom } from '@src/Atoms';

import * as Forms from '@src/Pages/Forms';

export default function FormikWrapper() {
	const history = useHistory();
	const queryClient = useQueryClient();
	const { enqueueSnackbar } = useSnackbar();
	
	const [formDialogParams, setFormDialogParams] = useRecoilState(formDialogParamsAtom);
	const { name: formDialogName, isOpened, initialValues, injectedProps = {} } = formDialogParams;

	if (!formDialogName) return null;

	const TheForm = Forms[formDialogName + 'Form'];
	
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