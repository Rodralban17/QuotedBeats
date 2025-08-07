import React, { useState, useCallback } from 'react';
 import { Navigate, Outlet } from 'react-router-dom'
import Navbar from '../Components/Navbar';
// import Footer from '../components/Footer';
const Layout = () =>{
    return(          
        <div className='min-h-screen bg-gray-50'>
        <Navbar/>
       <div className='content'>
        <Outlet/>
       </div>
       {/* <div className='top-5'>
        <Footer/>
       </div> */}
     </div>
       
    )
}

const RequireAuth = () =>{
    return(
        <div>

        </div>
    )
}

export {Layout, RequireAuth}