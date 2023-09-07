import React from 'react'
import { Route, Routes } from 'react-router-dom'
import SignIn from '../pages/SignIn'
import Dashboard from '../component/Dashboard'
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
            </Routes>
        </div>
    )
}

export default AllRoutes