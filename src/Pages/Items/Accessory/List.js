import React from 'react';
import MuiTable from '@Components/MuiTable';
import { useRecoilValue } from 'recoil';
import { accessoriesNamesAtom } from '@src/Atoms';
import ShowAccessory from './Show';

const columns = (accessoriesNames) => [
    {
        name: 'brand',
        label: 'Brand'
    },
    {
        name: 'name',
        label: 'Name'
    },
    {
        name: 'type_id',
        label: 'Type',
        options: {
            hint: 'SUP bitch',
            customBodyRender: (value, tableMeta, updateValue) => accessoriesNames[value]
        }

    }
];

export default function AccessoriesList() {
    const accessoriesNames = useRecoilValue(accessoriesNamesAtom);

    return (
        <MuiTable
            title="Accessories list"
            URL="/accessories"
            columns={columns(accessoriesNames)}
            getNameFromData={rowData => 'Accessories | ' + rowData.brand + ' | ' + rowData.name}
            DetailsContent={<ShowAccessory />}
            formName={'Accessory'}
        />
    );
}