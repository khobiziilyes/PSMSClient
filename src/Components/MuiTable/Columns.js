import { FormControl } from '@material-ui/core';
import DatePicker from '@Components/DatePicker';

const idColumn = {
    name: 'id',
    label: 'ID',
    options: {
        filter: false,
        customBodyRender: (value) => '#' + value
    }
}

const timeColumnDisplay = (labels) => (filterList, onChange, index, column) => {
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

const updateColumns = [
    {
        name: 'updated_by',
        label: 'Updator',
        options: {
            filterType: 'dropdown'
        },
        filterName: 'updatedBy'
    },
    {
        name: 'updated_at',
        label: 'Updates',
        filterName: ['updatedBefore', 'updatedAfter'],
        options: {
            filterType: 'custom',
            filterOptions: {
                display: timeColumnDisplay(['Updated Before', 'Updated After'])
            }
        }
    }
];

const creationColumns = [
    {
        name: 'created_by',
        label: 'Creator',
        options: {
            filterType: 'dropdown'
        },
        filterName: 'createdBy'
    },
    {
        name: 'created_at',
        label: 'Creates',
        filterName: ['createdBefore', 'createdAfter'],
        options: {
            filterType: 'custom',
            filterOptions: {
                display: timeColumnDisplay(['Created Before', 'Created After'])
            }
        }
    }
];

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