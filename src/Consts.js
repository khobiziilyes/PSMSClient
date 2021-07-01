import {
	CheckCircleOutline as CheckCircleOutlineIcon,
	Error as ErrorIcon,
	Warning as WarningIcon,
	Info as InfoIcon
} from '@material-ui/icons';

export const queryClientOptions = {
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
			placeholderData: [],
			staleTime: 0.5 * 60 * 1000,
			refetchInterval: 0.5 * 60 * 1000,
			cacheTime: 5 * 60 * 1000
		}
	}
};

const iconsProps = {
	fontSize: "large",
	style: {
		marginRight: 20
	}
}

export const snackBarOptions = {
	iconVariant: {
        success: <CheckCircleOutlineIcon {...iconsProps} />,
        error: <ErrorIcon {...iconsProps} />,
        warning: <WarningIcon {...iconsProps} />,
        info: <InfoIcon {...iconsProps} />
    },
    maxSnack: 8
}

export const accessoriesTypes = Object.fromEntries(['Best', 'Better', 'Good', 'Standard', 'Bad', 'Worse', 'Worst'].map((value, i) => [3 - i, value]));
export const phonesTypes = Object.fromEntries(['Best', 'Better', 'Good', 'Standard', 'Bad', 'Worse', 'Worst'].map((value, i) => [3 - i, (3 - i).toString()]));

export const accessoriesNames = {
	1: 'AntiShock',
	2: 'Glass',
	3: 'AirPods',
	4: 'IDK'
}