import React from 'react';
import Form from '@Components/Form';
import { Typography, Grid, Step, Stepper, StepLabel, Button } from '@material-ui/core';
import TextField from '@Components/TextField';
import { makeStyles } from '@material-ui/styles';
import Autocomplete from '@Components/Autocomplete';
import BasicInformations from './BasicInformations';

const steps = ['Basic informations', 'IMEI codes', 'Review operation'];

const useStyles = makeStyles((theme) => ({
    buttons: {
        display: 'flex',
        justifyContent: 'flex-end'
    },
    button: {
        marginTop: theme.spacing(3),
        marginLeft: theme.spacing(1)
    }
}));

function getStepContent(step) {
    switch (step) {
        case 0:
            return <BasicInformations />;
        case 1:
            return <IMEICodes quantity={7} isBu />;
        case 2:
            return <></>;
        default:
            throw new Error('Unknown step');
    }
}

function IMEICodes({quantity, isBuy}) {
    var theInputs = [];

    for (var i = 1; i <= quantity; i++) {
        const props = {
            label: "IMEI " + i,
            name: "IMEI" + i,
            required: true
        };

        theInputs.push(
            <Grid item xs={4}> 
                { isBuy ? (
                    <TextField {...props} />
                ) : (
                    <Autocomplete {...props} options={['Just', 'For', 'Fun']} />)
                }
            </Grid>
        );
    }

    return (
        <Grid container spacing={3}>
            {theInputs}
        </Grid>
    );
}

const CreateBuy = ({isBuy}) => {
    const [activeStep, setActiveStep] = React.useState(0);

    const handleNext = () => 
        setActiveStep(activeStep + 1);

    const handleBack = () => 
        setActiveStep(activeStep - 1);

    const classes = useStyles();

	return (
		<Form title={'Perform new ' + (isBuy ? 'buy' : 'sell')}>
            <Stepper activeStep={activeStep}>
                {
                    steps.map((label) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))
                }
            </Stepper>

            <Typography variant="h6" gutterBottom>
                {steps[activeStep]}
            </Typography>

            {
                activeStep === steps.length ? (
                    <>
                        <Typography variant="h5" gutterBottom>
                            Thank you for your order.
                        </Typography>
                    </>
                    ) : (
                    <>
                        {getStepContent(activeStep)}

                        <div className={classes.buttons}>
                            {
                                activeStep !== 0 && (
                                    <Button onClick={handleBack} className={classes.button}> Back </Button>
                                )
                            }

                            <Button
                                className={classes.button}
                                variant="contained"
                                color="primary"
                                onClick={handleNext}
                            > {activeStep === steps.length - 1 ? 'Submit' : 'Next'} </Button>
                        </div>
                    </>
                )
            }
		</Form>
	);
}

export default CreateBuy;