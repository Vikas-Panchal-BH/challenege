import React, { useEffect } from 'react';
import {
    Avatar,
    Box,
    Button, CircularProgress,
    Container,
    CssBaseline,
    Dialog,
    DialogActions, FormControl,
    IconButton,
    InputAdornment,
    InputLabel,
    MenuItem,
    OutlinedInput,
    Select,
    TextField,
    Typography,
} from '@mui/material';


import {
    createTheme,
    ThemeProvider,
    useTheme,
} from '@mui/material/styles';

import {
    useForm,
    Controller,
} from 'react-hook-form';

import * as yup from 'yup';

import {
    Visibility,
    VisibilityOff,
    ModeEdit as ModeEditIcon,
    Add as AddIcon,
    PersonAdd as PersonAddIcon,
} from '@mui/icons-material';

import { useSelector } from 'react-redux';

import {createuserService, editUserService} from '../redux/services/userServices';
import {yupResolver} from "@hookform/resolvers/yup";
import {toast} from "react-toastify";

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
    username: yup.string().required('Username is Required!'),
    email: yup.string().required('Email is Required!').email('Please Enter Valid Email!'),
    password: yup
        .string()
        .required('Password is Required!')
        .min(8, 'Password must be at least 8 characters')
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
            'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
        ),
    role: yup.number().required("Role is required"),
    type: yup.mixed(),
});

export default function Model({ editid,data }) {

    const [personName, setPersonName] = React.useState([]);
    const [loader,setLoader] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const [passwordVisible, setPasswordVisible] = React.useState(false);
    const { handleSubmit, reset, control, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setLoader(true);
        setOpen(false);
        reset({});
    };
    const onSubmit = async  (data) => {
        setLoader(true)
        const add = {
            username: data?.username,
            email: data?.email,
            password: data?.password,
            role: +(data?.role),
            type: personName
        }
        const edit = {
            username: data?.username,
            email: data?.email,
            password: data?.password,
            role: +(data?.role),
            type: personName
        }

        const valid = !editid ? await  createuserService(add) : await editUserService(edit, !editid)
        if (valid) {
            toast.success(!editid ? "User Added" :"User Updated")
        } else {
            toast.error("Error");
        }
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
    useEffect(() => {
        reset(data);
        setPersonName(data?.type || [])
    }, [data])

    return (
        <div>
            <Button sx={{marginRight:"50px"}} variant="outlined" onClick={handleClickOpen} style={{
                backgroundColor: !editid ? 'blue' : 'green',
                color: 'white',
                border: 'none',
            }}>
                {!editid ? <PersonAddIcon /> : <ModeEditIcon />}
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
                                {!editid ? <AddIcon /> : <ModeEditIcon />}
                            </Avatar>
                            <Typography component="h1" variant="h5">
                                {!editid ? "Create User" : "Edit User"}
                            </Typography>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <Controller
                                    name="username"
                                    control={control}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            margin="normal"
                                            fullWidth
                                            label="Username"
                                            type='text'
                                            autoFocus
                                            autoComplete="off"
                                            error={!!errors.username}
                                            helperText={errors.username?.message}
                                        />
                                    )}
                                />
                                <Controller
                                    name="email"
                                    control={control}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            margin="normal"
                                            fullWidth
                                            label="Email Address"
                                            type='email'
                                            autoComplete="off"
                                            error={!!errors.email}
                                            helperText={errors.email?.message}
                                        />
                                    )}
                                />

                                <Controller
                                    name="role"
                                    control={control}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            margin="normal"
                                            fullWidth
                                            label="Role"
                                            error={!!errors?.role}
                                            helperText={errors?.role?.message}
                                            select

                                        >

                                            <MenuItem value={2}>User</MenuItem>
                                            <MenuItem value={1}>Admin</MenuItem>
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
                                                key={name?.id}
                                                value={name?.id}
                                                style={getStyles(name, personName, theme)}
                                            >
                                                {name?.type}
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
                                        {loader ? <CircularProgress/>
                                            : !editid ? "Add User" : "Edit User"}
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
