import React, { useState, useEffect } from 'react';
import { useQuery, useQueryClient } from 'react-query'
import MUIDataTables from "mui-datatables";
import { Button, DialogActions, Dialog, DialogTitle, DialogContent as MuiDialogContent } from '@material-ui/core';

import {
    HighlightOff,
    Delete,
    Edit
} from '@material-ui/icons';

import {
    performServerRequest,
    performServerDelete,
    
    setSearchFilterDelayed,
    handleCellClick,
    defaultOptions,
    updateColumns,
    FilterDialogFooter,
    Title,
    DeleteDialog
} from './Consts';

function MuiTable({
    URL, title, columns,
    rowsPerPageDef = 5,
    includeUpdateColumns = true,
    dependingRowColor = null,
    moreOptions = [],
    
    getNameFromData = null,
    initialFilters = [],
    
    DialogContent = null,
    DialogSize = 'md',
    StandardDialog = true,
    ...props
}) {
    const queryClient = useQueryClient();

    const totalColumns = [
        {
            name: 'id',
            label: 'ID',
            options: {
                filter: false,
                customBodyRender: (value) => '#' + value
            }
        },
        ...columns,
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
        ...(includeUpdateColumns ? updateColumns : [])
    ];

    const columnsFilterNames = totalColumns.map((column) => column.filterName || column.name);
    const fetchQueryFunc = ({ queryKey }) => performServerRequest(...queryKey, columnsFilterNames).then(localData => {
        if (localData && localData.data && localData.data.length === 0 && currentPage !== 1)
            setCurrentPage(1);
        return localData;
    });

    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageDef);
    const [searchFilter, setSearchFilter] = useState('');
    const [filterList, setFilterList] = useState([]);
    const [columnSort, setColumnSort] = useState({columnName: 'id', direction: 'asc'});

    const queryKeys = [rowsPerPage, searchFilter, filterList, columnSort, initialFilters];

    const { isFetching, isError, data, dataUpdatedAt } = useQuery([URL, currentPage, ...queryKeys], fetchQueryFunc);
    
    useEffect(() =>
        (data.current_page !== data.last_page) &&
        queryClient.prefetchQuery([URL, currentPage + 1, ...queryKeys], fetchQueryFunc) // eslint-disable-next-line
    , [dataUpdatedAt]);

    useEffect(() => {
        // This is double fetching ... Need a fix
        if (currentPage !== 1) setCurrentPage(1);
    } // eslint-disable-next-line
    , queryKeys.slice(0, -1));
    
    if (isError) setTimeout(() => queryClient.invalidateQueries(URL), 10000);
    
    const [selectedRowData, setSelectedRowData] = React.useState(null);

    const options = {
        ...defaultOptions,

        page: currentPage - 1,
        rowsPerPage: rowsPerPage,
        count: data ? data.total : 0,

        onCellClick: (cellText, cellMeta) => handleCellClick(totalColumns, cellMeta),
        onRowClick: (rowData, { dataIndex }) => !!DialogContent && (setSelectedRowData(data.data[dataIndex]) || setDialogIsOpened(true)),
        
        onChangePage: (newPage) => setCurrentPage(newPage + 1),
        onChangeRowsPerPage: (numberOfRows) => setRowsPerPage(numberOfRows),
        onSearchChange: (searchText) => setSearchFilterDelayed(() => setSearchFilter(searchText)),
        onFilterChange: (changedColumn, newFilterList) => setFilterList(newFilterList),
        onColumnSortChange: (columnName, direction) => setColumnSort({columnName, direction}),
        
        customFilterDialogFooter: (currentFilterList, applyNewFilters) => <FilterDialogFooter applyNewFilters={applyNewFilters} />,
        
        ...(dependingRowColor ? {
            setRowProps: (row, dataIndex, rowIndex) => ({
                className: dependingRowColor(data.data[rowIndex])
            })
        } : []),
        ...(moreOptions ? (Array.isArray(moreOptions) ? moreOptions : moreOptions(data)) : [])
    }

    const [dialogIsOpened, setDialogIsOpened] = React.useState(false);
    const handleDialogClose = () => setDialogIsOpened(false);

    const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);

    const handleDeleteDialogContinue = () => {
        performServerDelete(URL, selectedRowData.id).then(response => {
            setDeleteDialogOpen(false);
            setDialogIsOpened(false);
            queryClient.invalidateQueries(URL);
        });
    }

    return (
        <>
            {!!DialogContent &&
                <Dialog open={dialogIsOpened} onClose={handleDialogClose} fullWidth maxWidth={DialogSize}>
                    <DialogTitle>{ (selectedRowData && getNameFromData(selectedRowData)) || title}</DialogTitle>

                    {StandardDialog ? (
                        <>
                            <MuiDialogContent style={{ overflow: 'hidden' }}>
                                <DialogContent rowData={selectedRowData} />
                            </MuiDialogContent>

                            <DialogActions>
                                <Button startIcon={<HighlightOff />} onClick={handleDialogClose} color="primary" variant="outlined">
                                    Cancel
                                </Button>
                                
                                <Button startIcon={<Delete />} onClick={() => setDeleteDialogOpen(true)} color="primary" variant="outlined">
                                    Delete
                                </Button>

                                <Button startIcon={<Edit />} onClick={() => {}} color="primary" variant="outlined">
                                    Edit
                                </Button>
                            </DialogActions>
                        </>
                    ) : (
                        <DialogContent handleDialogClose={handleDialogClose} rowData={selectedRowData} />
                    )}
                </Dialog>
            }

            <DeleteDialog open={deleteDialogOpen} handleClose={() => setDeleteDialogOpen(false)} handleContinue={handleDeleteDialogContinue}/>

            <MUIDataTables
                title={<Title title={title} isFetching={isFetching} />}
                data={data ? data.data : []}
                columns={totalColumns}
                options={options}
                {...props}
            />
        </>
    );
}

export default MuiTable;