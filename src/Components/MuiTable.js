import React, { useState, useEffect } from 'react';
import { CircularProgress, Typography, Button } from '@material-ui/core';
import MUIDataTable from "mui-datatables";

const fetchData = (url) => {
    return new Promise((resolve, reject) => {
        fetch(url).then(response => response.json()).then(response => {
            resolve({
                data: response.data,
                total: response.total
            });
        });
    });
}

export default function MuiTable({ title, baseUrl, columns, rowsPerPageDef = 5, moreOptions = [], ...props}) {
    const [currentPage, setCurrentPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageDef);
    const [searchFilter, setSearchFilter] = useState('');
    const [filterList, setFilterList] = useState([]);
    const [columnSort, setColumnSort] = useState({columnName: 'id', direction: 'asc'});

    var delayTimer;
    function setSearchFilterDelayed(searchText) {
        clearTimeout(delayTimer);
        
        delayTimer = setTimeout(function() {
            setSearchFilter(searchText);
        }, 2000);
    }

    const [state, setState] = useState({ isLoading: true, data: [], count: 0 });

    const triggerFetch = () => {
        setState({ ...state, isLoading: true });

        const fullUrl = baseUrl 
                        + '?limit=' + rowsPerPage
                        + '&page=' + (currentPage + 1) 
                        + (searchFilter ? ('&filter=' + searchFilter) : '')
                        /*
                        + '&sortby=' + columnSort.columnName
                        + '&order=' + columnSort.direction
                        */
                        + filterList.map((a, b) => {
                            if (!a.length) return '';
                            return '&' + encodeURIComponent(columns[b].name) + '=' + encodeURIComponent(a[0]);
                        }).join('');

        fetchData(fullUrl).then(response => {
            setState({
                isLoading: false,
                data: response.data,
                count: response.total
            });
        });
    }

    // eslint-disable-next-line
    useEffect(() => triggerFetch(), [currentPage]);
    // eslint-disable-next-line
    useEffect(() => currentPage === 0 ? triggerFetch() : setCurrentPage(0), [rowsPerPage, searchFilter, filterList, columnSort]);

    const handleCellClick = (cellMeta) => {
        let col = columns[cellMeta.colIndex];

        if (col.isClickable) {
            let rowData = state.data[cellMeta.dataIndex];
            // Open dialog of that item
        }
    }

    const options = {
        onCellClick: (cellText, cellMeta) => handleCellClick(cellMeta),
        print: false,
        count: state.count,
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
        <MUIDataTable
            title={
                <Typography variant="h6">
                    {title}
                    {state.isLoading && <CircularProgress size={24} style={{ marginLeft: 15, position: 'relative', top: 4 }} />}
                </Typography>
            }
            data={state.data}
            columns={columns}
            options={options}
            {...props}
        />
    );
}