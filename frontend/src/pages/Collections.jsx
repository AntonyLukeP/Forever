import React, { useEffect, useRef,useState } from 'react'
import { FaFilter } from 'react-icons/fa6'
import FilterSidebar from '../components/products/FilterSidebar'
import SortOptions from '../components/products/SortOptions';
import ProductGrid from '../components/products/ProductGrid';
import { useParams, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductsByFilters } from '../redux/slices/productsSlice';

const Collections = () => {

  const { collection } = useParams();
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const { products,loading,error } = useSelector((state) => state.products);
  const queryParams = Object.fromEntries([...searchParams]);

  const sidebarRef = useRef(null);
  const [isSidebarOpen , setIsSidebarOpen] = useState(false);


  useEffect(()=>
  {
    dispatch(fetchProductsByFilters({collection, ...queryParams}))
  },
  [dispatch, collection, searchParams]);

  const toggleSidebar = ()=>
  {
    setIsSidebarOpen(!isSidebarOpen);
  }

  const handleClickOutside = (e)=>
  {
    if(sidebarRef.current && !sidebarRef.current.contains(e.target))
      setIsSidebarOpen(false);
  }

  useEffect(()=>
  {
    document.addEventListener("mousedown",handleClickOutside);

    return ()=>
    {
      document.removeEventListener("mousedown",handleClickOutside);
    } 
  },[])

  return (
    <div className='flex flex-col lg:flex-row' >
          <button onClick={toggleSidebar}  className='lg:hidden border p-2 flex justify-center items-center' >
            <FaFilter className='mr-2'/> Filters
          </button>

          <div ref={sidebarRef} className={`${isSidebarOpen ?"translate-x-0":"-translate-x-full"} fixed z-50 inset-y-0 left-0 bg-white w-64 overflow-y-auto shadow-lg transition-transform duration-300 lg:translate-x-0 lg:static`} >
            <FilterSidebar/>
          </div>
          <div className='grow p-4' >
            <h2></h2>
            <SortOptions/>

            <ProductGrid products={products} loading={loading} error={error} />
          </div>

    </div>
  )
}

export default Collections