import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import Box from '@mui/material/Box';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import Avatar from '@mui/material/Avatar';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import DialogActions from '@mui/material/DialogActions';
import { editTypeService, typeUserService } from '../redux/services/userServices';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import AddIcon from '@mui/icons-material/Add';
const schema = yup.object().shape({
    type: yup.string().required("Designation is required"),
});


const defaultTheme = createTheme();

export default function ModelType({ addType, id }) {

    const [open, setOpen] = useState(false);


    const { handleSubmit, reset, control, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        reset();
    };

    const onSubmit = (data) => {
        const addemp = {
            id: Math.floor(Math.random() * 100000),
            type: data?.type
        }
        const editemp = {
            type: data?.type
        }

        !addType ? typeUserService(addemp) : editTypeService(editemp, id)
        handleClose()
    }
    useEffect(() => {
        reset({ type: addType })
    }, [addType]);

    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen} style={{
                backgroundColor: addType ? 'blue' : 'green',
                color: 'white',
                border: 'none',
            }}>
                {/* {!addType ? "Create Type" : "Edit Type"} */}
                {addType ? <ModeEditIcon /> : <AddIcon />}
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
                                {addType ? <ModeEditIcon /> : <AddIcon />}
                            </Avatar>
                            <Typography component="h1" variant="h5">
                                {!addType ? "Create Type" : "Edit Type"}
                            </Typography>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <Controller
                                    name="type"
                                    control={control}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            margin="normal"
                                            required
                                            fullWidth
                                            label="Type Name:"
                                            type="text"
                                            error={!!errors?.type}
                                            helperText={errors?.type?.message}
                                        />
                                    )}
                                />
                                <DialogActions>
                                    <Button
                                        onClick={handleClose}
                                        fullWidth
                                        variant="contained"
                                        sx={{ mt: 3, mb: 2 }}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        sx={{ mt: 3, mb: 2 }}
                                    >
                                        {!addType ? "AddType" : "EditType"}
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
