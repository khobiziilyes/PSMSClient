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

const timeColumn = (name, label, filterName, labels) => ({
    name,
    label,
    filterName,
    options: {
        filterType: 'custom',
        filterOptions: {
            display: (filterList, onChange, index, column) => {
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
        }
    }
});

const updateColumns = [
    {
        name: 'updated_by',
        label: 'Updator',
        options: {
            filterType: 'dropdown'
        },
        filterName: 'updatedBy'
    },
    timeColumn('updated_at', 'Updates', ['updatedBefore', 'updatedAfter'], ['Updated Before', 'Updated After'])
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
    timeColumn('created_at', 'Creates', ['createdBefore', 'createdAfter'], ['Created Before', 'Created After'])
];

const makeTotalColumns = (columns, includeUpdateColumns) => [
    idColumn,
    ...columns,
    ...creationColumns,
    ...(includeUpdateColumns ? updateColumns : [])
];

export {
    idColumn,
    updateColumns,
    creationColumns,
    makeTotalColumns
}