import React, { useEffect, useState } from 'react';
import {
    Button, TextField, Dialog, Box,
    DialogActions, Avatar, Typography,
    Container, CssBaseline, CircularProgress,
} from '@mui/material';
import {useForm, Controller,
} from 'react-hook-form';
import * as yup from 'yup';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {
    editTypeService, typeUserService,
} from '../redux/services/userServices';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import AddIcon from '@mui/icons-material/Add';
import {yupResolver} from "@hookform/resolvers/yup";
import {toast} from "react-toastify";

const schema = yup.object().shape({
    type: yup.string().required("Designation is required"),
});


const defaultTheme = createTheme();

export default function ModelType({ addType, id }) {

    const [open, setOpen] = useState(false);
    const [loader,setLoader] = React.useState(false);


    const { handleSubmit, reset, control, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setLoader(false);
        setOpen(false);
        reset();
    };

    const onSubmit = async (data) => {
        setLoader(true)
        const addemp = {
            type: data?.type
        }
        const editemp = {
            type: data?.type
        }

        const valid = !addType ? await typeUserService(addemp) : await editTypeService(editemp, id)
        if (valid) {
            toast.success(!addType ? "Type Added" :"Type Update")
        } else {
            toast.error("Error");
        }
        handleClose()
    }
    useEffect(() => {
        reset({ type: addType })
    }, [addType]);

    return (
        <div>
            <Button variant="contained" onClick={handleClickOpen} style={{
                backgroundColor: addType ? 'blue' : 'green',
                color: 'white',
                border: 'none',
                marginRight: "50px"
            }}>
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
                                        {loader ? <CircularProgress/> : !addType ? "AddType" : "EditType"}
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
