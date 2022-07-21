import { Typography, Grid, TextareaAutosize} from '@mui/material';
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
                <TextareaAutosize
                    disabled={!props.editable}
                    defaultValue={input1}
                    size="large"
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
                <TextareaAutosize
                    disabled={!props.editable}
                    defaultValue={input2}
                    size="large"
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
                    Program Requirements & Expectaions
                </Typography>
            </Grid>
            <Grid
                item
                lg={9}
                sm={9}
                xl={9}
                xs={9}
            >
                <TextareaAutosize
                    disabled={!props.editable}
                    defaultValue={input3}
                    size="large"
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
                <TextareaAutosize
                    disabled={!props.editable}
                    defaultValue={input4}
                    size="large"
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
                <TextareaAutosize
                        disabled={!props.editable}
                    defaultValue={input5}
                    size="large"
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
                <TextareaAutosize
disabled={!props.editable}
                    defaultValue={input6}
                    size="large"
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
                <TextareaAutosize
disabled={!props.editable}
                    defaultValue={input7}
                    size="large"
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
                <TextareaAutosize
                    disabled={!props.editable}
                    defaultValue={input8}
                    size="large"
                />
            </Grid>
        </Grid >
    )
}
