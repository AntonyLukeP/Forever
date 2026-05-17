import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { addUser, deleteUser, fetchUsers, updateUser } from '../../redux/slices/adminSlice';

const UserManagement = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const { user } = useSelector((state) => state.auth);
    const { users,loading,error } = useSelector((state)=> state.admin)
    
    useEffect(()=>{
        if(user && user.role!=="admin"){
            navigate("/");
        }
    },[user,navigate]);

    useEffect(()=>{
        if(user && user.role === "admin"){
            dispatch(fetchUsers());
        }
    },[dispatch,user])

    const [formData,setFormData] = useState({
        name:"",
        email:"",
        password:"",
        role:"customer"
    })

    const handleChange = (e)=>
    {
        setFormData(
            {...formData,
                [e.target.name] : e.target.value,
            }
        )
    }

    const handleFormSubmit = (e)=>
    {
        e.preventDefault();
        dispatch(addUser(formData));

        setFormData({
            name:"",
            email:"",
            password:"",
            role:"customer"
        })

    }

    const handleRoleChange = (userID,newRole)=>
    {
        dispatch(updateUser({id:userID, role:newRole}))
    }

    const handleDeleteUser = (userID)=>
    {
        if(window.confirm("Are you sure you want to delete this user?"))
        {
            dispatch(deleteUser(userID))        
        }
    }


  return (
    <div className='p-6 max-w-7xl mx-auto' >
            <h2 className='font-bold text-3xl mb-8' >User Management</h2>
            {loading && <p>Loading...</p>}
            {error && <p>Error:{error}...</p>}
            <div className='px-8 mb-6' >
                    <h2 className='font-bold text-xl mb-4' >Add New User</h2>
                    <form onSubmit={handleFormSubmit} >
                        <div className='mb-4' >
                            <label className='block  text-gray-700'>Name</label>
                            <input type="text" name="name" value={formData.name} onChange={handleChange} 
                            className='w-full p-2 border rounded'
                            />
                        </div>
                        <div className='mb-4' >
                            <label className='block  text-gray-700'>Email</label>
                            <input type="email" name="email" value={formData.email} onChange={handleChange} 
                            className='w-full p-2 border rounded'
                            />
                        </div>
                        <div className='mb-4' >
                            <label className='block  text-gray-700'>Password</label>
                            <input type="password" name="password" value={formData.password} onChange={handleChange} 
                            className='w-full p-2 border rounded'
                            />
                        </div>
                        <div className='mb-4' >
                            <label className='block  text-gray-700'>Role</label>
                            <select name="role" value={formData.role}
                            onChange={handleChange} className='w-full p-2 border rounded'
                            >
                                <option value="customer">Customer</option>
                                <option value="admin">Admin</option>
                            </select>
                        </div>
                        <button className='text-white bg-green-500 py-2 px-4 rounded
                         hover:bg-green-600' type='submit' >Add User</button>
                    </form>
            </div>
            <div className='overflow-x-auto shadow-md sm:rounded-lg' >
                <table className='min-w-full bg-gray-0 text-left' >
                    <thead className='uppercase text-gray-700 bg-gray-50 text-xs' >
                        <tr>
                            <th className='py-3 px-4'>Name</th>
                            <th className='py-3 px-4'>Email</th>
                            <th className='py-3 px-4'>Role</th>
                            <th className='py-3 px-4'>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user)=>
                        (
                            <tr key={user._id} className='cursor-pointer border-b hover:bg-gray-50'>
                                <td className='p-4 text-gray-900 font-medium' >{user.name}</td>
                                <td className='p-4' >{user.email}</td>
                                <td className='p-4' >
                                    <select name="role" value={user.role}
                                    className='p-2 border rounded'
                                    onChange={(e)=>handleRoleChange(user._id,e.target.value)}
                                    >
                                        <option value="customer">Customer</option>
                                        <option value="admin">Admin</option>
                                    </select>
                                </td>
                                <td className='p-4' >
                                    <button onClick={()=>handleDeleteUser(user._id)} className='
                                    bg-red-500 text-white hover:bg-red-600 px-4 py-2 rounded
                                    ' >Delete</button>
                                </td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
    </div>
  )
}

export default UserManagement