import React, {useEffect} from 'react';
import { useSelector } from 'react-redux';
import {Box, Grid, Paper, Typography, Button, CircularProgress} from '@mui/material';
import { styled } from '@mui/material/styles';
import DeleteIcon from '@mui/icons-material/Delete';
import ModelType from '../component/ModelType';
import {deletTypeService, getTypeService} from '../redux/services/userServices';
import {toast} from "react-toastify";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const Type = () => {
    const [loader,setLoader] = React.useState(false);
    const types = useSelector((state) => state?.user)
    const { isSuperAdmin } = useSelector((state) => state?.auth);
    const dele = async (id) => {
        const valid = await deletTypeService(id)
        if (valid) {
            toast.success("Type Deleted")
        } else {
            toast.error("Error");
        }
    }
    const  getType = async () => {
        await getTypeService();
        setLoader(false)
    }

    useEffect(() => {
        setLoader(true)
        getType();
    }, []);
    return (
        <Box>
            <Box mt={"1%"}>
                <Typography variant="h3" color={"gray"} textAlign={"center"}>Types</Typography>
            </Box>
            <Grid container justifyContent="flex-end" marginTop="1%" marginRight="1%">
                <Grid >
                    <ModelType />
                </Grid>
            </Grid>
            <Box mt={"3%"}>
                <Grid maxWidth={"800px"} padding={"10px"} container spacing={2}>
                    {
                        loader ?
                            <Box sx={{ display: 'flex' }}>
                                <CircularProgress />
                            </Box> :
                        types?.type?.map((data, index) =>

                            <Grid item xs={4} key={index}  >
                                <Item>
                                    <Typography my={2} ml={3}><b>Type:</b>{data?.type}</Typography>

                                    <Button sx={{border:"none"}}><ModelType id={data?.id} addType={data?.type} />
                                    </Button>
{isSuperAdmin && <Button
    variant="contained"
    style={{ backgroundColor: 'red',border:"none" }}
    onClick={() => dele(data?.id)}><DeleteIcon /></Button>}

                                </Item>


                            </Grid>

                        )

                    }
                </Grid>
            </Box>
        </Box>

    )
}

export default Type