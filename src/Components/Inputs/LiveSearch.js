import React, { useState } from 'react'
import axios from 'axios';
import withKeys from '@Components/withKeys';

import Autocomplete from '@material-ui/lab/Autocomplete';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import CircularProgress from '@material-ui/core/CircularProgress';

import FormikAutoComplete from './Autocomplete';

const BuildInputComponentProps = (withRef = null, loading, placeholder, performSearchOnDemand) => ({ InputProps: { startAdornment, endAdornment, ...InputProps }, ...params }) => ({
    ...params,
    variant: 'outlined',
    placeholder,
    onKeyDown: e => {
        if (e.keyCode === 13) {
            e.preventDefault();
            performSearchOnDemand(e.target.value);
        }
    },
    ...(withRef ? { inputRef: withRef } : {}),
    InputProps: {
        ...InputProps,
        startAdornment: (
            <>
                {InputProps.startAdornment}
                <InputAdornment position="start">
                    <SearchIcon />
                </InputAdornment>
            </>
        ),
        endAdornment: (
            <>
                {InputProps.endAdornment}
                {loading && <CircularProgress color="inherit" size={20} />}
            </>
        )
    }
});

export default function LiveSearch({ withRef = null, formatURL, placeholder = 'Redmi Mi 9T', minLength = 3, defaultOptions = [], withItems = false, formatQuery = null, formatData = null, component = null, ...props }) {
    const [open, setOpen] = useState(false);
    const [options, setOptions] = useState(defaultOptions);
    const [loading, setLoading] = useState(false);

    const performSearch = query => {
        if (!open) return;

        setLoading(true);
        
        const formatedURL = formatURL(query);
        const formatedQuery = formatQuery ? formatQuery(query) : { query, items: withItems };

        axios.post(formatedURL, formatedQuery).then(({ data }) => {
            const formatedData = formatData ? formatData(data) : data;
            setOptions(formatedData);
        }).finally(() => setLoading(false));
    }

    const performSearchOnDemand = query => query && (query.length >= minLength) && performSearch(query);
    const inputComponentProps = BuildInputComponentProps(withRef, loading, placeholder, performSearchOnDemand);

    return React.createElement(component || Autocomplete, {
        open,
        options,
        loading,

        onOpen: () => setOpen(true),
        onClose: () => setOpen(false),
        disableClearable: true,
        
        ...(component ?
            { renderInputExtraProps: inputComponentProps } :
            { renderInput: params => <TextField {...inputComponentProps(params)} /> }
        ),
        
        ...props
    });
}

export const FormikLiveSearch = props => {
    return (
        <LiveSearch
            {...props}
            component={FormikAutoComplete}
        />
    );
}

export const LiveSearchWithKeys = withKeys(LiveSearch, '/', ({ element }) => element.focus() || true);