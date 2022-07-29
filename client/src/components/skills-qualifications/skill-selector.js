import { Typography, Grid, TextareaAutosize } from '@mui/material';
import CreatableSelect from 'react-select/creatable';
import Select from 'react-select';
import { useState, useEffect } from 'react';
export const SkillSelector = (props) => {
    const [input1, setInput1] = useState("");
    const [input2, setInput2] = useState("");
    const [options, setOptions] = useState([]);
    const handleChange1 = (selectedOption, action) => {
        setInput1(selectedOption);
    }
    const handleChange2 = (selectedOption, action) => {
        setInput2(selectedOption);
    }
    useEffect(() => {
        console.log(input1)
        console.log(input2)   
    })
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
                <CreatableSelect
                    isClearable
                    onChange={handleChange1}
                    onInputChange={handleChange2}
                    options={props.list}
                />
            </Grid>
        </Grid >
    )
}
