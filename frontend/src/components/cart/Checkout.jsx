import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Paypal from './Paypal';
import { useDispatch, useSelector } from 'react-redux';
import { createCheckout } from '../../redux/slices/checkoutSlice';
import axios from 'axios';

const Checkout = () => {

  const [checkoutId,setCheckoutId] = useState(null);

  const dispatch = useDispatch();
  const { cart,loading,error } =  useSelector((state)=> state.cart);
  const { user } = useSelector((state)=> state.auth);

  const navigate = useNavigate();
  const [shippingAddress,setShippingAddress] = useState({
    firstName : "",
    lastName : "",
    address : "",
    city : "",
    postalCode : "",
    country : "",
    phone : ""
  })

  useEffect(()=>{
    if(!cart || !cart.products || cart.products.length === 0){
        navigate("/");
    }
  },[cart,navigate]);

  const handleCreateCheckout = async(e) =>
  {
    e.preventDefault();
    if(cart && cart.products.length>0)
    {
        const res = await dispatch(createCheckout({
            checkoutItems : cart.products,
            shippingAddress,
            paymentMethod:"Paypal",
            totalPrice: cart.totalPrice,
        }))

        if(res.payload && res.payload._id)
    {
        setCheckoutId(res.payload._id);
    }
    }
  }

  const handlePaymentSuccess = async(details) =>
  {
        try {
            const response = await axios.put(
                `${import.meta.env.VITE_BACKEND_URL}/api/checkout/${checkoutId}/pay`,
                { paymentStatus : "paid", paymentDetails: details },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
                    }
                }
            )
           
                await handleFinalizeCheckout(checkoutId);
           
        } catch (error) {
            console.error(error);
        }  
  }

  const handleFinalizeCheckout = async(checkoutId)=>{
    try {
        const response = await axios.post(
            `${import.meta.env.VITE_BACKEND_URL}/api/checkout/${checkoutId}/finalize`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("userToken")}`
                }
            }
        )
      
            navigate("/orderconfirmation");
        
    } catch (error) {
        console.error(error);
    }
  }

  if(loading) return <p>Loading cart ...</p>
  if(error) return <p>Error loading cart: {error}</p>
  
  if(!cart || !cart.products || cart.products.length === 0)
  {
    navigate("/");
    return null;
  }


  return (
    <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto py-10 px-6 tracking-tighter' >
        <div className='p-6' >
            <h2 className='text-2xl font-medium uppercase mb-6' >Checkout</h2>
            <form onSubmit={handleCreateCheckout} >
                <h3 className='text-lg mb-4' >Contact Details</h3>
                <div className='mb-4' >
                    <label className='block text-gray-700'>Email</label>
                    <input type="email"
                    value={user? user.email:""}
                    disabled
                    className='w-full bg-gray-100 p-2  rounded'
                    />
                </div>
                <h3 className='text-lg mb-4' >Delivery</h3>
                <div className='grid grid-cols-2 mb-4 gap-2'>
                    <div>
                        <label className='block text-gray-700' >First Name</label>
                        <input type="text"
                        value={shippingAddress.firstName}
                        className='w-full p-2 border rounded'
                        onChange={(e)=>
                            setShippingAddress({...shippingAddress,
                                firstName:e.target.value})}

                        
                        />
                    </div>
                    <div>
                        <label className='block text-gray-700' >Last Name</label>
                        <input type="text"
                        value={shippingAddress.lastName}
                        className='w-full p-2 border rounded'
                        onChange={(e)=>
                            setShippingAddress({...shippingAddress,
                                lastName:e.target.value})}                  
                        />
                    </div>                    
                </div>
                <div className='mb-4' >
                    <label className='block text-gray-700' >Address</label>
                    <input type="text"
                    className='w-full p-2 border rounded'
                    value={shippingAddress.address}

                    onChange={(e)=>
                    {
                        setShippingAddress({...shippingAddress,
                            address:e.target.value
                        })
                    }
                    }
                    />
                </div>
                <div className='grid grid-cols-2 mb-4 gap-2'>
                    <div>
                        <label className='block text-gray-700' >City</label>
                        <input type="text"
                        value={shippingAddress.city}
                        className='w-full p-2 border rounded'
                        onChange={(e)=>
                            setShippingAddress({...shippingAddress,
                                city:e.target.value})}

                        
                        />
                    </div>
                    <div>
                        <label className='block text-gray-700' >Postal Code</label>
                        <input type="text"
                        value={shippingAddress.postalCode}
                        className='w-full p-2 border rounded'
                        onChange={(e)=>
                            setShippingAddress({...shippingAddress,
                                postalCode:e.target.value})}                  
                        />
                    </div>                    
                </div>
                <div className='mb-4' >
                    <label className='block text-gray-700' >Country</label>
                    <input type="text"
                    className='w-full p-2 border rounded'
                    value={shippingAddress.country}

                    onChange={(e)=>
                    {
                        setShippingAddress({...shippingAddress,
                            country:e.target.value
                        })
                    }
                    }
                    />
                </div>
                <div className='mb-4' >
                    <label className='block text-gray-700' >Phone</label>
                    <input type="tel"
                    className='w-full p-2 border rounded'
                    value={shippingAddress.phone}

                    onChange={(e)=>
                    {
                        setShippingAddress({...shippingAddress,
                            phone:e.target.value
                        })
                    }
                    }
                    />
                </div>
                <div className='mb-4' >
                    {(!checkoutId && cart.products.length > 0)?
                    (
                        <button
                        type='submit'
                        className='w-full py-3 bg-black text-white rounded' >
                        Continue to Payment
                    </button>
                    ):(
                        <div>
                            <h3 className='text-lg mb-4' >Pay with Paypal</h3>
                            <Paypal amount={cart.totalPrice} onSuccess={handlePaymentSuccess}
                            onError={(err)=> alert("Payment failed... Try again. Error",err)}
                            />
                        </div>
                    )}
                </div>
            </form>
        </div>
        {/* right-sec */}
        <div className='bg-gray-50 p-6 rounded-lg' >
            <h3 className='text-lg mb-4' >Order Summary</h3>
            <div className='border-t border-gray-300 py-4 mb-4' >
                {cart.products.map((product,index)=>
                (
                    <div key={index}
                    className='flex items-start justify-between py-2 border-b border-gray-300'
                    >
                        <div className='flex  items-start' >
                            <img src={product.image} alt={product.name}
                            className='w-28 h-24 object-cover mr-4' />
                            <div>
                                <h3 className='text-md' >{product.name}</h3>
                                <p className='text-gray-500' >Size: {product.size}</p>
                                <p className='text-gray-500' >Colour: {product.color}</p>
                            </div>
                        </div>
                        <p className='text-xl' >${product.price?.toLocaleString()}</p>
                    </div>
                ))}
            </div>
            <div className='flex justify-between items-center text-lg' >
                <p>Subtotal</p>
                <p>${cart.totalPrice.toLocaleString()}</p>
            </div>
            <div className='flex justify-between items-center text-lg' >
                <p>Shipping</p>
                <p>Free</p>
            </div>
            <div className='flex justify-between items-center text-lg mt-4 border-t border-gray-300 pt-4' >
                <p>Total</p>
                <p>${cart.totalPrice.toLocaleString()}</p>
            </div>
        </div>
    </div>
  )
}

export default Checkout