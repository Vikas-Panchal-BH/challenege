import React from 'react'
import { Route, Routes } from 'react-router-dom'
import SignIn from '../pages/SignIn'
import Dashboard from '../component/Dashboard'
import User from '../pages/User'
import Type from '../pages/Type'
// import PrivateRoutes from './PrivateRoutes'



const AllRoutes = () => {
    return (
        <div>
            <Routes>
                <Route path='/' element={<SignIn />} />
                <Route
                    path="/dashboard"
                    element={

                        <Dashboard />

                    }
                />
                <Route path='/user' element={<User/>} />
                <Route path='/type' element={<Type/>} />
            </Routes>
        </div>
    )
}

export default AllRoutes