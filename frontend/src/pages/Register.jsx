 import React, { useState } from 'react'
 import { Link, useLocation, useNavigate } from 'react-router-dom'
 import register from "../assets/register.webp"
 import { registerUser } from '../redux/slices/authSlice' 
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { mergeCart } from '../redux/slices/cartSlice'

 const Register = () => {

    const [name,setName] = useState("")
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const location = useLocation();
    const { user, guestId,loading } = useSelector((state)=>state.auth);
    const  { cart } = useSelector((state)=> state.cart);

    const redirect = new URLSearchParams(location.search).get("redirct") || "/";
    const isCheckoutRedirect = redirect.includes("checkout");

    useEffect(() => {
        if(user){
            if(cart?.products?.length > 0 && guestId){
                dispatch(mergeCart({ guestId, userId: user._id }));
                navigate(isCheckoutRedirect ? "/checkout" : "/");
            }else 
            {
                navigate(isCheckoutRedirect ? "/checkout" : "/");
            }
        }
    },[user,guestId,cart,navigate,isCheckoutRedirect,dispatch]);    

    const handleSubmit = (e) =>
    {
        e.preventDefault();
        dispatch(registerUser({name,email,password}))
    }

   return (
     <div className='flex h-[610px]' >
        <div className='flex flex-col justify-center w-full md:w-1/2 items-center p-8 md:p-12' >
            <form 
            onSubmit={handleSubmit}
            className='w-full max-w-md bg-white p-8 shadow-sm' >
                <div className='flex justify-center mb-6' >
                    <h2 className='text-xl font-medium' >
                        Rabbit
                    </h2>
                </div>
                <h2 className='text-2xl font-bold text-center mb-6' >
                    Hey there! 👋
                </h2>
                <p className='text-center mb-6' >
                    Enter your details to register account
                </p>
                <div className='mb-4' >
                    <label className='text-sm font-semibold mb-2 block'>Name</label>
                    <input type="text" value={name}
                    onChange={(e)=>setName(e.target.value)}
                    className='w-full p-2 border rounded'
                    placeholder='Enter your name'
                    />
                </div>

                <div className='mb-4' >
                    <label className='text-sm font-semibold mb-2 block'>Email</label>
                    <input type="email" value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                    className='w-full p-2 border rounded'
                    placeholder='Enter your email address'
                    />
                </div>

                <div className='mb-4' >
                    <label className='text-sm font-semibold mb-2 block'>Password</label>
                    <input type="password" value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                    className='w-full p-2 border rounded'
                    placeholder='Enter your password'
                    />
                </div>
                <button className='w-full bg-black text-white p-2 rounded-lg font-semibold hover:bg-gray-800' type='submit' >
                    {loading?"loading...":"Sign Up"}
                </button>
                <p className='mt-6 text-center text-sm' >Already have an account?
                    <Link to={`/login?redirect=${encodeURIComponent(redirect)}`} className='text-blue-700 font-semibold underline ml-2'>
                    Login
                    </Link>
                </p>
            </form>
        </div>
        <div className='hidden:md w-1/2 bg-gray-800' >
            <div className='h-full flex flex-col justify-center items-center' >
                <img src={register} alt="Register your account" 
                className='h-[610px] w-full object-cover'/>
            </div>
        </div>
     </div>
   )
 }
 
 export default Register