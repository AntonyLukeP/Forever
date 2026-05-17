import React from 'react'
import mensCollectionImage from "../../assets/mens-collection.webp";
import womensCollectionImage from "../../assets/womens-collection.webp";
import { Link } from "react-router-dom";

const GenderCollectionSection = () => {
  return (
    <section className='py-16 px-4 lg:px-0'>
        <div className='container mx-auto flex flex-col md:flex-row gap-8'>
            <div className='flex-1 relative'>
                <img src={womensCollectionImage} alt="Women's Collection"
                className='object-cover w-full h-[700px]' />
                <div className='absolute bottom-8 left-8 bg-white opacity-90 p-4'>
                    <h2 className='text-2xl font-bold mb-3 text-gray-900'>Women's Collection</h2>
                    <Link to="/collections/all?gender=Women" className="underline text-gray-900">Shop Now</Link>
                </div>
            </div>
            <div className='flex-1 relative'>
                <img src={mensCollectionImage} alt="Men's Collection"
                className='object-cover w-full h-[700px]' />
                <div className='absolute bottom-8 left-8 bg-white opacity-90 p-4'>
                    <h2 className='text-2xl font-bold mb-3 text-gray-900'>Men's Collection</h2>
                    <Link to="/collections/all?gender=Men" className="underline text-gray-900">Shop Now</Link>
                </div>
            </div>
        </div>
    </section>
  )
}

export default GenderCollectionSection