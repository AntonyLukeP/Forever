import React from 'react'
import MyOrders from './MyOrders'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { logout } from '../redux/slices/authSlice';
import { clearCart } from '../redux/slices/cartSlice';
import { useEffect } from 'react';

const Profile = () => {
    const {user} = useSelector((state)=>state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(()=>
    {
        if(!user)
        {
            navigate("/login");
        }
    },[user,navigate]);

    const handleLogout = () => {
        dispatch(logout());
        dispatch(clearCart());
        navigate("/login");
    }

  return (
    <div className='min-h-screen' >
        <div className='grow container mx-auto p-4 md:p-6' >
            <div className='flex flex-col md:flex-row md:space-x-6 space-y-6 md:space-y-0' >
                <div className='w-full md:w-1/3 lg:w-1/4 shadow-md rounded-lg p-6 flex flex-col items-center justify-center' >
                    <h1 className='text-2xl md:text-3xl font-bold mb-4 ' >{user?.name}</h1>
                    <p className='text-lg text-gray-600 mb-4' >{user?.email}</p>
                    <button 
                    onClick={handleLogout}
                    className='bg-red-500 text-white py-2 px-4 w-full rounded hover:bg-red-600' >
                        Logout
                    </button>
                </div>
                <div className='w-full' >
                    <MyOrders/>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Profile