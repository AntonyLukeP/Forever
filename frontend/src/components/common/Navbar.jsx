import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { HiOutlineUser,HiOutlineShoppingCart } from "react-icons/hi";
import { HiOutlineBars3 } from "react-icons/hi2";
import Search from './Search';
import CartDrawer from '../layout/CartDrawer';
import { IoMdClose } from 'react-icons/io';
import { useSelector } from 'react-redux';

const Navbar = () => {

    const [drawerOpen, setDrawerOpen ] = useState(false);
    const [navDrawerOpen,setNavDrawerOpen] = useState(false);
    const { cart } = useSelector((state)=>state.cart)
    const { user } = useSelector((state)=> state.auth)
    const cartCount = cart?.products?.reduce((total,product)=> total+product.quantity ,0) || 0;
    const toggleCartDrawer = ()=>
    {
        if(navDrawerOpen === true)
        {
            setNavDrawerOpen(false);
        }   
        setDrawerOpen(!drawerOpen);
    }

    const toggleNavDrawer = ()=>
    {
        if(drawerOpen === true)
        {
            setDrawerOpen(false);
        }
        setNavDrawerOpen(!navDrawerOpen);
    }
  return (
    <>
    <nav className='container mx-auto flex items-center justify-between px-6 py-4'>
        <div>
            <Link to="/" className="text-2xl font-medium" >Rabbit</Link>
        </div>
        <div className='hidden md:flex space-x-6'>
            <Link to="/collections/all?gender=Men" className="text-gray-700 hover:text-black text-sm font-medium uppercase">
            Men 
            </Link>
            <Link to="/collections/all?gender=Women" className="text-gray-700 hover:text-black text-sm font-medium uppercase">
            Women
            </Link>
            <Link to="/collections/all?category=Top+Wear" className="text-gray-700 hover:text-black text-sm font-medium uppercase">
            Top Wear 
            </Link>
            <Link to="/collections/all?category=Bottom+Wear" className="text-gray-700 hover:text-black text-sm font-medium uppercase">
            Bottom Wear
            </Link>
        </div>
        <div className='flex items-center space-x-4'>
            {user && user.role==="admin" && (
                <Link to="/admin" className='bg-black text-white px-2 rounded ' >Admin</Link>
            )}
            <Link to="/profile" className='hover:text-black'>
            <HiOutlineUser className='h-6 w-6 text-gray-700'/>
            </Link>
            <button className='relative hover:text-black cursor-pointer'>
                <HiOutlineShoppingCart onClick={toggleCartDrawer} className='h-6 w-6 text-gray-700'/>
                {
                    cartCount > 0 && (<span className='absolute -top-1 bg-rabbit-red text-white text-xs rounded-full px-2 py-0.5'>{cartCount}</span>
)
                }
            </button>
            {/* Search */}
            <Search />
            <button onClick={toggleNavDrawer} className='md:hidden' >
                <HiOutlineBars3 className="h-6 w-6 text-gray-700"/>
            </button>
        </div>
    </nav>
    <CartDrawer drawerOpen={drawerOpen} toggleCartDrawer={toggleCartDrawer}/>
    
    <div className={`fixed top-0 left-0 w-3/4 sm:w-1/2 md:w-1/3 h-full bg-white shadow-lg transform transition-transform duration-300 flex flex-col z-50 ${navDrawerOpen?"translate-x-0":"-translate-x-full"}`}>
        <div className='flex justify-end p-4'>
            <IoMdClose onClick={toggleNavDrawer} className='w-6 h-6 text-gray-600 hover:text-gray-800 '/>
        </div>
        <div className='p-4'>
                <h1 className='text-xl font-semibold mb-4 '>Menu</h1>
                <nav className='space-y-4'>
                    <Link to="/collections/all?gender=Men"
                    onClick={toggleNavDrawer}
                    className='block text-gray-600 hover:text-gray-800'>Men</Link>
                    <Link to="/collections/all?gender=Women"
                    onClick={toggleNavDrawer}
                    className='block text-gray-600 hover:text-gray-800'>Women</Link>

                    <Link to="/collections/all?category=Top+Wear"
                    onClick={toggleNavDrawer}
                    className='block text-gray-600 hover:text-gray-800'>Top Wear</Link>
            
                    <Link to="/collections/all?category=Bottom+Wear"
                    onClick={toggleNavDrawer}
                    className='block text-gray-600 hover:text-gray-800'>Bottom Wear</Link>
                </nav>
        </div>
    </div>
    </>
  )
}

export default Navbar