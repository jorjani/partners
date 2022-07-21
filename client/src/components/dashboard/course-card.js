import { Box, Card, CardContent, Grid, Typography } from '@mui/material';
import { useState } from 'react';
export const CourseCard = (props) => {
    return (
        <Card
            sx={{ height: '100%', marginLeft: '10px', marginRight: '10px' }}
            {...props}
        >
            <CardContent>
                <Grid
                    container
                    spacing={3}
                    sx={{ justifyContent: 'space-between' }}
                >
                    <Grid item>
                        <Typography
                            color="textSecondary"
                            gutterBottom
                            variant="overline"
                        >
                            {props.course_title}
                        </Typography>
                        <Typography
                            color="textPrimary"
                            variant="h4"
                        >
                            {props.course_code}
                        </Typography>
                    </Grid>
                </Grid>
                <Box
                    sx={{
                        pt: 2,
                        display: 'flex',
                        alignItems: 'center'
                    }}
                >
                    <Typography
                        color="textSecondary"
                        variant="caption"
                        ml={1}
                    >
                        {props.course_session}
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    )
};

export default CourseCard;