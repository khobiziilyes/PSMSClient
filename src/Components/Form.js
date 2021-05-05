import React from 'react';
import { Grid, Paper, Typography, Switch, FormControlLabel } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
	paper: {
		padding: theme.spacing(2),
		[theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
			padding: theme.spacing(3)
		}
	},
	button: {
    	display: 'flex',
    	justifyContent: 'flex-end',
    	marginTop: theme.spacing(3),
    	marginLeft: theme.spacing(1)
  	},
  	switch: {
    	display: 'flex',
    	justifyContent: 'flex-end'
  	}
}));

const Form = (props) => {
	const { title } = props;
	const classes = useStyles();

	return (
		<Grid container justify="center">
			<Grid item xs={7}>
				<Paper className={classes.paper}>
					<Typography component="h1" variant="h4" align="center">
						{title}
					</Typography>

					{props.children}
					
					{/*<div className={classes.button}>
						<Button variant="contained" color="primary" className={classes.button}>
	                  		Submit
	                  	</Button>
                  	</div>*/}

                  	<div className={classes.switch}>
                  		<FormControlLabel control={<Switch />} label="Come back" />
                  	</div>
				</Paper>
			</Grid>
		</Grid>
	);
}

export default Form;