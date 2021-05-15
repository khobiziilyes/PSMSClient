import React from 'react';
import * as Yup from 'yup';

import { Typography, Grid, Step, Stepper, StepLabel, Button } from '@material-ui/core';
import Text from '@Components/Inputs/Text';
import { makeStyles } from '@material-ui/styles';
import Autocomplete from '@Components/Inputs/Autocomplete';
import BasicInformations from './BasicInformations';

const formikParams = {
    initialValues: {
        
    },
    validationSchema: Yup.object({
        
    })
}

const steps = ['Basic informations', 'Review operation'];

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
            return <></>;
        default:
            throw new Error('Unknown step');
    }
}

function TheForm({ isSubmitting, isBuy }) {
    const [activeStep, setActiveStep] = React.useState(0);
    const handleNext = () => setActiveStep(activeStep + 1);
    const handleBack = () => setActiveStep(activeStep - 1);

    const classes = useStyles();

	return (
		<>
            <Stepper activeStep={activeStep}>
                {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>

            <Typography variant="h6" gutterBottom> {steps[activeStep]} </Typography>
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
                            {activeStep !== 0 && (
                                <Button onClick={handleBack} className={classes.button}> Back </Button>
                            )}

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
		</>
	);
}

export {
    formikParams,
    TheForm
}