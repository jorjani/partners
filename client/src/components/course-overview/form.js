import { Typography, Grid, TextareaAutosize, TextField } from '@mui/material';
import { useState } from 'react';
export const Form = (props) => {
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
                    Proposal Submission (Next Step)
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
                    defaultValue={props.input8}
                    onChange={e => props.setInput8(e.target.value)}
                    variant="standard"
                />
            </Grid>
        </Grid >
    )
}
