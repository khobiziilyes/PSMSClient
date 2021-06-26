import clsx from 'clsx';
import { defaultOptions } from './Consts';

export const BuildSetRowProps = ({ data, dependingRowColor, highlightId, classes }) => {
    return (row, dataIndex, rowIndex) => {
        const rowData = data.data[rowIndex];

        return {
            className: clsx([
                dependingRowColor && dependingRowColor(rowData),
                highlightId && (parseInt(highlightId) === rowData.id) && classes.highlightedRow
            ])
        }
    }
}

export const BuildOnRowClick = ({ data, highlightId, classes, setSelectedRowData, openDetailsDialog }) => {
    return (rowData, { dataIndex }) => {
        const realRowData = data.data[dataIndex];
        
        if (realRowData.id === parseInt(highlightId)) classes.highlightedRow = {};

        const emptyFromNull = Object.keys(realRowData).reduce((Obj, key) => {
            Obj[key] = realRowData[key] || '';
            return Obj;
        }, {});

        setSelectedRowData(emptyFromNull);
        openDetailsDialog();
    }
}

export const makeOptions = ({
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
    openDetailsDialog,

    setSelectedRowData,
    setColumnSort,
    setFilterList,
    setSearchFilter,
    setSearchFilterDelayed
}) => ({
    ...defaultOptions,

    page: currentPage - 1,
    rowsPerPage: rowsPerPage,
    count: data ? data.total : (totalRows || 0),
    
    onChangePage: (newPage) => setCurrentPage(parseInt(newPage) + 1),
    onChangeRowsPerPage: (numberOfRows) => setRowsPerPage(numberOfRows),
    onSearchChange: (searchText) => setSearchFilterDelayed(() => setSearchFilter(searchText)),
    onFilterChange: (changedColumn, newFilterList) => setFilterList(newFilterList),
    onColumnSortChange: (columnName, direction) => setColumnSort({ columnName, direction }),
    
    onRowClick: DetailsContent && BuildOnRowClick({ data, highlightId, classes, setSelectedRowData, openDetailsDialog }),
    setRowProps: BuildSetRowProps({ data, dependingRowColor, highlightId, classes }),
    ...(moreOptions ? ((moreOptions instanceof Function) ? moreOptions(data) : moreOptions) : [])
});

export default makeOptions;