import React from 'react'
import { Route, Routes } from 'react-router-dom'
import SignIn from '../pages/SignIn'
import Dashboard from '../component/Dashboard'
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

                        <Route path="/dashboard" element={ <PrivateRoutes >
                            <Dashboard />
                        </PrivateRoutes>} />
                        <Route path='/user' element={ <PrivateRoutes >
                            <User />
                        </PrivateRoutes>} />
                        <Route path='/type' element={ <PrivateRoutes >
                            <Type />
                        </PrivateRoutes>} />


            </Routes>

        </div>
    )
}

export default AllRoutes