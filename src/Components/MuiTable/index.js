import React, { useState, useEffect } from 'react';
import MUIDataTables from "mui-datatables";

import { useQuery, useQueryClient } from 'react-query'
import { useLocation } from "react-router";

import MomentUtils from '@date-io/moment';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';

import { makeStyles } from '@material-ui/core/styles';

import { Title, BuildFetchQueryFunc } from './Consts';

import { makeTotalColumns } from './Columns';

import makeOptions from './options';
import DetailsDialog from './DetailsDialog';
import DeleteDialog from './DeleteDialog';

const useStyles = makeStyles({
    highlightedRow: {
        backgroundColor: '#131726'
    }
});

function MuiTable({
    URL, title, columns,
    
    includeCreateColumns = true,
    includeUpdateColumns = true,
    
    initRowsPerPage = 5,
    formName = null,
    dependingRowColor = null,
    moreOptions = [],
    
    getNameFromData = null,
    initialFilters = [],
    
    DetailsContent = null,
    ShowEditButton = true,
    ShowDeleteButton = true,
    ExtraDetailsDialogButtons = null,

    DialogSize = 'md',
    ...props 
}) {
    const classes = useStyles();
    const queryClient = useQueryClient();
    const totalColumns = makeTotalColumns(columns, includeUpdateColumns);
    
    const { totalRows } = useLocation().state || {};
    
    const [currentPage, setCurrentPage] = useState(1);

    const fetchQueryFunc = BuildFetchQueryFunc(totalColumns, setCurrentPage);

    const [rowsPerPage, setRowsPerPage] = useState(initRowsPerPage);
    const [searchFilter, setSearchFilter] = useState('');
    const [filterList, setFilterList] = useState([]);
    const [columnSort, setColumnSort] = useState({ columnName: 'created_at', direction: 'desc' });

    const [selectedRowData, setSelectedRowData] = React.useState(null);

    const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
    const openDeleteDialog = () => setDeleteDialogOpen(true);
    const closeDeleteDialog = () => setDeleteDialogOpen(false);

    const [detailsDialogIsOpened, setDetailsDialogIsOpened] = React.useState(false);
    const closeDetailsDialog = () => setDetailsDialogIsOpened(false);
    const openDetailsDialog = () => setDetailsDialogIsOpened(true);

    const queryKeys = [rowsPerPage, searchFilter, filterList, columnSort, initialFilters];

    const { isFetching, isError, data, dataUpdatedAt } = useQuery([URL, currentPage, ...queryKeys], fetchQueryFunc);
    
    useEffect(() => {
        if (data.current_page !== data.last_page) 
            queryClient.prefetchQuery([URL, parseInt(currentPage) + 1, ...queryKeys], fetchQueryFunc);

        return () => queryClient.cancelQueries(URL);
    // eslint-disable-next-line
    }, [dataUpdatedAt]);
    

    if (isError) setTimeout(() => queryClient.invalidateQueries(URL), 10000);

    const options = makeOptions({
        currentPage,
        setCurrentPage,

        rowsPerPage,
        setRowsPerPage,

        data,
        totalRows,
        moreOptions,
        dependingRowColor,
        highlightFirst: totalRows !== undefined,
        classes,
        DetailsContent,
        openDetailsDialog,

        setSelectedRowData,
        setColumnSort,
        setFilterList,
        setSearchFilter
    });

    const DetailsDialogProps = {
        title: (selectedRowData && getNameFromData && getNameFromData(selectedRowData)) || title,

        closeDetailsDialog,
        openDetailsDialog,
        openDeleteDialog,
        
        selectedRowData,
        formName,
        
        DetailsContent,
        ShowDeleteButton,
        ShowEditButton,
        ExtraDetailsDialogButtons,

        maxWidth: DialogSize,
        open: detailsDialogIsOpened
    }

    const deleteDialogProps = {
        URL: URL,
        id: selectedRowData && selectedRowData.id,
        open: deleteDialogOpen,
        closeDeleteDialog,
        closeDetailsDialog
    }

    return (
        <>
            {DetailsContent && selectedRowData && <DetailsDialog {...DetailsDialogProps} />}

            <DeleteDialog {...deleteDialogProps} />
            
            <MuiPickersUtilsProvider utils={MomentUtils}>
                <MUIDataTables
                    title={<Title title={title} isFetching={isFetching} />}
                    data={(data && data.data) ? data.data : []}
                    columns={totalColumns}
                    options={options}
                    {...props}
                />
            </MuiPickersUtilsProvider>
        </>
    );
}

export default MuiTable;