import React, { useState } from 'react'
import axios from 'axios';
import withKeys from '@Components/withKeys';

import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import SearchIcon from '@material-ui/icons/Search';
import CircularProgress from '@material-ui/core/CircularProgress';

let inputRef, delayTimer;

function BarSearch({ formatData, formatURL, ...props }) {
    const [inputValue, setInputValue] = useState('');
    const [open, setOpen] = useState(false);
    const [options, setOptions] = useState([]);
    const [loading, setLoading] = useState(false);

    const performSearch = async (query) => {
        if (!open) return;

        setOptions([]);
        setLoading(true);
        
        const { data } = await axios.post(formatURL(query), {query});
        
        setOptions(formatData(data));
        setLoading(false);
    }

    function performSearchDelayed(query) {
        clearTimeout(delayTimer);
        delayTimer = setTimeout(() => performSearch(query), 1500);
    }

    const handleInputChange = (event, newValue) => {
        setInputValue(newValue);
        if (newValue.length > 3) performSearchDelayed(inputValue);
    }

    return (
        <Autocomplete
            open={open}
            onOpen={() => setOpen(true)}
            onClose={() => setOpen(false)}

            options={options}
            loading={loading}
            style={{ width: 300 }}

            onInputChange={handleInputChange}
            renderInput={InputComponent(loading)}

            {...props}
        />
    );
}

const InputComponent = loading => ({ InputProps, ...props }) => 
    <TextField
        {...props}
        
        inputRef={input => inputRef = input}
        placeholder="Search"
        variant="outlined"
        InputProps={{
            ...InputProps,
            startAdornment: (
                <InputAdornment position="start">
                    <SearchIcon />
                </InputAdornment>
            ),
            endAdornment: (
                <>
                    {loading ? <CircularProgress color="inherit" size={20} /> : null}
                    {InputProps.endAdornment}
                </>
            ),
        }}
    />

export default withKeys(BarSearch, {
    'ctrl+,': {
        priority: 1,
        handler: event => inputRef.focus()
    }
});