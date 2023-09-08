import { Box, Grid, Paper, Typography } from '@mui/material'
import React from 'react'

import ModelType from '../component/ModelType'
import { useSelector } from 'react-redux'
import { Button } from '@mui/base'
import { deletTypeService } from '../redux/services/userServices'


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
            <Box mt={"3%"}>
                <Grid gap={"1rem"} container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                    {
                        types?.type?.map((data, index) =>

                            <Grid component={Paper} data xs={4} key={index} >
                                <Typography mt={2} ml={3}>{"Type: "}{data?.type}</Typography>
                                <ModelType id={data?.id} addType={data?.type} />
                                {isSuperAdmin && <Button onClick={() => dele(data?.id)}>Delete</Button>}

                            </Grid>
                        )

                    }
                </Grid>
            </Box>
        </Box>

    )
}

export default Type