import * as React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import {
    Avatar, Button, CssBaseline,
    TextField, Box, Typography,
    IconButton, Grid, Paper,
    InputAdornment,
} from '@mui/material';

import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

import { signInService } from '../redux/services/authServices';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


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
});

export default function SignIn() {
    const navigate = useNavigate();

    const { handleSubmit, register, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });
   
        
    const onSubmit = (data, event) => {
        const valid = signInService(data);
        if (!valid) {
            toast.error("Invalid Email or Password")
        } else {
            navigate("/dashboard");
        }

    };
    const [showPassword, setShowPassword] = React.useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    return (
        <React.Fragment>

            <Grid container component="main" sx={{ height: '100vh' }}>
                <CssBaseline />
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign in
                        </Typography>
                        <Box component="form" onSubmit={handleSubmit((data, event) => onSubmit(data, event))} sx={{ mt: 1 }}>
                            <TextField
                                sx={{ mb: 2 }}
                                margin="normal"
                                fullWidth
                                label="Email"
                                type="text"
                                {...register("email")}
                                error={!!errors?.email?.message}
                                helperText={errors?.email?.message}
                            />
                            <TextField
                                sx={{ mb: 2 }}
                                margin="normal"
                                fullWidth
                                label="Password"
                                type={showPassword ? 'text' : 'password'}
                                {...register("password")}
                                error={!!errors?.password?.message}
                                helperText={errors?.password?.message}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={togglePasswordVisibility}
                                                edge="end"
                                            >
                                                {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            {/* <TextField
                                    sx={{ mb: 2 }}
                                    margin="normal"
                                    fullWidth
                                    label="Password"
                                    type="password"
                                    {...register("password")}
                                    error={!!errors?.password?.message}
                                    helperText={errors?.password?.message}
                                /> */}
                            <Button size="medium"
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 2, mb: 2 }}
                            >
                                Log In
                            </Button>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}
