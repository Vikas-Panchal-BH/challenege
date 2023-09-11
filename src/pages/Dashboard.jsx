import * as React from 'react';
import {
  Box, Card, CardActions,
  CardContent, Button, Typography,
} from '@mui/material';
import { useSelector } from 'react-redux';
import _ from "lodash";

export default function Dashboard() {
  const currentUser = useSelector((state) => state.auth?.currentUser);
  const { isAdmin, isBasic } = useSelector((state) => state?.auth);

  const types = useSelector((state) => state.user.type);
  function getUserTypes(userTypes) {
    const filteredTypes = types?.filter(typeObj => userTypes?.includes(typeObj?.id));
    const result = filteredTypes?.map(typeObj => typeObj?.type);
    return result?.join(',');
  }
  const getRoleName = (role) => {
    switch (role) {
      case 0:
        return 'Super Admin';
      case 1:
        return 'Admin';
      case 2:
        return 'User';
      default:
        return '';
    }
  };
  return (
    <>
      <Box mt={"1%"}>
                <Typography variant="h3" color={"gray"} textAlign={"center"}>Dashboard</Typography>
            </Box>
            <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography variant="h5" >
          {"UserName:"} {_.startCase(_.toLower(currentUser?.username))}
        </Typography>
        <Typography variant="h5" >
          {"Email: "}{currentUser?.email}
        </Typography>
        <Typography variant="h5">
          {"Role:"} {getRoleName(currentUser?.role)}
        </Typography>
        {(isAdmin || isBasic) && <Typography variant="h5" >
          {"Type:"}{getUserTypes(currentUser?.type)}
        </Typography>}

      </CardContent>

    </Card>
    </>

  );
}