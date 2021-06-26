import React, { useState, useEffect } from 'react';

import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';

import queryString from "query-string";

import { useQuery, useQueryClient } from 'react-query'
import { useSnackbar } from 'notistack';
import MUIDataTables from "mui-datatables";

import { useLocation } from "react-router";
import { makeStyles } from '@material-ui/core/styles';

import {
    performServerDelete,
    performServerRequest,
    
    setSearchFilterDelayed,

    Title,
    DeleteDialog,
    
    idColumn,
    updateColumns,
    creationColumns
} from './Consts';

import makeOptions from './options';
import DetailsDialog from './DetailsDialog';

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
    const queryClient = useQueryClient();
    const { enqueueSnackbar } = useSnackbar();
    const classes = useStyles();

    const { totalRows, highlightId } = queryString.parse(useLocation().search);
    
    const initPage = totalRows ? Math.ceil(totalRows / initRowsPerPage) : 1;

    const totalColumns = [
        idColumn,
        ...columns,
        ...creationColumns,
        ...(includeUpdateColumns ? updateColumns : [])
    ];

    const columnsFilterNames = totalColumns.map((column) => column.filterName || [column.name]);
    const filterValueFormaters = totalColumns.map((column) => column.formatValue || null);
    
    const [currentPage, setCurrentPage] = useState(initPage);
    const [rowsPerPage, setRowsPerPage] = useState(initRowsPerPage);
    const [searchFilter, setSearchFilter] = useState('');
    const [filterList, setFilterList] = useState([]);
    const [columnSort, setColumnSort] = useState({ columnName: 'id', direction: 'asc' });

    const [selectedRowData, setSelectedRowData] = React.useState(null);
    const [dialogIsOpened, setDialogIsOpened] = React.useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
    
    const handleDialogClose = () => setDialogIsOpened(false);

    const fetchQueryFunc = ({ queryKey }) => performServerRequest(...queryKey, columnsFilterNames, filterValueFormaters).then(localData => {
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

    const deleteDialogProps = {
        open: deleteDialogOpen,
        handleContinue: handleDeleteDialogContinue,
        handleClose: () => setDeleteDialogOpen(false)
    }

    const options = makeOptions({
        currentPage,
        setCurrentPage,

        rowsPerPage,
        setRowsPerPage,

        data,
        totalRows,
        moreOptions,
        dependingRowColor,
        classes,
        highlightId,
        DetailsContent,

        setSelectedRowData,
        setDialogIsOpened,
        setColumnSort,
        setFilterList,
        setSearchFilter,
        setSearchFilterDelayed
    });

    const BuildHandleEditButtonArgs = { selectedRowData, dataToField, formName, setDialogIsOpened };

    const DetailsDialogProps = {
        title: (selectedRowData && getNameFromData(selectedRowData)) || title,
        handleDialogClose,
        StandardDialog,
        setDeleteDialogOpen,
        BuildHandleEditButtonArgs,
        selectedRowData,
        formName,
        DetailsContent,
        
        maxWidth: DialogSize,
        open: dialogIsOpened
    }

    return (
        <>
            {DetailsContent && selectedRowData && <DetailsDialog {...DetailsDialogProps} />}

            <DeleteDialog {...deleteDialogProps} />
            
            <MuiPickersUtilsProvider utils={MomentUtils}>
                <MUIDataTables
                    title={<Title title={title} isFetching={isFetching} />}
                    data={data ? (formatTableData ? formatTableData(data.data) : data.data) : []}
                    columns={totalColumns}
                    options={options}
                    {...props}
                />
            </MuiPickersUtilsProvider>
        </>
    );
}

export default MuiTable;