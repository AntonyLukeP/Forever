import React from 'react'
import { useSearchParams } from 'react-router-dom'

const SortOptions = () => {

  const [searchParams,setSearchParams] = useSearchParams();

  const handleSortChange = (e)=>
  {
    const value = e.target.value;
    if(value==="")
      searchParams.delete("sortBy")
    else
    searchParams.set("sortBy",value);
    setSearchParams(searchParams);
  }

  return (
    <div className='flex justify-end items-center mb-2' >
        <select name="" id="sort"
        value={searchParams.get("sortBy")||""}
        onChange={handleSortChange}
        className='border p-2 rounded-md focus:outline-none'
        >
          <option value="" defaultChecked>Default</option>
          <option value="price:Desc">Price: High to Low</option>
          <option value="price:Asc">Price: Low to High</option>
          <option value="popularity">Popularity</option>

        </select>
    </div>
  )
}

export default SortOptions