import { Typography, TextField, Grid, TextareaAutosize, RadioGroup, Radio, FormControlLabel, Button } from '@mui/material';
import { useState, useEffect, useContext } from 'react';
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import Swal from "sweetalert2";
import Axios from "axios";
import UserContext from 'src/context/UserContext';
export const Form = (props) => {
    const [config, setConfig] = useState({});
    const [editable, setEditable] = useState(false);
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
    const {userData} = useContext(UserContext);
    useEffect(() => {
        setConfig(props.project.config)
    }, [props.project]);
    useEffect(() => {
        //load all inputs from config
        if (config) {
            setInput1(config.goal);
            setInput2(config.existing_software);
            setInput3(config.intended_users);
            setInput4(config.key_features);
            setInput5(config.value);
            setInput6(config.sensitive_info);
            setInput7(config.post_completion);
            setInput8(config.external_dependencies);
            setInput9(config.waitlist);
            setInput10(config.pitch);
            setInput11(config.info);
            setInput12(config.coworkers);
            setInput13(config.staff_background);
            setInput14(config.publish_status);
        }
    }, [config]);
    const formAction = () => {
        if (editable) {
            saveForm();
            setEditable(false);
        } else {
            setEditable(true);
        }
    };
    const canEdit = () => {
        //check if current user is the owner of the project
        if(!userData.user || !props.project.contact_info){
            return false;
        }
        return userData.user._id === props.project.contact_info.ref_id;
    }  
    const saveForm = async () => {
        let config = {
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
        };
        await Axios.put(`http://localhost:5000/api/projects/${props.project._id}`, { config: config });
        Swal.fire({
            title: 'Saved!',
            text: 'Your changes have been saved.',
            icon: 'success',
            confirmButtonText: 'Cool'
        })
    }
    return (
        <Grid
            container
            spacing={3}
        >
            {canEdit() ? (
                <Grid item
                    mr={3}
                    lg={2}
                    sm={2}
                    xl={2}
                    xs={2}>
                    <Button
                        variant="outlined"
                        href="#outlined-buttons"
                        startIcon={!editable ? <EditIcon /> : <SaveIcon />}
                        onClick={() => formAction()}
                    >
                        {!editable ? "Edit" : "Save"}
                    </Button>
                </Grid>
            ) : (<></>)}
            <Grid
                item
                lg={12}
                sm={12}
                xl={12}
                xs={12}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center'
                }}
            >
            </Grid>
            <Grid
                item
                lg={3}
                sm={3}
                xl={3}
                xs={3}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center'
                }}
            >
                <Typography
                    color="textPrimary"
                    variant="h6"

                >
                    What is it you'd like to build (an app, a website, a plugin, desktop software, etc.)? Please let us know if you want a specific technology to be used (e.g., iOS, Android, Java, etc.)
                </Typography>
            </Grid>
            <Grid
                item
                lg={9}
                sm={9}
                xl={9}
                xs={9}
            >
                <TextField
                    disabled={!editable}
                    id="standard-multiline-flexible"
                    multiline
                    maxRows={4}
                    defaultValue={input1}
                    onChange={e => setInput1(e.target.value)}
                    variant="standard"
                />
            </Grid>
            <Grid
                item
                lg={3}
                sm={3}
                xl={3}
                xs={3}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center'
                }}
            >
                <Typography
                    color="textPrimary"
                    variant="h6"

                >
                    Is there an existing software to work on or is it a completely new project? Please provide as much details as you know about the technology used. Feel free to share a link if it's already posted on a website (e.g., Riipen) or is currently available online.

                </Typography>
            </Grid>
            <Grid
                item
                lg={9}
                sm={9}
                xl={9}
                xs={9}
            >
                <TextField
                    disabled={!editable}
                    multiline
                    maxRows={4}
                    defaultValue={input2}
                    onChange={e => setInput2(e.target.value)}
                    variant="standard"
                />
            </Grid>
            <Grid
                item
                lg={3}
                sm={3}
                xl={3}
                xs={3}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center'
                }}
            >
                <Typography
                    color="textPrimary"
                    variant="h6"

                >
                    Who are the intended users/beneficiaries/stakeholders of the project?

                </Typography>
            </Grid>
            <Grid
                item
                lg={9}
                sm={9}
                xl={9}
                xs={9}
            >
                <TextField
                    disabled={!editable}
                    multiline
                    maxRows={4}
                    defaultValue={input3}
                    onChange={e => setInput3(e.target.value)}
                    variant="standard"
                />
            </Grid>
            <Grid
                item
                lg={3}
                sm={3}
                xl={3}
                xs={3}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center'
                }}
            >
                <Typography
                    color="textPrimary"
                    variant="h6"

                >
                    In simple terms, list the key functionality/features from the perspective of the users you identified. Think in terms of capabilities and less in terms of specifics. Please list everything that comes to mind and clarify priorities. Take describing Google Search as an example: Users can type a question about anything into a search bar and get a list of relevant results.

                </Typography>
            </Grid>
            <Grid
                item
                lg={9}
                sm={9}
                xl={9}
                xs={9}
            >
                <TextField
                    disabled={!editable}
                    multiline
                    maxRows={4}
                    defaultValue={input4}
                    onChange={e => setInput4(e.target.value)}
                    variant="standard"
                />
            </Grid>
            <Grid
                item
                lg={3}
                sm={3}
                xl={3}
                xs={3}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center'
                }}
            >
                <Typography
                    color="textPrimary"
                    variant="h6"

                >
                    What value would it bring to your organization? (Please explain it for students so they are more motivated to choose to work on this project.)

                </Typography>
            </Grid>
            <Grid
                item
                lg={9}
                sm={9}
                xl={9}
                xs={9}
            >
                <TextField
                    disabled={!editable}
                    multiline
                    maxRows={4}
                    defaultValue={input5}
                    onChange={e => setInput5(e.target.value)}
                    variant="standard"
                />
            </Grid>
            <Grid
                item
                lg={3}
                sm={3}
                xl={3}
                xs={3}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center'
                }}
            >
                <Typography
                    color="textPrimary"
                    variant="h6"

                >
                    Will the project handle sensitive information (e.g. financial transactions, medical records, personally identifiable information, etc.)?

                </Typography>
            </Grid>
            <Grid
                item
                lg={9}
                sm={9}
                xl={9}
                xs={9}
            >
                <TextField
                    disabled={!editable}
                    multiline
                    maxRows={4}
                    defaultValue={input6}
                    onChange={e => setInput6(e.target.value)}
                    variant="standard"
                />
            </Grid>
            <Grid
                item
                lg={3}
                sm={3}
                xl={3}
                xs={3}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center'
                }}
            >
                <Typography
                    color="textPrimary"
                    variant="h6"

                >
                    What is your next step after the project is complete? This helps us understand how developed the project needs to be. Some partners only want initial mockups to get feedback/approval, some want to share with early users, some want to go live immediately

                </Typography>
            </Grid>
            <Grid
                item
                lg={9}
                sm={9}
                xl={9}
                xs={9}
            >
                <TextField
                    disabled={!editable}
                    multiline
                    maxRows={4}
                    defaultValue={input7}
                    onChange={e => setInput7(e.target.value)}
                    variant="standard"
                />
            </Grid>
            <Grid
                item
                lg={3}
                sm={3}
                xl={3}
                xs={3}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center'
                }}
            >
                <Typography
                    color="textPrimary"
                    variant="h6"

                >
                    Do you depend on any external resources to move the project forward? Examples include needing design, hardware, software access, expertise, permits, approval, etc. that cannot be provided by your team? If yes, Please explain.

                </Typography>
            </Grid>
            <Grid
                item
                lg={9}
                sm={9}
                xl={9}
                xs={9}
            >
                <TextField
                    disabled={!editable}
                    multiline
                    maxRows={4}
                    defaultValue={input8}
                    onChange={e => setInput8(e.target.value)}
                    variant="standard"
                />
            </Grid>
            <Grid
                item
                lg={3}
                sm={3}
                xl={3}
                xs={3}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center'
                }}
            >
                <Typography
                    color="textPrimary"
                    variant="h6"

                >
                    If your project is not matched this term, do you want us to share it with the students next term? (Terms are January-April & September-December)
                </Typography>
            </Grid>
            <Grid
                item
                lg={9}
                sm={9}
                xl={9}
                xs={9}
            >
                <RadioGroup
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="controlled-radio-buttons-group"
                    value={input9}
                    defaultValue={input9}
                    onChange={e => setInput9(e.target.value)}
                >
                    <FormControlLabel disabled={!editable} value={true} control={<Radio />} label="Yes" />
                    <FormControlLabel disabled={!editable} value={false} control={<Radio />} label="No" />
                </RadioGroup>
            </Grid>
            <Grid
                item
                lg={3}
                sm={3}
                xl={3}
                xs={3}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center'
                }}
            >
                <Typography
                    color="textPrimary"
                    variant="h6"

                >
                    (Optional) Some partners choose to include a pitch video where they talk about the organization, the benefits, and the project ambitions. If you like to do so please upload your pitch online and share a link below.
                </Typography>
            </Grid>
            <Grid
                item
                lg={9}
                sm={9}
                xl={9}
                xs={9}
            >
                <TextField
                    disabled={!editable}
                    multiline
                    maxRows={4}
                    defaultValue={input10}
                    onChange={e => setInput10(e.target.value)}
                    variant="standard"
                />
            </Grid>
            <Grid
                item
                lg={3}
                sm={3}
                xl={3}
                xs={3}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center'
                }}
            >
                <Typography
                    color="textPrimary"
                    variant="h6"

                >
                    (Optional) If there is a link with more information, please share here
                </Typography>
            </Grid>
            <Grid
                item
                lg={9}
                sm={9}
                xl={9}
                xs={9}
            >
                <TextField
                    disabled={!editable}
                    multiline
                    maxRows={4}
                    defaultValue={input11}
                    onChange={e => setInput11(e.target.value)}
                    variant="standard"
                />
            </Grid>
            <Grid
                item
                lg={3}
                sm={3}
                xl={3}
                xs={3}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center'
                }}
            >
                <Typography
                    color="textPrimary"
                    variant="h6"

                >
                    Do you have a volunteers/staff available to work with us on the project throughout the project?
                </Typography>
            </Grid>
            <Grid
                item
                lg={9}
                sm={9}
                xl={9}
                xs={9}
            >
                <RadioGroup
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="controlled-radio-buttons-group"
                    value={input12}
                    defaultValue={input12}
                    onChange={e => setInput12(e.target.value)}
                >
                    <FormControlLabel disabled={!editable} value={true} control={<Radio />} label="Yes" />
                    <FormControlLabel disabled={!editable} value={false} control={<Radio />} label="No" />
                </RadioGroup>
            </Grid>
            <Grid
                item
                lg={3}
                sm={3}
                xl={3}
                xs={3}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center'
                }}
            >
                <Typography
                    color="textPrimary"
                    variant="h6"

                >
                    Briefly describe the technical background, if any, of your volunteers/staff that would be assigned to this
                </Typography>
            </Grid>
            <Grid
                item
                lg={9}
                sm={9}
                xl={9}
                xs={9}
            >
                <TextField
                    disabled={!editable}
                    multiline
                    maxRows={4}
                    defaultValue={input13}
                    onChange={e => setInput13(e.target.value)}
                    variant="standard"
                />
            </Grid>
            <Grid
                item
                lg={3}
                sm={3}
                xl={3}
                xs={3}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center'
                }}
            >
                <Typography
                    color="textPrimary"
                    variant="h6"

                >
                    In addition to gaining experience and working with you, students want to publish their work for professional reasons (e.g., to get jobs). Please choose the most permissive option that your organization can agree to.
                </Typography>
            </Grid>
            <Grid
                item
                lg={9}
                sm={9}
                xl={9}
                xs={9}
            >
                <RadioGroup
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="controlled-radio-buttons-group"
                    value={input14}
                    defaultValue={input14}
                    onChange={e => setInput14(e.target.value)}
                >
                    <FormControlLabel disabled={!editable} value={0} control={<Radio />} label="Students can publish source code (e.g., on GitHub), design, and the software" />
                    <FormControlLabel disabled={!editable} value={1} control={<Radio />} label="Students can publish the source code and design but not the software itself" />
                    <FormControlLabel disabled={!editable} value={2} control={<Radio />} label="Students can mention the project (e.g., on their resume) but not publish source code or working software" />
                    <FormControlLabel disabled={!editable} value={3} control={<Radio />} label="None of the above." />
                </RadioGroup>
            </Grid>
        </Grid >
    )
}
