import { Box, Card, CardContent, Grid, Typography } from '@mui/material';
import { useState } from 'react';
export const CourseCard = (props) => {
    const navigate = (id) => {
        window.location.href = `/course/${id}/overview`;
    }
    return (
        <Card
            onClick={() => navigate(props.course_id)}
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
                            {props.course_organization}
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
                        Projects: {props.course_projects}
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    )
};

export default CourseCard;