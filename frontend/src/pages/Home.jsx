import React, { useEffect, useState } from 'react'
import Hero from '../components/layout/Hero'
import GenderCollectionSection from '../components/products/GenderCollectionSection'
import NewProducts from '../components/products/NewProducts'
import ProductDetails from '../components/products/ProductDetails'
import ProductGrid from '../components/products/ProductGrid'
import FeaturedCollection from '../components/products/FeaturedCollection'
import FeaturesSection from '../components/products/FeaturesSection'
import { useDispatch,useSelector } from 'react-redux'
import { fetchProductsByFilters } from '../redux/slices/productsSlice'
import axios from "axios"

const Home = () => {

  const dispatch = useDispatch();
  const { products,loading,error } = useSelector((state) => state.products);
  const [bestSellerProduct, setBestSellerProduct] = useState(null);

  useEffect(()=>{
    dispatch(
      fetchProductsByFilters({
        gender : "Women",
        category : "Top Wear",
        limit:8
      })
    )
    const fetchBestSeller = async()=>
    {
      try{
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/products/best-seller`
        );
        
        setBestSellerProduct(response.data);
      }
      catch(error)
      {
        console.error("Error fetching best seller:",error);
      }
    }
    fetchBestSeller();
  },[dispatch])

  return (
    <div>
        <Hero />
        <GenderCollectionSection/>
        <NewProducts/>

        <h2 className='text-3xl font-bold text-center mb-4' >Best Seller</h2>
        {
          bestSellerProduct?(
            <>
              <ProductDetails productId={bestSellerProduct._id} />
            </>
            ) : 
            (<p className='text-center' >Loading best seller...</p>)
        }

        <div className='container mx-auto' >
          <h2 className='text-3xl text-center font-bold mb-4' >Top Wears for Women</h2>
        
        <ProductGrid products={products} loading={loading} error={error} />
        </div>
        <FeaturedCollection/>
        <FeaturesSection />
    </div>
  )
}

export default Home