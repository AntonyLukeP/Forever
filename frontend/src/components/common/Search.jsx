import React, { useState, useEffect } from 'react'
import { HiMagnifyingGlass, HiMiniXMark } from 'react-icons/hi2';
import { useDispatch } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { fetchProductsByFilters, setFilters } from '../../redux/slices/productsSlice';

const Search = () => {

    const [searchTerm,setSearchTerm] = useState("");
    const [isOpen,setIsOpen] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [searchParams, setSearchParams] = useSearchParams();

    const handleSearchToggle = ()=>
    {
    
        setIsOpen(!isOpen);
    }
    const handleSearch = e =>
    {
        e.preventDefault();
        dispatch(setFilters({search:searchTerm}))
        dispatch(fetchProductsByFilters({search:searchTerm}));
        navigate(`/collections/all?search=${searchTerm}`)
        setIsOpen(false);
    }

    useEffect(() => {
  const value = searchParams.get("search") || "";
  setSearchTerm(value);
}, [searchParams]);


  return (
    <div className={`flex justify-center items-center w-full transition-all duration-300
    ${isOpen?"absolute top-0 left-0 w-full bg-white h-24 z-50":"w-auto"}`}>
        {isOpen?(<form onSubmit={handleSearch} className='relative flex justify-center w-full'> 
            <div className='relative w-1/2'>
                <input type="text" placeholder='Search' value={searchTerm} 
                onChange={e => setSearchTerm(e.target.value)}
                className='bg-gray-100 px-4 py-2 pl-2 pr-12 rounded-lg focus:outline-none w-full placeholder:text-gray-700'/>
                <button type='submit'
                className='absolute right-2 top-2 transform -translate-t-1/2 text-gray-600 hover:text-gray-800 cursor-pointer'>
                    <HiMagnifyingGlass className='h-6 w-6'/>
                </button>
            </div>
            <button onClick={handleSearchToggle} className='absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800'>
                <HiMiniXMark className='h-6 w-6'/>
            </button>
        </form>)
        : (
            <button onClick={handleSearchToggle} className='cursor-pointer'>
                <HiMagnifyingGlass className='h-6 w-6'/>
            </button>
        )}
    </div>
  )
}

export default Search