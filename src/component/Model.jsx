import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import Box from '@mui/material/Box';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import Avatar from '@mui/material/Avatar';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import DialogActions from '@mui/material/DialogActions';
import { editUserService, userService } from '../redux/services/userServices';
import { useSelector } from 'react-redux';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputAdornment from '@mui/material/InputAdornment';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import AddIcon from '@mui/icons-material/Add';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select from '@mui/material/Select';
import { useTheme } from '@emotion/react';
import {useEffect} from "react";
const defaultTheme = createTheme();
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

function getStyles(name, personName, theme) {
    return {
        fontWeight:
            personName.indexOf(name) === -1
                ? theme.typography?.fontWeightRegular
                : theme.typography?.fontWeightMedium,
    };
}
const schema = yup.object().shape({
    email: yup.string().required('Email is Required!').email('Please Enter Valid Email!'),
    password: yup
        .string()
        .required('Password is Required!')
        .min(8, 'Password must be at least 8 characters')
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
            'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
        ),
    role: yup.string().notOneOf(['Role']).required("Role is required"),
    type: yup.string(),
});

export default function Model({ editid, add, data }) {

    const [personName, setPersonName] = React.useState([]);
    const [open, setOpen] = React.useState(false);
    const [passwordVisible, setPasswordVisible] = React.useState(false);
    const { handleSubmit, reset,control, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const onSubmit = (data) => {
        const addemp = {
            id: Math.random(),
            email: data?.email,
            password: data?.password,
            role: +(data?.role),
            type: personName
        }
        const editemp = {
            id: editid,
            email: data?.email,
            password: data?.password,
            role: +(data?.role),
            type: personName
        }
        console.log(addemp)
        add ? userService(addemp) : editUserService(editemp, editid)
        handleClose()
    }

    const userTypes = useSelector((state) => state?.user);
    const theme = useTheme();


    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setPersonName(

            typeof value === 'string' ? value.split(',') : value
        );
    };
    useEffect(()=>{
     reset(data);
    },[data])
 
    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
                {add ? "Create User" : "Edit User"}
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <ThemeProvider theme={defaultTheme}>
                    <Container component="main" maxWidth="xs">
                        <CssBaseline />
                        <Box
                            sx={{
                                marginTop: 8,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                                {add ? <AddIcon /> : <ModeEditIcon />}
                            </Avatar>
                            <Typography component="h1" variant="h5">
                                {add ? "Create User" : "Edit User"}
                            </Typography>
                            <form onSubmit={handleSubmit(onSubmit)}>

                                <Controller
                                    name="email"
                                    control={control}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            margin="normal"
                                            required
                                            fullWidth
                                            label="Email Address"
                                            type='email'
                                            autoFocus
                                            autoComplete="off"
                                            error={!!errors.email}
                                            helperText={errors.email?.message}
                                        />
                                    )}
                                />

                                <Controller
                                    name="role"
                                    control={control}
                                    defaultValue={1}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            margin="normal"
                                            required
                                            fullWidth
                                            label="Role"
                                            error={!!errors?.role}
                                            helperText={errors?.role?.message}
                                            select

                                        >
                                            <MenuItem value={1}>Admin</MenuItem>
                                            <MenuItem value={2}>User</MenuItem>
                                        </TextField>
                                    )}
                                />


                                <Controller
                                    name="password"
                                    control={control}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            margin="normal"
                                            required
                                            fullWidth
                                            label="Password"
                                            type={passwordVisible ? 'text' : 'password'}
                                            error={!!errors.password}
                                            helperText={errors.password?.message}
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            onClick={() => setPasswordVisible(!passwordVisible)}
                                                            edge="end"
                                                            aria-label="toggle password visibility"
                                                        >
                                                            {passwordVisible ? <Visibility /> : <VisibilityOff />}
                                                        </IconButton>
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                    )}
                                />
                                <FormControl sx={{ m: 1, width: 300 }}>
                                    <InputLabel id="demo-multiple-name-label">Assign Type to User</InputLabel>
                                    <Select
                                        labelId="demo-multiple-name-label"
                                        id="demo-multiple-name"
                                        multiple
                                        value={personName}
                                        onChange={handleChange}
                                        input={<OutlinedInput label="Name" />}
                                        MenuProps={MenuProps}
                                    >
                                        {userTypes?.type?.map((name) => (
                                            <MenuItem
                                                key={name}
                                                value={name}
                                                style={getStyles(name, personName, theme)}
                                            >
                                                {name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>

                                <DialogActions>
                                    <Button onClick={handleClose}
                                        fullWidth
                                        variant="contained"
                                        sx={{ mt: 3, mb: 2 }}>Cancel</Button>
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        sx={{ mt: 3, mb: 2 }}

                                    >
                                        {add ? "Add User" : "Edit User"}
                                    </Button>
                                </DialogActions>

                            </form>
                        </Box>
                    </Container>
                </ThemeProvider>
            </Dialog>
        </div>
    );
}
