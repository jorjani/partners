import { Typography, Grid, TextField } from '@mui/material';
import { useState, useEffect } from 'react';
export const OrgCreationForm = (props) => {
    const checkValid = () => {
        let check1 = props.input1.length > 0 && props.input2.length > 0 && props.input3.length > 0 && props.input4 > 0 && props.input5.length > 0;
        return check1;
    }
    useEffect(() => {
        props.setValid(checkValid())
    } , [props.input1, props.input2, props.input3, props.input4, props.input5]);
    return (
        <Grid
            container
            spacing={3}
        >
            <Grid
                item
                lg={5}
                sm={5}
                xl={5}
                xs={5}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center'
                }}
            >
                <Typography
                    color="textPrimary"
                    variant="p"

                >
                    Name
                </Typography>
            </Grid>
            <Grid
                item
                lg={7}
                sm={7}
                xl={7}
                xs={7}
            >
                <TextField
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
                lg={5}
                sm={5}
                xl={5}
                xs={5}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center'
                }}
            >
                <Typography
                    color="textPrimary"
                    variant="p"

                >
                    Website
                </Typography>
            </Grid>
            <Grid
                item
                lg={7}
                sm={7}
                xl={7}
                xs={7}
            >
                <TextField
                    multiline
                    maxRows={4}
                    defaultValue={props.input2}
                    onChange={e => props.setInput2(e.target.value)}
                    variant="standard"
                />
            </Grid>
            <Grid
                item
                lg={5}
                sm={5}
                xl={5}
                xs={5}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center'
                }}
            >
                <Typography
                    color="textPrimary"
                    variant="p"

                >
                    Type
                </Typography>
            </Grid>
            <Grid
                item
                lg={7}
                sm={7}
                xl={7}
                xs={7}
            >
                <TextField
                    multiline
                    maxRows={4}
                    defaultValue={props.input3}
                    onChange={e => props.setInput3(e.target.value)}
                    variant="standard"
                />
            </Grid>
            <Grid
                item
                lg={5}
                sm={5}
                xl={5}
                xs={5}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center'
                }}
            >
                <Typography
                    color="textPrimary"
                    variant="p"

                >
                    Employee Count (estimate)
                </Typography>
            </Grid>
            <Grid
                item
                lg={7}
                sm={7}
                xl={7}
                xs={7}
            >
                <TextField
                    type="number"
                    defaultValue={props.input4}
                    onChange={e => props.setInput4(e.target.value)}
                    variant="standard"
                />
            </Grid>
            <Grid
                item
                lg={5}
                sm={5}
                xl={5}
                xs={5}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center'
                }}
            >
                <Typography
                    color="textPrimary"
                    variant="p"

                >
                    Referral Info
                </Typography>
            </Grid>
            <Grid
                item
                lg={7}
                sm={7}
                xl={7}
                xs={7}
            >
                <TextField
                    multiline
                    maxRows={4}
                    defaultValue={props.input5}
                    onChange={e => props.setInput5(e.target.value)}
                    variant="standard"
                />
            </Grid>
        </Grid >
    )
}
