import React from 'react'
import {Routes,Route} from 'react-router-dom'
import {UserLayout} from '../components/layout/UserLayout'
import Home from '../pages/Home'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Profile from '../pages/Profile'
import Collections from '../pages/Collections'
import ProductDetails from '../components/products/ProductDetails'
import Checkout from '../components/cart/Checkout'
import OrderConfirmationPage from '../pages/OrderConfirmationPage'
import OrderDetails from '../pages/OrderDetails'
import MyOrders from '../pages/MyOrders'
import AdminLayout from '../components/admin/AdminLayout'
import AdminDashboard from '../components/admin/AdminDashboard'
import UserManagement from '../components/admin/UserManagement'
import ProductManagement from '../components/admin/ProductManagement'
import EditProductPage from '../components/admin/EditProductPage'
import OrderManagement from '../components/admin/OrderManagement'
import ProtectedRoute from '../components/common/ProtectedRoute'

const AllRoutes = () => {
  return (
    <Routes >
      <Route path="/" element={<UserLayout/>} >
          <Route index element={<Home/>}/>
          <Route path='login' element={<Login/>} />
          <Route path='register' element={<Register/>} />
          <Route path='profile' element={<Profile/>} />
          <Route path='collections/:collection' element={<Collections/>}/>
          <Route path='product/:id' element={<ProductDetails/>} />
          <Route path='checkout' element={<Checkout/>} />
          <Route path='order-confirmation' element={<OrderConfirmationPage/>} ></Route>
          <Route path='order/:id' element={<OrderDetails/>} ></Route>
          <Route path='my-orders' element={<MyOrders/>} ></Route>
      </Route>
      <Route path='/admin' element={<ProtectedRoute role={"admin"} ><AdminLayout/></ProtectedRoute>} >
          <Route index element={<AdminDashboard/>} ></Route>
          <Route path='users' element={<UserManagement/>}  ></Route>
          <Route path='products' element={<ProductManagement/>}  ></Route>
          <Route path='products/:id/edit' element={<EditProductPage/>} ></Route>
          <Route path='orders' element={<OrderManagement/>} ></Route>
      </Route>
      </Routes>
  )
}

export default AllRoutes