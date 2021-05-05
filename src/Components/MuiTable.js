import React, { useState, useEffect } from 'react';
import { CircularProgress, Typography } from '@material-ui/core';
import MUIDataTable from "mui-datatables";

const fetchData = (url, page, rowsPerPage) => {
    return new Promise((resolve, reject) => {
        fetch(url + '?page=' + page + '&per_page=' + rowsPerPage).then(response => response.json()).then(response => {
            resolve({
                data: response.data,
                total: response.total,
                page: response.page - 1,
            });
        });
    });
}

export default function MuiTable({ title, baseUrl, columns, rowsPerPage = 7, moreOptions, ...props}) {
    const [currentPage, setCurrentPage] = useState(0);
    const [state, setState] = useState({ isLoading: true, data: [], count: 0 });

    useEffect(() => {
        setState({ ...state, isLoading: true });

        fetchData(baseUrl, currentPage + 1, rowsPerPage).then(response => {
            setState({
                ...state,
                isLoading: false,
                data: response.data,
                count: response.total
            });
        });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPage]);
    
    const { isLoading, count, data } = state;

    const options = {
        page: currentPage,
        rowsPerPage,
        count,
        filter: true,
        filterType: 'dropdown',
        responsive: 'vertical',
        serverSide: true,
        rowsPerPageOptions: [],
        onChangePage: (newPage) => setCurrentPage(newPage),
        ...moreOptions
    }

    return (
        <MUIDataTable
            title={
                <Typography variant="h6">
                   {title}
                    {isLoading && <CircularProgress size={24} style={{ marginLeft: 15, position: 'relative', top: 4 }} />}
                </Typography>
            }

            data={data}
            columns={columns}
            options={options}
            {...props}
        />
    );
}