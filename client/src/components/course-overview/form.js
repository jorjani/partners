import { Typography, Grid, TextareaAutosize, TextField } from '@mui/material';
import { useState } from 'react';
export const Form = (props) => {
    const [input1, setInput1] = useState("");
    const [input2, setInput2] = useState("");
    const [input3, setInput3] = useState("");
    const [input4, setInput4] = useState("");
    const [input5, setInput5] = useState("");
    const [input6, setInput6] = useState("");
    const [input7, setInput7] = useState("");
    const [input8, setInput8] = useState("");
    return (
        <Grid
            container
            spacing={3}
        >
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
                    Executive Summaries
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
                    disabled={!props.editable}
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
                    Project Overview & Examples
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
                    disabled={!props.editable}
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
                    Program Requirements & Expectations
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
                    disabled={!props.editable}
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
                    Partner Testimonials
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
                    disabled={!props.editable}
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
                    Optional Webinar
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
                    disabled={!props.editable}
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
                    Proposal Submittion (Next Step)
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
                    disabled={!props.editable}
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
                    Estimated Program Timeline
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
                    disabled={!props.editable}
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
                    FAQs
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
                    disabled={!props.editable}
                    multiline
                    maxRows={4}
                    defaultValue={input8}
                    onChange={e => setInput8(e.target.value)}
                    variant="standard"
                />
            </Grid>
        </Grid >
    )
}
