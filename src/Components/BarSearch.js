import React from 'react'
import {hotkeys} from 'react-keyboard-shortcuts';

import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import SearchIcon from '@material-ui/icons/Search';
import CircularProgress from '@material-ui/core/CircularProgress';

let inputRef, delayTimer;

function BarSearchComp(props) {
    const [inputValue, setInputValue] = React.useState('');
    const [open, setOpen] = React.useState(false);
    const [options, setOptions] = React.useState([]);
    const [loading, setLoading] = React.useState(false);

    const performSearch = async (searchText) => {
        if (!open || (options.length < 5 && options.length > 0)) return;
        setLoading(true);
        
        const response = await fetch('https://609c739b04bffa001792ceba.mockapi.io/phones?limit=5&name=' + searchText);
        const data = await response.json();
        setOptions(data.data);

        setLoading(false);
    }

    function performSearchDelayed(searchText) {
        clearTimeout(delayTimer);
        delayTimer = setTimeout(() => performSearch(searchText), 1500);
    }

    React.useEffect(() => {
        if (inputValue.length < 4) return undefined;
        performSearchDelayed(inputValue);
    // eslint-disable-next-line
    }, [inputValue]);

    return (
        <Autocomplete
            open={open}
            onOpen={() => setOpen(true)}
            onClose={() => setOpen(false)}
            onInputChange={(event, newInputValue) => setInputValue(newInputValue)}
            getOptionSelected={(option, value) => option.name === value.name}
            getOptionLabel={(option) => option.name}
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