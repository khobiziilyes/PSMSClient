import React from 'react';
import { Redirect } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useRecoilState } from 'recoil';
import { userAtom } from '@src/Atoms';
import { Avatar, Button, CssBaseline, Link, Grid, Box, Typography, Container } from '@material-ui/core';

import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';
import Text from '@Components/Inputs/Text';
import Copyright from '@Components/Copyright';

const formikParams = {
    initialValues: {
        email: 'khobizi.ilyes@gmail.com',
        password: 'azerty123'
    },
    validationSchema: Yup.object({
        email: Yup.string().email().required('Required'),
        password: Yup.string().min(8).required('Required')
    })
}

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1)
    },
    submit: {
        margin: theme.spacing(3, 0, 2)
    }
}));

function TextField(props) {
    return (
        <Text
            variant="outlined"
            margin="normal"
            fullWidth
            {...props}
        />
    )
}

export default function Signin() {
    const classes = useStyles();
    const [user, setUser] = useRecoilState(userAtom);

    const onSubmit = (values, { setSubmitting }) => {
        setTimeout(() => {
            setSubmitting(false);
            setUser({'name': values.email});
        }, 4000);
    }

    if (user) return <Redirect to='/dashboard' />;

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                
                <Formik {...formikParams} onSubmit={onSubmit}>
                    {({ submitForm, isSubmitting, isValid, errors, touched }) => (
                        <Form onKeyDown={(e) => (e.key === 'Enter') && submitForm() }>
                            <TextField name="email" label="Email Address" autoFocus />
                            
                            <TextField name="password" label="Password" type="password" />
                            
                            <Button
                                onClick={submitForm}
                                disabled={isSubmitting}
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                            >
                                Sign In
                            </Button>
                            
                            <Grid container>
                                <Grid item xs>
                                    <Link href="#" variant="body2">
                                        Forgot password?
                                    </Link>
                                </Grid>
                                
                                <Grid item>
                                    <Link href="#" variant="body2">
                                        Don't have an account? Sign Up
                                    </Link>
                                </Grid>
                            </Grid>
                        </Form>
                    )}
                </Formik>
            </div>
            
            <Box mt={8}>
                <Copyright />
            </Box>
        </Container>
    );
}