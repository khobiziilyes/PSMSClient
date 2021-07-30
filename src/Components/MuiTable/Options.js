import clsx from 'clsx';
import { Button } from '@material-ui/core';
import Footer from './Footer';

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
    sortThirdClickReset: true,
    enableNestedDataAccess: '.',
    download: false,

    customFilterDialogFooter: (currentFilterList, applyNewFilters) => <FilterDialogFooter applyNewFilters={applyNewFilters} />,
    customFooter: (...args) => Footer(...args, [5, 7, 10, 30])
}

const BuildSetRowProps = ({ data, dependingRowColor, highlightId, classes }) => {
    return (row, dataIndex, rowIndex) => {
        const rowData = data.data[rowIndex];

        return {
            className: clsx([
                dependingRowColor && dependingRowColor(rowData),
                highlightId && (row[0] === "#" + highlightId) && classes.highlightedRow
            ])
        }
    }
}

const BuildOnRowClick = ({ data, setSelectedRowData, openDetailsDialog }) => {
    return (rowData, { dataIndex }) => {
        const realRowData = data.data[dataIndex];

        const nullToEmpty = Object.keys(realRowData).reduce((Obj, key) => {
            Obj[key] = realRowData[key] ?? '';
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
    highlightId,
    moreOptions,
    dependingRowColor,
    classes,
    DetailsModal,
    openDetailsDialog,

    setSelectedRowData,
    setColumnSort,
    setFilterList,
    setSearchFilter
}) => ({
    ...defaultOptions,

    page: currentPage - 1,
    rowsPerPage: rowsPerPage,
    count: data ? data.total : 0,
    
    onChangePage: newPage => setCurrentPage(parseInt(newPage) + 1),
    onChangeRowsPerPage: numberOfRows => setRowsPerPage(numberOfRows),
    searchProps: {
        onKeyUp: e => e.keyCode === 13 && setSearchFilter(e.target.value)
    },
    onSearchClose: () => setSearchFilter(''),
    onFilterChange: (changedColumn, newFilterList) => setFilterList(newFilterList),
    onColumnSortChange: (columnName, direction) => setColumnSort({ columnName, direction }),
    
    onRowClick: DetailsModal && BuildOnRowClick({ data, setSelectedRowData, openDetailsDialog }),
    setRowProps: BuildSetRowProps({ data, dependingRowColor, highlightId, classes }),
    ...(moreOptions ? ((moreOptions instanceof Function) ? moreOptions(data) : moreOptions) : [])
});

export default makeOptions;