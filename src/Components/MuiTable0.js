import React from 'react';
import { CircularProgress, Typography } from '@material-ui/core';
import MUIDataTable from "mui-datatables";

const columns = [
    {
        name: 'id',
        label: 'ID'
    },
    {
        name: 'first_name',
        label: 'First Name'
    },
    {
        name: 'last_name',
        label: 'Last Name'
    },
    {
        name: 'email',
        label: 'Email'
    }
];

const fetchData = (url, page, per_page) => {
    return new Promise((resolve, reject) => {
        fetch(url + '?page=' + page + '&per_page=' + per_page).then(response => response.json()).then(response => {
            resolve({
                data: response.data,
                total: response.total,
                page: response.page - 1
            });
        });
    });
}

export default function Stock() {
    const [state, setState] = React.useState({
        isLoading: true,
        page: 0,
        rowsPerPage: 3
    });

    const changePage = (page, per_page) => {
        setState({ isLoading: true });

        fetchData('https://reqres.in/api/users', page + 1, per_page).then(response => {
            setState({
                isLoading: false,
                rowsPerPage: response.per_page,
                page: response.page,
                data: response.data,
                count: response.total
            });
        });
    }
    
    React.useEffect(() => changePage(state.page, state.rowsPerPage), [])
    
    const { isLoading, page, rowsPerPage, count, data } = state;

    const options = {
        page: page,
        rowsPerPage: rowsPerPage,
        count: count,
        filter: true,
        filterType: 'dropdown',
        responsive: 'vertical',
        serverSide: true,
        rowsPerPageOptions: [2, 3, 6, 7, 13],
        onTableChange: (action, tableState) => {
            if (['changePage', 'changeRowsPerPage'].includes(action))
                changePage(tableState.page, tableState.rowsPerPage);
        }
    }

    return (
        <div>
            <MUIDataTable
                title={
                    <Typography variant="h6">
                       ACME Employee list
                        {isLoading && <CircularProgress size={24} style={{ marginLeft: 15, position: 'relative', top: 4 }} />}
                    </Typography>
                }

                data={data}
                columns={columns}
                options={options}
            />
        </div>
    );
}