import clsx from 'clsx';
import { Button } from '@material-ui/core';

let tableSearchDelayTimer;

const FilterDialogFooter = ({ applyNewFilters }) => (
    <div style={{ marginTop: '40px' }}>
        <Button variant="contained" onClick={applyNewFilters}>Apply Filters</Button>
    </div>
);

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

const setSearchFilterDelayed = (setSearchFilter) => {
    clearTimeout(tableSearchDelayTimer);
    tableSearchDelayTimer = setTimeout(setSearchFilter, 2000);
}

const BuildSetRowProps = ({ data, dependingRowColor, highlightFirst, classes }) => {
    return (row, dataIndex, rowIndex) => {
        const rowData = data.data[rowIndex];

        return {
            className: clsx([
                dependingRowColor && dependingRowColor(rowData),
                highlightFirst && (dataIndex === 0) && classes.highlightedRow
            ])
        }
    }
}

const BuildOnRowClick = ({ data, setSelectedRowData, openDetailsDialog }) => {
    return (rowData, { dataIndex }) => {
        const realRowData = data.data[dataIndex];

        const nullToEmpty = Object.keys(realRowData).reduce((Obj, key) => {
            Obj[key] = realRowData[key] === null ? '' : realRowData[key];
            return Obj;
        }, {});

        setSelectedRowData(nullToEmpty);
        openDetailsDialog();
    }
}

const makeOptions = ({
    currentPage,
    setCurrentPage,

    rowsPerPage,
    setRowsPerPage,

    data,
    totalRows,
    moreOptions,
    dependingRowColor,
    highlightFirst,
    classes,
    DetailsContent,
    openDetailsDialog,

    setSelectedRowData,
    setColumnSort,
    setFilterList,
    setSearchFilter
}) => ({
    ...defaultOptions,

    page: currentPage - 1,
    rowsPerPage: rowsPerPage,
    count: data ? data.total : (totalRows || 0),
    
    onChangePage: newPage => setCurrentPage(parseInt(newPage) + 1),
    onChangeRowsPerPage: numberOfRows => setRowsPerPage(numberOfRows),
    onSearchChange: searchText => setSearchFilterDelayed(() => setSearchFilter(searchText)),
    onFilterChange: (changedColumn, newFilterList) => setFilterList(newFilterList),
    onColumnSortChange: (columnName, direction) => setColumnSort({ columnName, direction }),
    
    onRowClick: DetailsContent && BuildOnRowClick({ data, highlightFirst, setSelectedRowData, openDetailsDialog }),
    setRowProps: BuildSetRowProps({ data, dependingRowColor, highlightFirst, classes }),
    ...(moreOptions ? ((moreOptions instanceof Function) ? moreOptions(data) : moreOptions) : [])
});

export default makeOptions;