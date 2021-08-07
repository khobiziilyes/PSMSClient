import React from 'react';
import moment from 'moment';

import {
	CheckCircleOutline as CheckCircleOutlineIcon,
	Error as ErrorIcon,
	Warning as WarningIcon,
	Info as InfoIcon
} from '@material-ui/icons';

export function groupBy(collection, property) {
    let i = 0, val, index,
        values = [], result = [];
    for (; i < collection.length; i++) {
        val = collection[i][property];
        index = values.indexOf(val);
        if (index > -1)
            result[index].push(collection[i]);
        else {
            values.push(val);
            result.push([collection[i]]);
        }
    }

    return result;
}

export function getIdFromText(value) {
    return value.substr(value.indexOf('#') + 1);   
}

export function formatTimestamp(value, time = true) {
    return value ? moment.unix(value).format('DD/MM/YYYY' + (time ? ' HH:mm:ss' : '')) : '';
}

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
export const phonesTypes = Object.fromEntries(['Best', 'Better', 'Good', 'Standard', 'Bad', 'Worse', 'Worst'].map((value, i) => [3 - i, value + 'P']));
export const translateDelta = (delta, isPhone) => (isPhone ? phonesTypes : accessoriesTypes)[delta];

export const accessoriesNames = {
	1: 'AntiShock',
	2: 'Glass',
	3: 'AirPods',
	4: 'IDK'
}

export const injectProps = (element, newProps) => React.isValidElement(element) ? React.cloneElement(element, newProps) : null;
export const isFuncExec = (func, data) => func ? func(data) : data;

export const noSubmit = ['TEXTAREA'];