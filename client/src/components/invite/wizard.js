import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { OrgCreationForm } from './org-creation-form';
import { ProjectCreationForm } from './project-creation-form';
import { ProjectConfigForm } from './project-config-form';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import Axios from 'axios';
const steps = ['Create Organization', 'Create Project', 'Configure Project'];

export default function HorizontalLinearStepper(props) {
  const today = new Date();
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const [orgName, setOrgName] = React.useState('');
  const [website, setWebsite] = React.useState('');
  const [type, setType] = React.useState('');
  const [employeeCount, setEmployeeCount] = React.useState(0);
  const [referralInfo, setReferralInfo] = React.useState('');
  const [projName, setProjName] = React.useState('');
  const [categories, setCategories] = React.useState([]);
  const [startDate, setStartDate] = React.useState(today);
  const [endDate, setEndDate] = React.useState(today);
  const [valid1, setValid1] = React.useState(false);
  const [valid2, setValid2] = React.useState(false);
  const [valid3, setValid3] = React.useState(false);
  const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState("");
  const [input3, setInput3] = useState("");
  const [input4, setInput4] = useState("");
  const [input5, setInput5] = useState("");
  const [input6, setInput6] = useState("");
  const [input7, setInput7] = useState("");
  const [input8, setInput8] = useState("");
  const [input9, setInput9] = useState(false);
  const [input10, setInput10] = useState("");
  const [input11, setInput11] = useState("");
  const [input12, setInput12] = useState(true);
  const [input13, setInput13] = useState("");
  const [input14, setInput14] = useState(0);
  const isStepOptional = (step) => {
    return false;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }
    if (activeStep === 0 && valid1) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      setSkipped(newSkipped);
    }
    if (activeStep === 1 && valid2) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      setSkipped(newSkipped);
    }
    if (activeStep === 2 && valid3) {
      submitForm();
    }
  };
  const getCourseIDFromURL = () => {
    const url = window.location.href;
    const courseID = url.split('/')[4];
    return courseID;
  }
  const submitForm = async () => {
    let resp = await Axios.post('http://localhost:5000/api/organizations/invite', {
      orgName: orgName,
      website: website,
      type: type,
      employeeCount: employeeCount,
      referralInfo: referralInfo,
      projName: projName,
      iterId: getCourseIDFromURL(),
      contactInfo: {
        name: props.name,
        email: props.email,
        role: props.role,
        ref_id: props.ref_id,
      },
      category: categories,
      startDate: startDate,
      endDate: endDate,
      config: {
        goal: input1,
        existing_software: input2,
        intended_users: input3,
        key_features: input4,
        value: input5,
        sensitive_info: input6,
        post_completion: input7,
        external_dependencies: input8,
        waitlist: input9,
        pitch: input10,
        info: input11,
        coworkers: input12,
        staff_background: input13,
        publish_status: input14
      }
    })
    if (resp.status === 200) {
      Swal.fire({
        title: "Success",
        text: "Organization and Project Made",
        icon: "success",
        confirmButtonText: "OK",
      }
      ).then(() => {
        window.location.href = '/dashboard';
      }
      );

    }
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  useEffect(() => {
    console.log(valid3)
  } , [valid3])

  return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          if (isStepOptional(index)) {
            labelProps.optional = (
              <Typography variant="caption">Optional</Typography>
            );
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&apos;re finished
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Typography variant="h5" sx={{ mt: 5, mb: 1 }}>Step {activeStep + 1}</Typography>
          <Box sx={{ display: 'flex', pt: 5 }}>
            {activeStep === 0 ? (
              <OrgCreationForm
                valid={valid1}
                setValid={setValid1}
                input1={orgName}
                setInput1={setOrgName}
                input2={website}
                setInput2={setWebsite}
                input3={type}
                setInput3={setType}
                input4={employeeCount}
                setInput4={setEmployeeCount}
                input5={referralInfo}
                setInput5={setReferralInfo}
              />
            ) : (
              <></>
            )}
            {activeStep === 1 ? (
              <ProjectCreationForm
                valid={valid2}
                setValid={setValid2}
                input1={projName}
                setInput1={setProjName}
                input2={categories}
                setInput2={setCategories}
                input3={startDate}
                setInput3={setStartDate}
                input4={endDate}
                setInput4={setEndDate}
              />

            ) : (<></>)}
            {activeStep === 2 ? (
              <ProjectConfigForm
                valid={valid3}
                setValid={setValid3}
                input1={input1}
                setInput1={setInput1}
                input2={input2}
                setInput2={setInput2}
                input3={input3}
                setInput3={setInput3}
                input4={input4}
                setInput4={setInput4}
                input5={input5}
                setInput5={setInput5}
                input6={input6}
                setInput6={setInput6}
                input7={input7}
                setInput7={setInput7}
                input8={input8}
                setInput8={setInput8}
                input9={input9}
                setInput9={setInput9}

                input10={input10}
                setInput10={setInput10}
                input11={input11}
                setInput11={setInput11}
                input12={input12}
                setInput12={setInput12}
                input13={input13}
                setInput13={setInput13}
                input14={input14}
                setInput14={setInput14}
              />) : (<></>)}
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />
            {isStepOptional(activeStep) && (
              <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                Skip
              </Button>
            )}

            <Button onClick={handleNext}>
              {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
            </Button>
          </Box>
        </React.Fragment>
      )}
    </Box>
  );
}
