import axios from 'axios';
import { DialogActions, Dialog, DialogTitle, DialogContentText, DialogContent as MuiDialogContent } from '@material-ui/core';
import { CircularProgress, Typography, Button } from '@material-ui/core';

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

    customFilterDialogFooter: (currentFilterList, applyNewFilters) => <FilterDialogFooter applyNewFilters={applyNewFilters} />,
}

const performServerDelete = (URL, id) => axios.delete(URL + '/' + id, ).then((response) => response.data);

const performServerRequest = (URL, page, perPage, searchFilter, filterList, columnSort, initialFilters, columnsFilterNames) => 
    axios.get(URL, {
        params: {
            page,
            perPage,
            orderBy: columnSort.columnName,
            dir: columnSort.direction,
            ...(searchFilter ? {search: searchFilter} : []),
            ...Object.fromEntries((filterList.map((filterValues, columnIndex) => {
                if (!filterValues.length) return null;
                
                let filterValue = filterValues[0];
                
                if (filterValue === true) filterValue = 1;
                if (filterValue === false || filterValue === undefined || filterValue === null) filterValue = 0;

                return [columnsFilterNames[columnIndex], filterValue];
            })).filter(value => value !== null)),
            ...initialFilters
        }
    }).then((response) => response.data).catch(); /////////////////////////////////////////

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

const idColumn = {
    name: 'id',
    label: 'ID',
    options: {
        filter: false,
        customBodyRender: (value) => '#' + value
    }
}

const updateColumns = [
    {
        name: 'updated_by',
        label: 'Updator',
        options: {
            filterType: 'dropdown'
        }
    },
    {
        name: 'updated_at',
        label: 'Update time'
    }
];

const creationColumns = [
    {
        name: 'created_by',
        label: 'Creator',
        options: {
            filterType: 'dropdown'
        }
    },
    {
        name: 'created_at',
        label: 'Create time'
    },
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