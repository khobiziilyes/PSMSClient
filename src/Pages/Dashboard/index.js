import React from 'react';
import { HorizontalBar, Line, Doughnut } from 'react-chartjs-2';
import { Container, Grid, CardContent, Card } from '@material-ui/core';

import Budget from './Cards/Budget';
import TotalCustomers from './Cards/TotalCustomers';
import TasksProgress from './Cards/TasksProgress';

const data = {
    labels: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    datasets: [
        {
            label: 'First week',
            backgroundColor: 'rgba(255,99,132,0.2)',
            borderColor: 'rgba(255,99,132,1)',
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(255,99,132,0.4)',
            hoverBorderColor: 'rgba(255,99,132,1)',
            data: [0, 1, 2, 3, 4, 5, 6]
        }
    ]
};

const barOptions = {
    data,
    width: 100,
    height: 250,
    options: {
        maintainAspectRatio: false
    }
};

const Dashboard = () => {
   return (
        <Container maxWidth>
            <Grid container spacing={3}>
                <Grid item xs>
                    <Budget />
                </Grid>
                
                <Grid item xs>
                    <TotalCustomers />
                </Grid>

                <Grid item xs>
                    <TasksProgress />
                </Grid>
            </Grid>

            <Grid container spacing={3} justify='space-between'>
                <Grid item xs={5}>
                    <Card>
                        <CardContent>
                            <HorizontalBar {...barOptions} />
                        </CardContent>
                    </Card>
                </Grid>
                
                <Grid item xs={3}>
                    <Card>
                        <CardContent>
                            <Doughnut data={data} {...barOptions}/>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={4}>
                    <Card>
                        <CardContent>
                            <Line data={data} {...barOptions}/>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    );
}

export default Dashboard;