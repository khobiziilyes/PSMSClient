import { FormControl } from '@material-ui/core';
import DatePicker from '@Components/DatePicker';
import { formatTimestamp } from '@src/Consts';

const idColumn = {
    name: 'id',
    label: 'ID',
    options: {
        filter: false,
        customBodyRender: value => '#' + value
    }
}

const timeColumnDisplay = labels => (filterList, onChange, index, column) => {
    return (
        <FormControl>
            {[0, 1].map(i => 
                <DatePicker
                    label={labels[i]}
                    onChange={newVal => {
                        filterList[index][i] = newVal;
                        onChange(filterList[index], index, column);
                    }}
                    key={'DatePicker-' + i}
                />
            )}
        </FormControl>
    );
}

function getUserId(value) {
    return value.substr(value.indexOf('#') + 1);   
}

const createTimeUserColumns = ({ user, time, timeDisplayArray }) => [
    {
        options: {
            filterType: 'dropdown',
        },
        formatValue: getUserId,
        ...user
    },
    {
        options: {
            filterType: 'custom',
            customBodyRender: formatTimestamp,
            filterOptions: {
                display: timeColumnDisplay(timeDisplayArray)
            },
            customFilterListOptions: {
                render: v => v.filter(i => !!i).map(i => formatTimestamp(i, false)),
                update: (filterList, filterPos, index) => {
                    filterList[index].splice(filterPos, 1);
                    return filterList;
                }
            }
        },
        ...time
    }
];

const creationColumns = createTimeUserColumns({
    user: {
        name: 'created_by',
        label: 'Creator',
        filterName: ['createdBy']
    },
    time: {
        name: 'created_at',
        label: 'Created',
        filterName: ['createdBefore', 'createdAfter']
    },
    timeDisplayArray: ['Created Before', 'Created After']
});

const updateColumns = createTimeUserColumns({
    user: {
        name: 'updated_by',
        label: 'Updator',
        filterName: ['updatedBy']
    },
    time: {
        name: 'updated_at',
        label: 'Updated',
        filterName: ['updatedBefore', 'updatedAfter']
    },
    timeDisplayArray: ['Updated Before', 'Updated After']
});

const makeTotalColumns = (columns, includeCreateColumns, includeUpdateColumns) => [
    idColumn,
    ...columns,
    ...(includeCreateColumns ? creationColumns : []),
    ...(includeUpdateColumns ? updateColumns : [])
];

export {
    idColumn,
    updateColumns,
    creationColumns,
    makeTotalColumns
}