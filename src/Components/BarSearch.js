import React from 'react'
import {hotkeys} from 'react-keyboard-shortcuts';

import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import SearchIcon from '@material-ui/icons/Search';

let inputRef;

const top100Films = [
    { title: 'The Shawshank Redemption', year: 1994 },
    { title: 'The Godfather', year: 1972 },
    { title: 'The Godfather: Part II', year: 1974 },
    { title: 'The Dark Knight', year: 2008 },
    { title: '12 Angry Men', year: 1957 },
    { title: "Schindler's List", year: 1993 },
    { title: 'Pulp Fiction', year: 1994 }
];

class BarSearch extends React.PureComponent {
    hot_keys = {
        'ctrl+,': {
            priority: 1,
            handler: (event) => inputRef.focus()
        }
    }

    render () {
        return (
            <Autocomplete
                id="combo-box-demo"
                options={top100Films}
                getOptionLabel={(option) => option.title}
                style={{ width: 300 }}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        inputRef={input => {
                            inputRef = input;
                        }}
                        placeholder="Search"
                        variant="outlined"
                        InputProps={{
                            ...params.InputProps,
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon />
                                </InputAdornment>
                            ),
                        }}
                    />
                )}
            />
        )
    }
}

export default hotkeys(BarSearch);