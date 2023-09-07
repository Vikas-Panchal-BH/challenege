import { Box, Button, Grid, Paper, Typography } from '@mui/material'
import React from 'react'


import { useSelector } from 'react-redux'
import { deleteTypeService } from '../redux/services/userServices'
import ModelType from '../component/ModelType'

const Type = () => {
    const types = useSelector((state) => state?.user)
    console.log(types.type)
    const del = (id) => {
        deleteTypeService(id)
    }
    return (
        <Box>
            <Grid container justifyContent="flex-end" marginTop="1%" marginRight="1%">
                <Grid item>
                    <ModelType create={true} />
                </Grid>
            </Grid>
            <Box mt={"3%"}>
                <Grid gap={"1rem"} container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                    {
                        types?.type?.map((data, index) =>

                            < Grid component={Paper} data xs={4} key={index} >
                                <Typography mt={2} ml={3}>{"Type: "}{data}</Typography>
                                <Button> <ModelType editid={index} data={data} /></Button>
                                <Button type="submit"
                                    variant="contained"
                                    onClick={() => del(index)} >Delete</Button>
                            </Grid>
                        )

                    }
                </Grid>
            </Box>
        </Box>

    )
}

export default Type