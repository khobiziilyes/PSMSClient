import React from 'react';
import axios, { CancelToken } from 'axios';

import { CircularProgress, Typography } from '@material-ui/core';

const performServerRequest = (URL, page, perPage, searchFilter, filterList, columnSort, initialFilters, columnsFilterNames, filterValueFormaters) => {
    const source = CancelToken.source();

    const promise = axios.get(URL, {
        params: {
            page,
            perPage,
            orderBy: columnSort.columnName,
            dir: columnSort.direction,
            ...initialFilters,
            ...(searchFilter ? {search: searchFilter} : {}),
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
        },
        cancelToken: source.token
    }).then(response => response.data);

    promise.cancel = () => source.cancel('Query was cancelled by React Query');

    return promise;
}

const Title = ({ title, isFetching }) => (
    <Typography variant="h6">
        {title}
        {isFetching && <CircularProgress size={24} style={{ marginLeft: 15, position: 'relative', top: 4 }} />}
    </Typography>
);

function BuildFetchQueryFunc(totalColumns, setCurrentPage) {
    const columnsFilterNames = totalColumns.map(column => column.filterName || [column.name]);
    const filterValueFormaters = totalColumns.map(column => column.formatValue || null);

    return ({ queryKey }) => performServerRequest(...queryKey, columnsFilterNames, filterValueFormaters).then(localData => {
        setCurrentPage(currentPage => {
            return (localData && localData.data && localData.data.length === 0 && currentPage !== 1) ? 1 : currentPage;
        });
        
        return localData;
    });
}

export {
    BuildFetchQueryFunc,
    Title
}