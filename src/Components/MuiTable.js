import React, { useState, useEffect } from 'react';
import { CircularProgress, Typography, Button } from '@material-ui/core';
import MUIDataTables from "mui-datatables";
import { useQuery, useQueryClient } from 'react-query'

export default function MuiTable({ title, baseUrl, columns, rowsPerPageDef = 5, moreOptions = [], ...props}) {
    const queryClient = useQueryClient();

    const [currentPage, setCurrentPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageDef);
    const [searchFilter, setSearchFilter] = useState('');
    const [filterList, setFilterList] = useState([]);
    const [columnSort, setColumnSort] = useState({columnName: 'id', direction: 'asc'});

    const fetchData = ({ queryKey }) => {
        const fullUrl = baseUrl 
                        + '?page=' + (queryKey[1] + 1)
                        + '&limit=' + queryKey[2]
                        + (searchFilter ? ('&filter=' + queryKey[3]) : '')
                        + queryKey[4].map((idk1, idk2) => {
                            if (!idk1.length) return '';
                            return '&' + encodeURIComponent(columns[idk2].name) + '=' + encodeURIComponent(idk1[0]);
                        }).join('');
                        /*
                        + '&sortby=' + queryKey[5].columnName
                        + '&order=' + queryKey[5].direction
                        */

        return fetch(fullUrl).then(response => response.json());
    }
    
    const shouldBeMonitored = [rowsPerPage, searchFilter, filterList, columnSort];
    const { isFetching, isError, data } = useQuery(['anything', currentPage, ...shouldBeMonitored], fetchData, {
        initialData: [],
        placeholderData: []
    });
    
    if (isError) setTimeout(() => queryClient.invalidateQueries(), 5000);
    
    // eslint-disable-next-line    
    useEffect(() => queryClient.prefetchQuery(['anything', currentPage + 1, ...shouldBeMonitored], fetchData), [currentPage]);

    var delayTimer;
    function setSearchFilterDelayed(searchText) {
        clearTimeout(delayTimer);
        
        delayTimer = setTimeout(function() {
            setSearchFilter(searchText);
        }, 2000);
    }

    // eslint-disable-next-line
    useEffect(() => currentPage === 0 ? null : setCurrentPage(0), shouldBeMonitored);

    const handleCellClick = (cellMeta) => {
        let col = columns[cellMeta.colIndex];

        if (col.isClickable) {
            // let rowData = state.data[cellMeta.dataIndex];
            // Open dialog of that item
        }
    }

    const options = {
        onCellClick: (cellText, cellMeta) => handleCellClick(cellMeta),
        print: false,
        count: data === undefined ? 0 : data.total,
        filter: true,
        filterType: 'textField',
        confirmFilters: true,
        selectableRows: 'none',
        responsive: 'vertical',
        serverSide: true,
        rowsPerPageOptions: [5, 7, 10, 30],
        page: currentPage,
        rowsPerPage: rowsPerPage,
        sortThirdClickReset: true,
        onColumnSortChange: (columnName, direction) => setColumnSort({columnName, direction}),
        onChangePage: (newPage) => setCurrentPage(newPage),
        onChangeRowsPerPage: (numberOfRows) => setRowsPerPage(numberOfRows),
        onSearchChange: (searchText) => setSearchFilterDelayed(searchText),
        customFilterDialogFooter: (currentFilterList, applyNewFilters) => {
            return (
                <div style={{ marginTop: '40px' }}>
                    <Button variant="contained" onClick={() => applyNewFilters()}>Apply Filters</Button>
                </div>
            );
        },
        onFilterChange: (changedColumn, newFilterList) => setFilterList(newFilterList),
        ...moreOptions
    }

    return (
        <MUIDataTables
            title={
                <Typography variant="h6">
                    {title}
                    {isFetching && <CircularProgress size={24} style={{ marginLeft: 15, position: 'relative', top: 4 }} />}
                </Typography>
            }
            data={data === undefined ? [] : data.data}
            columns={columns}
            options={options}
            {...props}
        />
    );
}