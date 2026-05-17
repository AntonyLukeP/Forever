import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { deleteProduct, fetchAdminProducts } from '../../redux/slices/adminProductSlice';

const ProductManagement = () => {

    const dispatch = useDispatch();
    const {products,loading,error} = useSelector((state)=>state.adminProducts);

    useEffect(()=>{
        dispatch(fetchAdminProducts());
    },[dispatch])

    if(loading) return <div className='p-6' >Loading...</div>;
    if(error) return <div className='p-6' >Error: {error}</div>;

    const handleDelete = (productID)=>
    {
        if(window.confirm("Are you sure you want to delete this product?"))
        {
            dispatch(deleteProduct(productID));
        }

    }
  return (
    <div className='max-w-7xl mx-auto p-6'>
        <h2 className='font-bold text-3xl mb-8'  >Product Management</h2>
        <div className='overflow-x-auto shadow-md sm:rounded-lg' >
            <table className='min-w-full text-left text-gray-500' >
                <thead className='uppercase text-gray-700 text-xs bg-gray-100' >
                    <tr>
                        <th className='px-4 py-3' >Name</th>
                        <th className='px-4 py-3' >Price</th>
                        <th className='px-4 py-3' >SKU</th>
                        <th className='px-4 py-3' >Action</th>
                    </tr>
                </thead>
                <tbody>
                    {products.length>0?(
                        products.map((product)=>
                        (
                            <tr key={product._id} 
                            className='cursor-pointer border-b hover:bg-gray-50'
                            >
                                <td className='text-gray-900 whitespace-nowrap p-4 font-medium' >{product.name}</td>
                                <td className='p-4' >&{product.price}</td>
                                <td className='p-4' >{product.sku}</td>
                                <td className='p-4' ><Link 
                                to={`/admin/products/${product._id}/edit`} 
                                className='bg-yellow-500 text-white px-2 py-3 rounded mr-2 hover:bg-yellow-600' >
                                Edit</Link>
                                <button className='bg-red-500 text-white hover:bg-red-600 px-2 py-3 rounded' onClick={()=>handleDelete(product._id)} >Delete</button>
                                </td>
                            </tr>
                        )))
                    
                    :(
                        <tr aria-colspan={4}  className='text-center p-4 text-gray-500' >No products found</tr>
                    )}
                </tbody>
            </table>
        </div>

    </div>
  )
}

export default ProductManagement  