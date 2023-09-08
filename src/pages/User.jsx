
import React, { useEffect } from 'react'
import { Box, Button, Grid, Paper, Typography } from '@mui/material';

import Model from '../component/Model';
import { useSelector } from 'react-redux';
import { deleteUserService, getUserService } from '../redux/services/userServices';
import _ from "lodash";


const User = () => {
    const datas = useSelector((state) => state.user);
    const users = useSelector((state) => state?.auth)
    const types= useSelector((state) => state.user.type);
    function getUserTypes(userTypes) {
        const filteredTypes = types?.filter(typeObj => userTypes?.includes(typeObj?.id));
        const result = filteredTypes?.map(typeObj => typeObj?.type);
        return result?.join(',');
    }

    const getUser = () => {
        getUserService()
    }
    useEffect(() => {
        getUser()
    }, [])
    const del = (id) => {
        deleteUserService(id)
    }
    const getRoleName = (role) => {
        switch (role) {
            case 1:
                return 'Admin';
            case 2:
                return 'Users';
            default:
                return '';
        }
    };
    console.log("users",datas?.users);
    return (
        <>
            <Box>
                <Grid container justifyContent="flex-end" marginTop="1%" marginRight="1%">
                    <Grid item>
                        <Model add={true} />
                    </Grid>


                </Grid>
                <Box mt={"3%"}>
                    <Grid gap={"1rem"} container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                        {
                            datas?.users?.filter(data => data.role != 0).map((data, index) =>

                                < Grid component={Paper} data xs={4} key={index} >
                                    <Typography mt={2} ml={3}>{"Username: "}{_.startCase(_.toLower(data?.username))}</Typography>
                                    <Typography mt={2} ml={3}>{"Email: "}{data?.email}</Typography>
                                    <Typography mt={2} ml={3}>{"Role: "}{getRoleName(data?.role)}</Typography>
                                    <Typography mt={2} ml={3}>{"Type: "}{getUserTypes(data?.type)}</Typography>
                                    <Button> <Model editid={data?.id} data={data} /></Button>
                                    <Button type="submit"

                                        variant="contained"
                                        onClick={() => del(data?.id)} >Delete</Button>
                                </Grid>
                            )

                        }
                    </Grid>
                </Box>

            </Box >
        </>

    )
}

export default User