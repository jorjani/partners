import { Typography, TextField, Grid, TextareaAutosize, RadioGroup, Radio, FormControlLabel, Button } from '@mui/material';
import { useState, useEffect, useContext } from 'react';
export const ProjectConfigForm = (props) => {
    const [editable, setEditable] = useState(true);
    const checkValid = () => {
        let check1 = props.input1.length > 0 && props.input2.length > 0 && props.input3.length > 0 && props.input4.length > 0 && props.input5.length > 0 && props.input6.length > 0 && props.input7.length > 0 && props.input8.length > 0 && props.input13.length > 0; 
        return check1;
    }
    useEffect(() => {
        props.setValid(checkValid())
        console.log(checkValid())
    } , [props.input1, props.input2, props.input3, props.input4, props.input5, props.input6, props.input7, props.input8, props.input9, props.input12, props.input13]);
    return (
        <Grid
            container
            spacing={3}
        >
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
                    defaultValue={props.input1}
                    onChange={e => props.setInput1(e.target.value)}
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
                    defaultValue={props.input2}
                    onChange={e => props.setInput2(e.target.value)}
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
                    defaultValue={props.input3}
                    onChange={e => props.setInput3(e.target.value)}
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
                    defaultValue={props.input4}
                    onChange={e => props.setInput4(e.target.value)}
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
                    defaultValue={props.input5}
                    onChange={e => props.setInput5(e.target.value)}
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
                    defaultValue={props.input6}
                    onChange={e => props.setInput6(e.target.value)}
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
                    defaultValue={props.input7}
                    onChange={e => props.setInput7(e.target.value)}
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
                    defaultValue={props.input8}
                    onChange={e => props.setInput8(e.target.value)}
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
                    value={props.input9}
                    defaultValue={props.input9}
                    onChange={e => props.setInput9(e.target.value)}
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
                    defaultValue={props.input10}
                    onChange={e => props.setInput10(e.target.value)}
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
                    defaultValue={props.input11}
                    onChange={e => props.setInput11(e.target.value)}
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
                    value={props.input12}
                    defaultValue={props.input12}
                    onChange={e => props.setInput12(e.target.value)}
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
                    defaultValue={props.input13}
                    onChange={e => props.setInput13(e.target.value)}
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
                    value={props.input14}
                    defaultValue={props.input14}
                    onChange={e => props.setInput14(e.target.value)}
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
