import { Formik, Form } from 'formik';
import ModalWrapper from '@Components/ModalWrapper';
import { isFuncExec, injectProps } from '@src/Consts';
import buildOnSubmit from './onSubmit';

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

export const TheFormikWrapper = (Content, validationSchema, initialValues, formatParams, formatInitialValues = null, extraHandle = null) => ({ isCreate, formDialogInitialValues, onSubmitParams, ...props }) => {
	const finalInitialValues = isCreate ? initialValues : isFuncExec(formatInitialValues, formDialogInitialValues);

	const formikProps = {
		validationSchema,
		onSubmit: buildOnSubmit({
			...onSubmitParams,
			formatParams,
			extraHandle
		}),
		initialValues: finalInitialValues
	}

	const contentProps = {
		isCreate,
		initialValues: finalInitialValues,
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

export const FinalWrapper = (Content, validationSchema, initialValues, formatParams, extra = {}, formatInitialValues = null) => 
	TheFormikWrapper(
		TheFormWrapper(<Content {...extra} />),
		validationSchema,
		initialValues,
		formatParams(extra),
		formatInitialValues
	);