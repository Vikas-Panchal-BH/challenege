
import React, { useEffect } from 'react'
import { Box, Button, Grid, Paper, Typography } from '@mui/material';

import Model from './Model';
import { useSelector } from 'react-redux';
import { deleteUserService, getUserService } from '../redux/services/userServices';
import ModelType from './ModelType';
import _ from "lodash";

const Dashboard = () => {
  const datas = useSelector((state) => state.user);


  const getUser = () => {
    getUserService()
  }
  useEffect(() => {
    getUser()
  }, [])
  console.log(datas)
  const del = (id) => {
    deleteUserService(id)
  }
  return (
    <Box>
      <Grid container justifyContent="flex-end" marginTop="1%" marginRight="1%">
        <Grid item>
          <Model add={true} />
        </Grid>
        <Grid item>
          <ModelType />
        </Grid>
      </Grid>
      <Box mt={"3%"}>
        <Grid gap={"1rem"} container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
          {
            datas?.users?.map((data, index) =>

              < Grid component={Paper} data xs={4} key={index} >
                <Typography mt={2} ml={3}>{"Email: "}{data?.email}</Typography>
                <Typography mt={2} ml={3}>{"Role: "}{data?.role}</Typography>
                <Typography mt={2} ml={3}>{"Type: "}{_.startCase(_.toLower(data?.type?.join(' ')))}</Typography>
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

  )
}

export default Dashboard