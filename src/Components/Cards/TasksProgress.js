import React from 'react';
import { Box, colors, LinearProgress } from '@material-ui/core';
import InsertChartIcon from '@material-ui/icons/InsertChartOutlined';

import BasicCard from './BasicCard';

const TasksProgress = () => {
    return (
        <BasicCard text='TASKS PROGRESS' value='75.5%' icon={InsertChartIcon} iconColor={colors.orange[600]}>
            <Box mt={3}>
                <LinearProgress value={75.5} variant="determinate" color="secondary"/>
            </Box>
        </BasicCard>
    );
}

export default TasksProgress;