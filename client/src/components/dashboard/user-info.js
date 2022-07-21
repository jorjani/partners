import { Box, Card, CardContent, Grid, Typography } from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import { useState } from 'react';
export const UserInfo = (props) => {
    const [user, setUser] = useState({
        name: 'Gerald Anderson',
        type: 'Educator',
    });
    const getIcon = () => {
        if(user.type === 'Educator') {
            return <SchoolIcon />
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
                            Gerald Anderson
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