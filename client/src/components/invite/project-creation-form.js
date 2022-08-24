import { Typography, Grid, TextField } from '@mui/material';
import { useState, useEffect } from 'react';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
export const ProjectCreationForm = (props) => {
    const checkValid = () => {
        let check1 = props.input1.length > 0 && props.input2.length > 0;
        let check2 = false;
        if(props.input3 instanceof Date && !isNaN(props.input3) && props.input4 instanceof Date && !isNaN(props.input4)) {
            check2 = props.input3.getTime() < props.input4.getTime();
        }
        return check1 && check2;
    }
    useEffect(() => {
        props.setValid(checkValid())
    } , [props.input1, props.input2, props.input3, props.input4]);
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
                    Project Name
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
                    Categories (separate by comma)
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
                    onChange={e => props.setInput2(e.target.value.split(","))}
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
                    Start Date
                </Typography>
            </Grid>
            <Grid
                item
                lg={7}
                sm={7}
                xl={7}
                xs={7}
            >
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                        label="Basic example"
                        value={props.input3}
                        onChange={(newValue) => {
                            props.setInput3(newValue);
                        }}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </LocalizationProvider>
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
                    End Date
                </Typography>
            </Grid>
            <Grid
                item
                lg={7}
                sm={7}
                xl={7}
                xs={7}
            >
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                        label="Basic example"
                        value={props.input4}
                        onChange={(newValue) => {
                            props.setInput4(newValue);
                        }}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </LocalizationProvider>
            </Grid>

        </Grid >
    )
}
