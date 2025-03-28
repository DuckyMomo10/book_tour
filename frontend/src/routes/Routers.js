import React from 'react'
import { Routes, Route } from 'react-router-dom'

import Home from '../pages/Home'
import Login from '../pages/Login'
import Tours from '../pages/Tours'
import About from '../pages/About'
import ThankYou from '../pages/ThankYou'
import Register from '../pages/Register'
import TourDetails from '../pages/TourDetails'
import SearchResultList from '../pages/SearchResultList'
import Dashboard from '../admin/Dashboard'
import AdminLogin from '../admin/AdminLogin'

const Routers = () => {
  return (
    <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/home' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/tours' element={<Tours />} />
        <Route path='/about' element={<About />} />
        <Route path='/tour/:id' element={<TourDetails />} />
        <Route path='/register' element={<Register />} />
        <Route path='/thank-you' element={<ThankYou />} />
        <Route path='/tours/search' element={<SearchResultList />} />
        <Route path='/admin/dashboard' element={<Dashboard />} />
        <Route path='/admin/login' element={< AdminLogin />} />
    </Routes>
  )
}
export default Routers
