import React from 'react';
import * as Yup from 'yup';

import Grid from '@material-ui/core/Grid';
import Autocomplete from '@Components/Inputs/Autocomplete';
import Notes from '@Components/Inputs/Notes';
import Text from '@Components/Inputs/Text';

import ItemToggle from '@Components/ItemToggle';
import Box from '@material-ui/core/Box';

const formikParams = {
    initialValues: {
        item_id: '',
        Delta: ''
    },
    validationSchema: Yup.object({
        item_id: Yup.string().required('Required'),
        Delta: Yup.string().required('Required')
    })
}

function ComplicatedGrid(props) {
    return (
        <Grid item xs={4}>
            <Box visibility={props.visibility || 'visible'}>
                <Grid container spacing={3} direction="column">
                    {props.children}
                </Grid>
            </Box>
        </Grid>
    );
}

function TheForm({ isSubmitting, isBuy }) {
    const [itemType, handleItemTypeChange] = React.useState('accessory');
    const callBack = (newItemType) => handleItemTypeChange(newItemType);

    return (
        <Grid container spacing={3}>
            <Grid item xs={12} style={{ textAlign: "center" }}>
                <ItemToggle callBack={callBack} value={itemType} />
            </Grid>

            <ComplicatedGrid>
                <Grid item xs={12}>
                    <Autocomplete name="item_id" label={"Select the " + itemType} options={['Some', 'Text']} />
                </Grid>

                <Grid item xs={12}>
                    <Autocomplete name="Delta" label={"Select the " + ((itemType === 'phone') ? 'version' : 'quality')} options={['Idk', 'Haha']} />
                </Grid>
            </ComplicatedGrid>

            <ComplicatedGrid>
                <Grid item xs={12}>
                    <Text name="b" label="Cost per item" />
                </Grid>

                <Grid item xs={12}>
                    <Text name="a" label="Quantity" />
                </Grid>
            </ComplicatedGrid>
            
            <ComplicatedGrid>
                <Grid item xs={12}>
                    <Autocomplete
                        name="person_id"
                        options={['Redmi', 'Samsung', 'Nokia']}
                        label="Select the seller"
                    />
                </Grid>
            </ComplicatedGrid>

            <Grid item xs>
                <Notes />
            </Grid>
        </Grid>
    );
}

export {
    formikParams,
    TheForm
}