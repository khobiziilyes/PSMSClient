import React from 'react';
import { Box, Typography, colors, makeStyles } from '@material-ui/core';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import PeopleIcon from '@material-ui/icons/PeopleOutlined';
import BasicCard from './BasicCard';

const useStyles = makeStyles((theme) => ({
    differenceIcon: {
        color: colors.green[900]
    },
    differenceValue: {
        color: colors.green[900],
        marginRight: theme.spacing(1)
    }
}));

const TotalCustomers = () => {
    const classes = useStyles();

    return (
        <BasicCard text='TOTAL CUSTOMERS' value='1,600' icon={PeopleIcon} iconColor={colors.green[600]}>
            <Box mt={2} display="flex" alignItems="center">
                <ArrowUpwardIcon className={classes.differenceIcon} />
                
                <Typography className={classes.differenceValue} variant="body2">
                    16%
                </Typography>
                
                <Typography color="textSecondary" variant="caption">
                    Since last month
                </Typography>
            </Box>
        </BasicCard>
    );
}

export default TotalCustomers;