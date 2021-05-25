import React, { useState, useEffect } from 'react';
import { useQuery, useQueryClient } from 'react-query'
import axios from 'axios';
import MUIDataTables from "mui-datatables";
import { CircularProgress, Typography, Button } from '@material-ui/core';

export default function MuiTable({ title, URL, columns, dependingRowColor = null, rowsPerPageDef = 5, moreOptions = [], includeUpdateAttributes = true, ...props }) {
    const updateAttributes = [
        {
            name: 'updated_by',
            label: 'Updator'
        },
        {
            name: 'updated_at',
            label: 'Update time'
        }
    ];

    const totalColumns = [
        {
            name: 'id',
            label: 'ID',
            options: {
                customBodyRender: (value) => '#' + value
            }
        },
        ...columns,
        {
            name: 'created_by',
            label: 'Creator'
        },
        {
            name: 'created_at',
            label: 'Create time'
        },
        ...(includeUpdateAttributes ? updateAttributes : [])
    ];

    const queryClient = useQueryClient();

    const [currentPage, setCurrentPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageDef);
    const [searchFilter, setSearchFilter] = useState('');
    const [filterList, setFilterList] = useState([]);
    const [columnSort, setColumnSort] = useState({columnName: 'id', direction: 'asc'});

    const fetchData = async ({ queryKey }) => {
        const fullUrl = URL 
                        + '?page=' + (queryKey[1] + 1)
                        + '&perPage=' + queryKey[2]
                        + (searchFilter ? ('&filter=' + queryKey[3]) : '')
                        + queryKey[4].map((idk1, idk2) => {
                            if (!idk1.length) return '';
                            
                            let filterValue = idk1[0];
                            
                            if (filterValue === true) filterValue = 1;
                            if (filterValue === false) filterValue = 0;

                            return '&' + encodeURIComponent(totalColumns[idk2].name) + '=' + encodeURIComponent(filterValue);
                        }).join('')
                        + '&orderBy=' + queryKey[5].columnName
                        + '&dir=' + queryKey[5].direction;

        const { data } = await axios.get(fullUrl);
        return data;
        //return fetch(fullUrl).then(response => response.json());
    }
    
    const shouldBeMonitored = [rowsPerPage, searchFilter, filterList, columnSort];
    const { isFetching, isError, data } = useQuery([URL, currentPage, ...shouldBeMonitored], fetchData, {
        initialData: [],
        placeholderData: []
    });
    
    if (isError) setTimeout(() => queryClient.invalidateQueries(), 5000);
    
    // eslint-disable-next-line    
    useEffect(() => queryClient.prefetchQuery([URL, currentPage + 1, ...shouldBeMonitored], fetchData), [currentPage]);

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
        let col = totalColumns[cellMeta.colIndex];

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
        enableNestedDataAccess: '.',
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
        ...(dependingRowColor ? {
            setRowProps: (row, dataIndex, rowIndex) => ({
                style: {
                    backgroundColor: dependingRowColor(row)
                }
            })
        } : []),
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
            columns={totalColumns}
            options={options}
            {...props}
        />
    );
}