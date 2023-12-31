import React from 'react'
import { Route, Routes } from 'react-router-dom'
import SignIn from '../pages/SignIn'
import Dashboard from '../pages/Dashboard'
import User from '../pages/User'
import Type from '../pages/Type'
import Header from "../component/Header";
import PrivateRoutes from "./PrivateRoutes";
// import PrivateRoutes from './PrivateRoutes'



const AllRoutes = () => {
    return (
        <div>
            <Routes>
                <Route path='*' element={<SignIn />} />
                <Route path='/' element={<SignIn />} />
                <Route element={<PrivateRoutes />}>
                    <Route element={<Header />}>
                        <Route path="/dashboard"  element={<Dashboard />}/>
                        <Route path="/user"  element={<User />}/>
                        <Route path="/type"  element={<Type />}/>
                    </Route>
                </Route>



            </Routes>

        </div>
    )
}

export default AllRoutes