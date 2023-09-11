
import React, { useEffect } from 'react'
import { Box, Button, Grid, Paper, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import Model from '../component/Model';
import { useSelector } from 'react-redux';
import { deleteUserService, getUserService } from '../redux/services/userServices';
import DeleteIcon from '@mui/icons-material/Delete';
import _ from "lodash";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const User = () => {
    const datas = useSelector((state) => state.user);
    const { isSuperAdmin } = useSelector((state) => state?.auth);
    const types = useSelector((state) => state.user.type);
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

    return (
        <>
           <Box mt={"1%"}>
                <Typography variant="h3" color={"gray"} textAlign={"center"}>Users</Typography>
            </Box>
            <Box>
                <Grid container justifyContent="flex-end" marginTop="1%" marginRight="1%">
                    <Grid item>
                        <Model add={true} />
                    </Grid>


                </Grid>
                <Box mt={"2%"}>
                    <Grid maxWidth={"1000px"} container spacing={2}>
                        {
                            datas?.users?.filter(data => data.role != 0).map((data, index) =>
                                <Grid item xs={4} key={index}  >
                                    <Item>
                                        <Typography color={"black"} mt={2} ml={3}><b>{_.toUpper("Username: ")}</b>{_.startCase(_.toLower(data?.username))}</Typography>
                                        <Typography color={"black"} mt={2} ml={3}><b>{_.toUpper("Email: ")}</b>{data?.email}</Typography>
                                        <Typography color={"black"} mt={2} ml={3}><b>{_.toUpper("Role: ")}</b>{getRoleName(data?.role)}</Typography>
                                        {getUserTypes(data?.type) !== "" && <Typography color={"black"} mt={2} ml={3}>{"Type: "}{_.toUpper(getUserTypes(data?.type))}</Typography>}

                                        <Button> <Model editid={data?.id} data={data} /></Button>
                                        {isSuperAdmin && <Button

                                            variant="contained"
                                            style={{ backgroundColor: 'red' }}
                                            onClick={() => del(data?.id)}><DeleteIcon /></Button>}
                                    </Item>
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