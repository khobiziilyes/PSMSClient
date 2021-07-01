import React, { useState } from 'react'
import axios from 'axios';
import withKeys from '@Components/withKeys';

import Autocomplete from '@material-ui/lab/Autocomplete';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import CircularProgress from '@material-ui/core/CircularProgress';

import FormikAutoComplete from './Autocomplete';

let inputRef, delayTimer;

const BuildInputComponentProps = loading => ({ InputProps: { startAdornment, endAdornment, ...InputProps }, ...params }) => ({
    ...params,
    variant: 'outlined',
    placeholder: 'Redmi Mi 9T',
    
    inputRef: input => inputRef = input,
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

export default function LiveSearch({ formatURL, withItems = false, formatQuery = null, formatData = null, component = null, ...props }) {
    const [open, setOpen] = useState(false);
    const [options, setOptions] = useState([]);
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

    function performSearchDelayed(query) {
        clearTimeout(delayTimer);
        delayTimer = setTimeout(() => performSearch(query), 1000);
    }

    const onInputChange = (event, newValue) => (newValue.length > 2) && performSearchDelayed(newValue);

    return React.createElement(component || Autocomplete, {
        open,
        options,
        loading,
        onInputChange,

        onOpen: () => setOpen(true),
        onClose: () => setOpen(false),

        ...(component ?
            { renderInputExtraProps: BuildInputComponentProps(loading) } :
            { renderInput: params => <TextField {...BuildInputComponentProps(loading)(params)} /> }
        ),
        
        ...props
    });
}

export const FormikLiveSearch = (props) => {
    return (
        <LiveSearch
            {...props}
            component={FormikAutoComplete}
        />
    );
}

export const LiveSearchWithKeys = withKeys(LiveSearch, {
    'ctrl+,': {
        priority: 1,
        handler: event => inputRef.focus()
    }
});