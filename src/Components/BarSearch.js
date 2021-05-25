import React from 'react'
import {hotkeys} from 'react-keyboard-shortcuts';

import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import SearchIcon from '@material-ui/icons/Search';
import CircularProgress from '@material-ui/core/CircularProgress';

let inputRef, delayTimer;

function BarSearchComp({ formatData, formatURL, ...props }) {
    const [inputValue, setInputValue] = React.useState('');
    const [open, setOpen] = React.useState(false);
    const [options, setOptions] = React.useState([]);
    const [loading, setLoading] = React.useState(false);

    const performSearch = async (query) => {
        if (!open) return;
        setLoading(true);
        
        const response = await fetch(formatURL(query), {
            method: 'POST',
            body: JSON.stringify({query}),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });

        const data = await response.json();
        
        setOptions(formatData(data));
        setLoading(false);
    }

    function performSearchDelayed(query) {
        clearTimeout(delayTimer);
        delayTimer = setTimeout(() => performSearch(query), 1500);
    }

    React.useEffect(() => {
        if (inputValue.length < 3) return undefined;
        performSearchDelayed(inputValue);
    // eslint-disable-next-line
    }, [inputValue]);

    return (
        <Autocomplete
            open={open}
            onOpen={() => setOpen(true)}
            onClose={() => setOpen(false)}
            onInputChange={(event, newInputValue) => setInputValue(newInputValue)}
            options={options}
            loading={loading}
            style={{ width: 300 }}
            renderInput={(params) => (
                <TextField
                    {...params}
                    inputRef={input => inputRef = input}
                    placeholder="Search"
                    variant="outlined"
                    InputProps={{
                        ...params.InputProps,
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                        endAdornment: (
                            <>
                                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                {params.InputProps.endAdornment}
                            </>
                        ),
                    }}
                />
            )}
            {...props}
        />
    );
}

class BarSearch extends React.PureComponent {
    hot_keys = {
        'ctrl+,': {
            priority: 1,
            handler: (event) => inputRef.focus()
        }
    }

    render() { return <BarSearchComp {...this.props} />; }
}

export default hotkeys(BarSearch);