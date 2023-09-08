import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useSelector } from 'react-redux';
import _ from "lodash";
const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

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
  );
}