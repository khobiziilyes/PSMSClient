import Text from './Text';
import NumberFormat from 'react-number-format';

function NumberFormatCustom({ inputRef, onMaskChange, setFieldValue, ...props }) {
	const newProps = {
        isNumericString: true,
        allowNegative: false,
        suffix: ' DA',
        thousandSeparator: true,
        thousandsGroupStyle: 'wan',
    	getInputRef: inputRef,
        ...props,
        ...(setFieldValue ? {
	        	onValueChange: values => {
                    onMaskChange && onMaskChange(values);
                    setFieldValue(props.name, values.value);
                }
    		} : {}
    	)
    }

    return (<NumberFormat {...newProps} />);
}

const TextMask = ({ maskProps = {}, onMaskChange, ...props }) => {
	return (
		<Text
			{...props}
			InputProps={{ inputComponent: NumberFormatCustom }}
			inputProps={{ ...maskProps, onMaskChange }}
			selfSetValue
		/>
	);
}

export default TextMask;