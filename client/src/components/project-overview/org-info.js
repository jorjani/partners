import { Box, Card, CardContent, Grid, Typography } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import Axios from "axios";

export const OrgInfo = (props) => {
    const [project, setProject] = useState({});
    const [org, setOrg] = useState({});
    // const getProjectIdFromURL = () => {
    //     const url = window.location.href;
    //     const projectId = url.split("/")[6];
    //     return projectId;
    // }
    const getOrg = async (id) => {
        let org = await Axios.get(`http://localhost:5000/api/organizations/${id}`);
        setOrg(org.data);
    }
    const getProject = async () => {
        setProject(props.project);
    }
    useEffect(() => {
        console.log(props.project)
        console.log(org)
    });
    useEffect(() => {
        getProject();
    }, [props.project])
    useEffect(() => {
        if(project.organization_id){
            getOrg(project.organization_id);
        }
    }, [project])
    return (
        <>
            <Card
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
                                Website: <a href={org.website} target="_blank" >{org.website}</a>
                            </Typography>
                            <br />
                            <Typography
                                color="textSecondary"
                                gutterBottom
                                variant="overline"
                            >
                                Organization Type: {org.type}
                            </Typography>
                            <br />
                            <Typography
                                color="textSecondary"
                                gutterBottom
                                variant="overline"
                            >
                                Number of Employees: {org.employee_count}
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography
                                color="textSecondary"
                                gutterBottom
                                variant="overline"
                            >
                                Name: {project.contact_info ? project.contact_info.name : "N/A"}
                            </Typography>
                            <br />
                            <Typography
                                color="textSecondary"
                                gutterBottom
                                variant="overline"
                            >
                                Email Address: {project.contact_info ? project.contact_info['email'] : "N/A"}
                            </Typography>
                            <br />
                            <Typography
                                color="textSecondary"
                                gutterBottom
                                variant="overline"
                            >
                                Title/Role/Relationship: {project.contact_info ? project.contact_info['role'] : "N/A"}
                            </Typography>
                        </Grid>

                    </Grid>
                </CardContent>
            </Card>
        </>
    )
};

export default OrgInfo;