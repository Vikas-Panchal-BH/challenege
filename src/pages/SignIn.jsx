import * as React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';

import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { signInService } from '../redux/services/authServices';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputAdornment from '@mui/material/InputAdornment';

const defaultTheme = createTheme();

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
    const [passwordVisible, setPasswordVisible] = React.useState(false);
    const { handleSubmit, control, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });
    const currentUser = useSelector((state) => state.auth?.currentUser)
    console.log("current", currentUser)
    // if (currentUser) {

    //     return <Navigate to="dashboard" />
    // }
    const onSubmit = (data) => {
        signInService(data);
    };

    return (
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
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
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
                                    autoComplete="email"
                                    autoFocus
                                    error={!!errors.email}
                                    helperText={errors.email?.message}
                                />
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

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </Button>
                    </form>
                </Box>
            </Container>
        </ThemeProvider>
    );
}
