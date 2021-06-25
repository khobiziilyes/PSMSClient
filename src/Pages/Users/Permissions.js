import React from 'react';
import { useRecoilValue } from 'recoil';
import { Field } from 'formik';

import { Switch } from 'formik-material-ui';

import { Grid, FormControlLabel, Typography } from '@material-ui/core';
import { formDialogInitValuesAtom } from '@src/Atoms';

const resourcesList = ['Accessory', 'Item', 'Customer', 'Vendor', 'Phone', 'Buy', 'Sell'];

const formikParams = {
    URL: (id, isCreate) => '/owner/users/' + id + '/permissions',
    dataURL: '/owner/users',
    formSize: 'md'
}

const SwitchWithLabel = ({label, ...props}) => {
    return (
        <FormControlLabel
            control={<Field component={Switch} type="checkbox" {...props} />}
            label={label}
        />
    );
}
    

const PermissionSwitch = ({ method, name, defaultVal, setFieldValue }) => {
    const [state, setState] = React.useState(defaultVal);
    const handleStateChange = (e, newState) => {
        setState(newState);
        setFieldValue(e.target.name, newState);
    }

    return (
        <Grid item>
            <SwitchWithLabel
                label={method}
                name={name}
                checked={state}
                onChange={handleStateChange}
            />
        </Grid>
    );
}

function TheForm({ setFieldValue }) {
    const {id, ...initialValues} = useRecoilValue(formDialogInitValuesAtom);

    return (
        <Grid container spacing={3} justify="center">
            {resourcesList.map(resourceName => 
                <Grid item xs={6} key={"grid-" + resourceName}>
                    <Typography variant="h6" gutterBottom>
                        {resourceName}
                    </Typography>

                    <Grid container spacing={1}>
                        {['Read', 'Write', 'Update'].map(method => {
                            const fullName = 'can' + method + resourceName;
                            
                            return (<PermissionSwitch
                                key={'switch-' + fullName}
                                name={fullName}
                                method={method}
                                defaultVal={initialValues[fullName]}
                                setFieldValue={setFieldValue}
                            />);
                        })}
                    </Grid>
                </Grid>   
            )}
        </Grid>
    );
}

export {
    formikParams,
    TheForm
}