import React from 'react';
import axios from 'axios';

import {
    CircularProgress,
    Typography,
    Button
} from '@material-ui/core';

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
    }).then(response => response.data);

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

function BuildFetchQueryFunc(totalColumns, setCurrentPage, currentPage) {
    const columnsFilterNames = totalColumns.map(column => column.filterName || [column.name]);
    const filterValueFormaters = totalColumns.map(column => column.formatValue || null);
    
    return ({ queryKey }) => performServerRequest(...queryKey, columnsFilterNames, filterValueFormaters).then(localData => {
        if (localData && localData.data && localData.data.length === 0 && currentPage !== 1)
            setCurrentPage(1);
        
        return localData;
    });
}

export {
    defaultOptions,   
    setSearchFilterDelayed,

    Title,

    BuildFetchQueryFunc
}