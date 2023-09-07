
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';


const PrivateRoutes = () => {


    const token = useSelector((store) => store.auth?.currentUser);
    console.log("token", token.length)

    if (!token) {
        toast({
            title: 'Please Login First.',
            description: "Please Login First.",
            status: 'warning',
            duration: 1000,
            isClosable: true,
        })
        console.log("jii")
    } else {

        return <Navigate to="/" />

    }




};

export default PrivateRoutes;