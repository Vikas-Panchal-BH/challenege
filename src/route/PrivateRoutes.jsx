
import React from 'react';
import { useSelector } from 'react-redux';
import {Navigate, Outlet} from 'react-router-dom';
import Header from "../component/Header";


const PrivateRoutes = ({children}) => {
    const user = useSelector((store) => store.auth?.currentUser);

    if (Object.keys(user)?.length > 0) {
        return<><Outlet /></>
    } else {
        return <Navigate to="/" />
    }
};

export default PrivateRoutes;