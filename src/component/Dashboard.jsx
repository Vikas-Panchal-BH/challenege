
import React from 'react'
import { Box, Button, Grid, Paper, Typography } from '@mui/material';

import Model from './Model';
import { useSelector } from 'react-redux';


import _ from "lodash";
import { useNavigate } from 'react-router-dom';




const Dashboard = () => {
  const navigate = useNavigate()

  const user = () => {
    navigate("/user")

  }
  const type = () => {
    navigate("/type")
  }
  return (
    <Box>
      <Grid container justifyContent="flex-end" marginTop="1%" marginRight="1%">

        <Grid item>
          <Button onClick={user} >
            User
          </Button>
        </Grid>
        <Grid item>
          <Button onClick={type}>Type</Button>
        </Grid>
      </Grid>


    </Box >

  )
}

export default Dashboard