import React from 'react';
import { Box, Typography, colors, makeStyles } from '@material-ui/core';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import MoneyIcon from '@material-ui/icons/Money';
import BasicCard from './BasicCard';

const useStyles = makeStyles((theme) => ({
    differenceIcon: {
        color: colors.red[900]
    },
    differenceValue: {
        color: colors.red[900],
        marginRight: theme.spacing(1)
    }
}));

const Budget = () => {
    const classes = useStyles();

    return (
        <BasicCard text='BUDGET' value='$23,000' icon={MoneyIcon} iconColor={colors.red[600]}>
            <Box mt={2} display="flex" alignItems="center">
                <ArrowDownwardIcon className={classes.differenceIcon} />
                
                <Typography className={classes.differenceValue} variant="body2">
                    12%
                </Typography>
                
                <Typography color="textSecondary" variant="caption">
                    Since last month
                </Typography>
            </Box>
        </BasicCard>
    );
}

export default Budget;