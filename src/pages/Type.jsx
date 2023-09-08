import { Box, Grid, Paper, Typography } from '@mui/material'
import React from 'react'
import { styled } from '@mui/material/styles';
import ModelType from '../component/ModelType'
import DeleteIcon from '@mui/icons-material/Delete';
import { useSelector } from 'react-redux'
import { Button } from '@mui/base'
import { deletTypeService } from '../redux/services/userServices'

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));
const Type = () => {
    const types = useSelector((state) => state?.user)
    const { isSuperAdmin } = useSelector((state) => state?.auth);
    const dele = (id) => {
        deletTypeService(id)
    }
    return (
        <Box>
            <Grid container justifyContent="flex-end" marginTop="1%" marginRight="1%">
                <Grid item>
                    <ModelType />
                </Grid>
            </Grid>
            <Box mt={"2%"}>
                <Grid gap={"1rem"} container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                    {
                        types?.type?.map((data, index) =>

                            <Grid item xs={2} key={index} data >
                                <Item>
                                    <Typography color={"black"} mt={2} ml={3}>{"Type: "}{data?.type}</Typography>
                                    <Button>
                                        <ModelType id={data?.id} addType={data?.type} />
                                    </Button>

                                    {isSuperAdmin && <Button type="submit"
                                        variant="contained"
                                        style={{ backgroundColor: 'red' }} onClick={() => dele(data?.id)}><DeleteIcon /></Button>}
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