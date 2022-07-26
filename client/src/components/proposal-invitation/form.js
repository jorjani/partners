import { Typography, Grid, TextareaAutosize } from '@mui/material';
import { useState } from 'react';
export const Form = (props) => {
    const [input1, setInput1] = useState("");
    const [input2, setInput2] = useState("");
    const [input3, setInput3] = useState("");
    const [input4, setInput4] = useState("");
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
                    variant="h6"

                >
                    Organization Information
                </Typography>
            </Grid>
            <Grid
                item
                lg={7}
                sm={7}
                xl={7}
                xs={7}
            >
                <TextareaAutosize
                    disabled={!props.editable}
                    defaultValue={input1}
                    size="large"
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
                    variant="h6"

                >
                    Email
                </Typography>
            </Grid>
            <Grid
                item
                lg={7}
                sm={7}
                xl={7}
                xs={7}
            >
                <TextareaAutosize
                    disabled={!props.editable}
                    defaultValue={input2}
                    size="large"
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
                    variant="h6"

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
                <TextareaAutosize
                    disabled={!props.editable}
                    defaultValue={input3}
                    size="large"
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
                    variant="h6"

                >
                    Title/Role/Relationship with the Organization
                </Typography>
            </Grid>
            <Grid
                item
                lg={7}
                sm={7}
                xl={7}
                xs={7}
            >
                <TextareaAutosize
                    disabled={!props.editable}
                    defaultValue={input4}
                    size="large"
                />
            </Grid>

        </Grid >
    )
}
