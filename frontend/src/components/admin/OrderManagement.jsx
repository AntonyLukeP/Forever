import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { fetchAllOrders, updateOrderStatus } from '../../redux/slices/adminOrderSlice';

const OrderManagement = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state)=> state.auth);
  const { orders,loading, error } = useSelector((state)=> state.adminOrders);

    useEffect(() => {
        if (!user || user.role !== "admin") {
            navigate("/");
        } else {
            dispatch(fetchAllOrders());
        }
    }, [dispatch, navigate, user]);
  const handleStatusChange = (orderId,status)=>
  {
    dispatch(updateOrderStatus({id:orderId, status}))
  }

  if(loading) return <p>Loading...</p>
  if(error) return <p>Error: {error}</p>
  return (
    <div className='max-w-7xl mx-auto p-6' >
        <h2 className='font-bold text-3xl mb-8'  >Order Management</h2>
        <div className='overflow-x-auto shadow-md sm:rounded-lg' >
            <table className='min-w-full text-left text-gray-500' >
                <thead className='bg-gray-100 text-xs uppercase text-gray-700' >
                    <tr>
                        <th className='py-3 px-4' >Order Id</th>
                        <th className='py-3 px-4' >Customer</th>
                        <th className='py-3 px-4' >Total Price</th>
                        <th className='py-3 px-4' >Status</th>
                        <th className='py-3 px-4' >Action</th>

                    </tr>
                </thead>
                <tbody>
                    {orders.length>0?
                    (
                        orders.map((order)=>
                        (
                            <tr key={order._id} 
                            className='cursor-pointer border-b hover:bg-gray-50'
                            > 
                                <td className='text-gray-900 font-medium whitespace-nowrap py-4 px-4' >#{order._id}</td>
                                <td className='p-4' >{order.user.name}</td>
                                <td className='p-4' >${order.totalPrice.toFixed(2 )}</td>
                                <td className='p-4' >
                                        <select name="status" 
                                        value={order.status}
                                        onChange={(e)=>handleStatusChange(order._id,e.target.value)}
                                        id="" className='bg-gray-50 border border-gray-300 text-sm text-gray-900 rounded-lg p-3 focus:ring-blue-500  focus:border-blue-500' >
                                            <option value="Processing">Processing</option>
                                            <option value="Shipped">Shipped</option>
                                            <option value="Delivered">Delivered</option>
                                            <option value="Cancelled">Cancelled</option>

                                        </select>
                                </td>
                                <td className='p-4' >
                                    <button onClick={()=> handleStatusChange(order._id,"Delivered")} className='px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600' >
                                        Mask as Delivered
                                    </button>
                                </td>
                            </tr>
                        ))
                    ):
                    (
                        <tr>
                            <td
                            colSpan={5}
                            className="p-4 text-center text-gray-500"
                            >
                            No orders found.
                            </td>
                        </tr>
                        )
                        }
                </tbody>
            </table>

        </div>
    </div>
  )
}

export default OrderManagement