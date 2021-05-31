import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import queryString from "query-string";

import { useSetRecoilState } from 'recoil';
import { useQuery, useQueryClient } from 'react-query'
import { formDialogNameAtom, formDialogInitValuesAtom, formDialogIsOpenedAtom } from '@src/Atoms';
import { useSnackbar } from 'notistack';
import MUIDataTables from "mui-datatables";
import { Button, DialogActions, Dialog, DialogTitle, DialogContent } from '@material-ui/core';

import { useLocation } from "react-router";
import { makeStyles } from '@material-ui/core/styles';

import {
    HighlightOff,
    Delete,
    Edit
} from '@material-ui/icons';

import {
    defaultOptions,
    
    performServerDelete,
    performServerRequest,
    
    setSearchFilterDelayed,

    Title,
    DeleteDialog,
    
    idColumn,
    updateColumns,
    creationColumns
} from './Consts';

const useStyles = makeStyles({
    highlightedRow: {
        backgroundColor: '#131726'
    }
});

function MuiTable({
    URL, title, columns,
    
    formName = null,
    initRowsPerPage = 5,
    includeUpdateColumns = true,
    dependingRowColor = null,
    moreOptions = [],
    
    getNameFromData = null,
    dataToField = null,
    formatTableData = null,
    initialFilters = [],
    
    DetailsContent = null,
    DialogSize = 'md',
    StandardDialog = true,
    ...props
}) {
    const location = useLocation();
    const queryClient = useQueryClient();
    const { enqueueSnackbar } = useSnackbar();
    const classes = useStyles();

    const { totalRows, highlightId } = queryString.parse(location.search);
    
    const initPage = totalRows ? Math.ceil(totalRows / initRowsPerPage) : 1;

    const totalColumns = [
        idColumn,
        ...columns,
        ...creationColumns,
        ...(includeUpdateColumns ? updateColumns : [])
    ];

    const columnsFilterNames = totalColumns.map((column) => column.filterName || column.name);
    
    const [currentPage, setCurrentPage] = useState(initPage);
    const [rowsPerPage, setRowsPerPage] = useState(initRowsPerPage);
    const [searchFilter, setSearchFilter] = useState('');
    const [filterList, setFilterList] = useState([]);
    const [columnSort, setColumnSort] = useState({ columnName: 'id', direction: 'asc' });

    const [selectedRowData, setSelectedRowData] = React.useState(null);
    const [dialogIsOpened, setDialogIsOpened] = React.useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
    
    const handleDialogClose = () => setDialogIsOpened(false);
    
    const fetchQueryFunc = ({ queryKey }) => performServerRequest(...queryKey, columnsFilterNames).then(localData => {
        if (localData && localData.data && localData.data.length === 0 && currentPage !== 1)
            setCurrentPage(1);
        
        return localData;
    });

    const queryKeys = [rowsPerPage, searchFilter, filterList, columnSort, initialFilters];

    const { isFetching, isError, data, dataUpdatedAt } = useQuery([URL, currentPage, ...queryKeys], fetchQueryFunc);
    
    useEffect(() => {
        if (data.current_page !== data.last_page)
            queryClient.prefetchQuery([URL, parseInt(currentPage) + 1, ...queryKeys], fetchQueryFunc) // eslint-disable-next-line
    }, [dataUpdatedAt]);
    
    if (isError) setTimeout(() => queryClient.invalidateQueries(URL), 10000);

    const options = {
        ...defaultOptions,

        page: currentPage - 1,
        rowsPerPage: rowsPerPage,
        count: data ? data.total : (totalRows || 0),
        
        onRowClick: (rowData, { dataIndex }) => {
            if (DetailsContent) {
                const realRowData = data.data[dataIndex];
                
                if (realRowData.id === parseInt(highlightId)) classes.highlightedRow = {};

                const emptyFromNull = Object.keys(realRowData).reduce((Obj, key) => {
                    Obj[key] = realRowData[key] || '';
                    return Obj;
                }, {});

                setSelectedRowData(emptyFromNull);
                setDialogIsOpened(true);
            }
        },
        
        onChangePage: (newPage) => setCurrentPage(parseInt(newPage) + 1),
        onChangeRowsPerPage: (numberOfRows) => setRowsPerPage(numberOfRows),
        onSearchChange: (searchText) => setSearchFilterDelayed(() => setSearchFilter(searchText)),
        onFilterChange: (changedColumn, newFilterList) => setFilterList(newFilterList),
        onColumnSortChange: (columnName, direction) => setColumnSort({columnName, direction}),
        
        setRowProps: (row, dataIndex, rowIndex) => {
            const rowData = data.data[rowIndex];

            return {
                className: clsx([
                    dependingRowColor && dependingRowColor(rowData),
                    highlightId && (parseInt(highlightId) === rowData.id) && classes.highlightedRow
                ])
            }
        },
        ...(moreOptions ? (Array.isArray(moreOptions) ? moreOptions : moreOptions(data)) : [])
    }

    const handleDeleteDialogContinue = () => {
        performServerDelete(URL, selectedRowData.id).then(response => {
            setDeleteDialogOpen(false);

            if (response.deleted) {
                setDialogIsOpened(false);

                queryClient.invalidateQueries(URL);
                enqueueSnackbar('The customer has been deleted successfully.', { variant: 'success' });
            } else {
                enqueueSnackbar('The customer could not be deleted.', { variant: 'error' });
            }
        });
    }

    const setFormDialogName = useSetRecoilState(formDialogNameAtom);
    const setFormDialogInitValues = useSetRecoilState(formDialogInitValuesAtom);
    const setFormDialogIsOpened = useSetRecoilState(formDialogIsOpenedAtom);

    const handleEditButton = () => {
        const removedData = ['created_at', 'created_by', 'updated_at', 'updated_by', 'deleted_at'];
        
        const cleanData = Object.keys(selectedRowData).reduce((Obj, key) => {
            if (!removedData.includes(key)) {
                const oldValue = selectedRowData[key];
                Obj[key] = dataToField ? dataToField(key, oldValue) : oldValue;
            }

            return Obj;
        }, {});

        setFormDialogInitValues(cleanData);
        setFormDialogName(formName);
        setDialogIsOpened(false);

        setFormDialogIsOpened(true);
    }

    const detailsContent = DetailsContent && selectedRowData && <DetailsContent rowData={selectedRowData} handleDialogClose={handleDialogClose} />;
    const isOwned = detailsContent && (formName && selectedRowData.created_by !== 'PSMS');

    return (
        <>
            {detailsContent &&
                <Dialog open={dialogIsOpened} onClose={handleDialogClose} fullWidth maxWidth={DialogSize}>
                    <DialogTitle>{(selectedRowData && getNameFromData(selectedRowData)) || title}</DialogTitle>

                    {StandardDialog ? (
                        <>
                            <DialogContent>
                                {detailsContent}
                            </DialogContent>

                            <DialogActions>
                                <Button startIcon={<HighlightOff />} onClick={handleDialogClose} color="primary" variant="outlined">
                                    Cancel
                                </Button>
                                
                                {isOwned && <>
                                        <Button startIcon={<Delete />} onClick={() => setDeleteDialogOpen(true)} color="primary" variant="outlined">
                                            Delete
                                        </Button>

                                        <Button startIcon={<Edit />} onClick={handleEditButton} color="primary" variant="outlined">
                                            Edit
                                        </Button>
                                    </>
                                }
                            </DialogActions>
                        </>
                    ) : (
                        {detailsContent}
                    )}
                </Dialog>
            }

            <DeleteDialog open={deleteDialogOpen} handleClose={() => setDeleteDialogOpen(false)} handleContinue={handleDeleteDialogContinue} />

            <MUIDataTables
                title={<Title title={title} isFetching={isFetching} />}
                data={data ? (formatTableData ? formatTableData(data.data) : data.data) : []}
                columns={totalColumns}
                options={options}
                {...props}
            />
        </>
    );
}

export default MuiTable;