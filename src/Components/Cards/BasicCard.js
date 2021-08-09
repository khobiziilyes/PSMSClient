import React from 'react';
import { Avatar, Card, CardContent, Grid, Typography, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
    root: {
        height: '100%'
    },
    avatar: {
        backgroundColor: props => props.iconColor,
        height: 56,
        width: 56
    }
}));

const BasicCard = props => {
    const classes = useStyles(props);
    
    return (
        <Card className={classes.root}>
            <CardContent>
                <Grid container justify="space-between" spacing={3}>
                    <Grid item>
                        <Typography color="textSecondary" gutterBottom variant="h6">
                            { props.text }
                        </Typography>
                        
                        <Typography color="textPrimary" variant="h3">
                            { props.value }
                        </Typography>
                    </Grid>

                    <Grid item>
                        <Avatar className={classes.avatar}>
                            <props.icon />
                        </Avatar>
                    </Grid>
                </Grid>

                { props.children }
            </CardContent>
        </Card>
    );
}

export default BasicCard;