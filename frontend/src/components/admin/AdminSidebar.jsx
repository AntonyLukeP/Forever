import React from 'react'
import { FaSignOutAlt } from 'react-icons/fa';
import { FaBoxOpen, FaClipboardCheck, FaClipboardList, FaShop, FaStore, FaUser } from 'react-icons/fa6'
import { useDispatch } from 'react-redux';
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { logout } from '../../redux/slices/authSlice';
import { clearCart } from '../../redux/slices/cartSlice';
const AdminSidebar = ({toggleSidebar}) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = ()=>
    {
        dispatch(logout());
        dispatch(clearCart());
        navigate("/")
    };

  return (
    <div className='p-4' >
        <div className='mb-6' >
            <Link to="/admin" className='text-2xl font-medium text-white' >Rabbit</Link>
        </div>
        <h2 className='text-xl text-white font-medium text-center mb-6' >Admin Dashboard</h2>
        <div className='flex flex-col space-y-2' >
            <NavLink to="/admin/users" onClick={toggleSidebar}
            className={({isActive})=>isActive?"bg-gray-700 text-white px-4 py-3 rounded flex items-center space-x-2"
            :"text-gray-300 hover:bg-gray-700 hover:text-white py-3 px-4 rounded flex items-center space-x-2"}
            >
                <FaUser/>
                <span>Users</span>
            </NavLink>
            <NavLink to="/admin/products" onClick={toggleSidebar}
            className={({isActive})=>isActive?"bg-gray-700 text-white px-4 py-3 rounded flex items-center space-x-2"
            :"text-gray-300 hover:bg-gray-700 hover:text-white py-3 px-4 rounded flex items-center space-x-2"}
            >
                <FaBoxOpen/>
                <span>Products</span>
            </NavLink>
            <NavLink to="/admin/orders" onClick={toggleSidebar}
            className={({isActive})=>isActive?"bg-gray-700 text-white px-4 py-3 rounded flex items-center space-x-2"
            :"text-gray-300 hover:bg-gray-700 hover:text-white py-3 px-4 rounded flex items-center space-x-2"}
            >
                <FaClipboardList/>
                <span>Orders</span>
            </NavLink>
            <NavLink to="/" 
            className={({isActive})=>isActive?"bg-gray-700 text-white px-4 py-3 rounded flex items-center space-x-2"
            :"text-gray-300 hover:bg-gray-700 hover:text-white py-3 px-4 rounded flex items-center space-x-2"}
            >
                <FaStore/>
                <span>Shop</span>
            </NavLink>
            <div className='mt-6' >
                <button className='bg-red-600 text-white w-full rounded px-4 py-2 hover:bg-red-500 flex items-center justify-center space-x-2 '
                onClick={handleLogout}
                >
                    <FaSignOutAlt/>
                     <span>Logout</span>
                </button>
            </div>
        </div>
    </div>
  )
}

export default AdminSidebar