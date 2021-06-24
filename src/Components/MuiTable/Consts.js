import React from 'react';
import axios from 'axios';
import { DialogActions, Dialog, DialogTitle, DialogContentText, DialogContent as MuiDialogContent } from '@material-ui/core';
import { CircularProgress, Typography, Button, FormControl } from '@material-ui/core';

import { DatePicker } from "@material-ui/pickers";

import ClearIcon from "@material-ui/icons/Clear";
import { IconButton } from "@material-ui/core";

let tableSearchDelayTimer;

const defaultOptions = {
    print: false,
    filter: true,
    filterType: 'textField',
    confirmFilters: true,
    selectableRows: 'none',
    responsive: 'vertical',
    serverSide: true,
    rowsPerPageOptions: [5, 7, 10, 30],
    sortThirdClickReset: true,
    enableNestedDataAccess: '.',
    download: false,

    customFilterDialogFooter: (currentFilterList, applyNewFilters) => <FilterDialogFooter applyNewFilters={applyNewFilters} />,
}

const performServerDelete = (URL, id) => axios.delete(URL + '/' + id, ).then((response) => response.data);

const performServerRequest = (URL, page, perPage, searchFilter, filterList, columnSort, initialFilters, columnsFilterNames, filterValueFormaters) => 
    axios.get(URL, {
        params: {
            page,
            perPage,
            orderBy: columnSort.columnName,
            dir: columnSort.direction,
            ...initialFilters,
            ...(searchFilter ? {search: searchFilter} : []),
            ...Object.fromEntries(
                filterList.flatMap((filterValues, columnIndex) => {
                    if (!filterValues.length) return [null];
                    
                    const filterValueFormater = filterValueFormaters[columnIndex];
                    
                    return columnsFilterNames[columnIndex].map((filterName, i) => {
                        let filterValue = filterValues[i];
                        filterValue = filterValueFormater ? filterValueFormater(filterValue) : filterValue;

                        if (filterValue === null) return null;

                        return [filterName, filterValue];
                    });
                }).filter(value => value !== null)
            )
        }
    }).then((response) => response.data);

const setSearchFilterDelayed = (setSearchFilter) => {
    clearTimeout(tableSearchDelayTimer);
    tableSearchDelayTimer = setTimeout(setSearchFilter, 2000);
}

const FilterDialogFooter = ({ applyNewFilters }) => (
    <div style={{ marginTop: '40px' }}>
        <Button variant="contained" onClick={applyNewFilters}>Apply Filters</Button>
    </div>
);

const Title = ({ title, isFetching }) => (
    <Typography variant="h6">
        {title}
        {isFetching && <CircularProgress size={24} style={{ marginLeft: 15, position: 'relative', top: 4 }} />}
    </Typography>
);

const DeleteDialog = ({ open, handleClose, handleContinue }) => (
    <Dialog open={open} onClose={handleClose}>
        <DialogTitle id="alert-dialog-title">Delete resourceName</DialogTitle>
        
        <MuiDialogContent>
            <DialogContentText>
                Do you wish to continue?
            </DialogContentText>
        </MuiDialogContent>
        
        <DialogActions>
            <Button onClick={handleClose} color="primary">
                Cancel
            </Button>
            
            <Button onClick={handleContinue} color="primary" autoFocus>
                Continue
            </Button>
        </DialogActions>
    </Dialog>
);

const MyDatePicker = ({ label, onChange }) => {
    const [selectedDate, setSelectedDate] = React.useState(null);

    const handleDateChange = (newVal) => {
        setSelectedDate(newVal);
        onChange(newVal.format('X'));
    }

    const handleClr = (e) => {
        e.stopPropagation();
        setSelectedDate(null);
    }

    return (
        <DatePicker
            value={selectedDate}
            label={label}
            onChange={handleDateChange}
            format='YYYY-MM-DD'
            animateYearScrolling
            InputProps={{
                endAdornment: (
                    <IconButton onClick={(e) => handleClr(e)} disabled={selectedDate === null} size="small" >
                        <ClearIcon />
                    </IconButton>
                )
            }}
        />
    );
}

const idColumn = {
    name: 'id',
    label: 'ID',
    options: {
        filter: false,
        customBodyRender: (value) => '#' + value
    }
}

const timeColumn = (name, label, filterName, labels) => ({
    name,
    label,
    filterName,
    options: {
        filterType: 'custom',
        filterOptions: {
            display: (filterList, onChange, index, column) => {
                return (
                    <FormControl>
                        <MyDatePicker
                            label={labels[0]}
                            onChange={newVal => {
                                filterList[index][0] = newVal;
                                onChange(filterList[index], index, column);
                            }}
                        />

                        <MyDatePicker
                            label={labels[1]}
                            onChange={newVal => {
                                filterList[index][1] = newVal;
                                onChange(filterList[index], index, column);
                            }}
                        />
                    </FormControl>
                );
            }
        }
    }
});

const updateColumns = [
    {
        name: 'updated_by',
        label: 'Updator',
        options: {
            filterType: 'dropdown'
        },
        filterName: 'updatedBy'
    },
    timeColumn('updated_at', 'Updates', ['updatedBefore', 'updatedAfter'], ['Updated Before', 'Updated After'])
];

const creationColumns = [
    {
        name: 'created_by',
        label: 'Creator',
        options: {
            filterType: 'dropdown'
        },
        filterName: 'createdBy'
    },
    timeColumn('created_at', 'Creates', ['createdBefore', 'createdAfter'], ['Created Before', 'Created After'])
];

export {
    defaultOptions,
    
    performServerDelete,
    performServerRequest,
    
    setSearchFilterDelayed,

    Title,
    DeleteDialog,
    
    idColumn,
    updateColumns,
    creationColumns
}