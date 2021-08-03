import React, { useState, useEffect } from 'react';
import MUIDataTables from "mui-datatables";

import { useQuery, useQueryClient } from 'react-query'
import { useLocation } from "react-router";

import MomentUtils from '@date-io/moment';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';

import { makeStyles } from '@material-ui/core/styles';

import { Title, BuildFetchQueryFunc } from './Consts';

import { makeTotalColumns } from './Columns';

import makeOptions from './Options';
import DetailsDialog from './DetailsDialog';

const useStyles = makeStyles({
    highlightedRow: {
        backgroundColor: '#131726'
    }
});

function MuiTable({
    URL, title, columns,
    
    includeCreateColumns = true, includeUpdateColumns = true,
    
    initRowsPerPage = 5,
    formName = null,
    dependingRowColor = null,
    moreOptions = [],
    
    initialFilters = [],
    
    DetailsModal = null,
    ...props 
}) {
    const classes = useStyles();
    const queryClient = useQueryClient();
    const totalColumns = makeTotalColumns(columns, includeCreateColumns, includeUpdateColumns);
    
    const { highlightId } = useLocation().state || {};

    const [currentPage, setCurrentPage] = useState(1);

    const fetchQueryFunc = BuildFetchQueryFunc(totalColumns, setCurrentPage);

    const [rowsPerPage, setRowsPerPage] = useState(initRowsPerPage);
    const [searchFilter, setSearchFilter] = useState('');
    const [filterList, setFilterList] = useState(highlightId ? [ [highlightId] ] : []);

    const [columnSort, setColumnSort] = useState({ columnName: 'id', direction: 'desc' });

    const [selectedRowData, setSelectedRowData] = React.useState(null);

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
        highlightId: highlightId || null,
        moreOptions,
        dependingRowColor,
        classes,
        DetailsModal,
        openDetailsDialog,

        setSelectedRowData,
        setColumnSort,
        setFilterList,
        setSearchFilter
    });

    const DetailsDialogProps = {
        open: detailsDialogIsOpened,
        
        URL,
        closeDetailsDialog,
        selectedRowData,
        formName,
        DetailsModal
    }

    return (
        <>
            <DetailsDialog {...DetailsDialogProps} />
           
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