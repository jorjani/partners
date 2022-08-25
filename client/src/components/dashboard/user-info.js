import { Box, Card, CardContent, Grid, Typography } from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import BookIcon from '@mui/icons-material/Book';
import { useState, useContext, useEffect } from 'react';
import UserContext from 'src/context/UserContext';

export const UserInfo = (props) => {
    const { userData } = useContext(UserContext);
    const getIcon = () => {
        if (!userData.user) {
            return <></>;
        }
        return <BookIcon />
    }
    const getUserName = () => {
        if (!userData.user) {
            return "User"
        } else {
            return userData.user.first_name + " " + userData.user.last_name;
        }
    }
    const getUserType = () => {
        if (!userData.type) {
            return "Guest"
        } else {
            return userData.type.charAt(0).toUpperCase() + userData.type.slice(1);
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
                        {getUserType()}
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    )
};

export default UserInfo;