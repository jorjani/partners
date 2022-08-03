import { Box, Card, CardContent, Grid, Typography } from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import { useState, useContext, useEffect } from 'react';
import UserContext from 'src/context/UserContext';

export const UserInfo = (props) => {
    const { userData } = useContext(UserContext);
    const getIcon = () => {
        if (!userData.user) {
            return <></>;
        }
        if (userData.user.type === 'Educator') {
            return <SchoolIcon />
        }
    }
    const getUserName = () => {
        if (!userData.user) {
            return "Guest"
        } else {
            return userData.user.first_name + " " + userData.user.last_name;
        }
    }
    return (
        <Card
            sx={{ height: '100%' }}
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
                            WELCOME
                        </Typography>
                        <Typography
                            color="textPrimary"
                            variant="h4"
                        >
                            {getUserName()}
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
                    {getIcon()}
                    <Typography
                        color="textSecondary"
                        variant="caption"
                        ml={1}
                    >
                        Educator
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    )
};

export default UserInfo;