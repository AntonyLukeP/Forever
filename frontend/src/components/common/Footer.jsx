import React from 'react'
import { FaInstagram, FaMeta, FaPhone, FaXTwitter } from 'react-icons/fa6'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className='border-t py-12'>
        <div className='container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-4 lg:px-0'>
            <div>
                <h3 className='text-lg text-gray-800 mb-4'>Newsletter</h3>
                <p className='text-gray-500 mb-4'>Be the first to hear about new products, exclusive events, and online offers.</p>
                <p className='text-sm font-medium text-gray-600 mb-6'>Sign up and get 10% off on yout first order</p>
                <form className='flex'>
                    <input type="email" placeholder='Enter your email'
                    className='p-3 w-full text-sm border-t border-l border-b border-gray-300 rounded-l-md
                    focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all' required />
                    <button className='bg-black text-white px-6 py-3 text-sm rounded-r-md hover:bg-gray-800 transition-all' type='submit'>Subscribe</button>
                </form>
            </div>
            <div>
              <h3 className='text-lg text-gray-800 mb-4'>Shop</h3>
              <ul className='text-gray-600 space-y-2'>
                <li>
                  <Link to="#" className="text-gray-500 transition-colors" >Men's top wear</Link>
                </li>
                <li>
                  <Link to="#" className="text-gray-500 transition-colors" >Women's top wear</Link>
                </li>
                <li>
                  <Link to="#" className="text-gray-500 transition-colors" >Men's bottom wear</Link>
                </li>
                <li>
                  <Link to="#" className="text-gray-500 transition-colors" >Women's bottom wear</Link>
                </li>
              </ul>
            </div>

            <div>
                <h3 className='text-lg text-gray-800 mb-4'>Support</h3>
              <ul className='text-gray-600 space-y-2'>
                <li>
                  <Link to="#" className="text-gray-500 transition-colors" >Contact Us</Link>
                </li>
                <li>
                  <Link to="#" className="text-gray-500 transition-colors" >About Us</Link>
                </li>
                <li>
                  <Link to="#" className="text-gray-500 transition-colors" >FAQs</Link>
                </li>
                <li>
                  <Link to="#" className="text-gray-500 transition-colors" >Features</Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className='text-lg text-gray-800 mb-4' >Follow Us</h3>
              <div className='flex items-center space-x-4 mb-6'>
                  <a href="https://www.facebook.com" target='_blank' rel='noopener noreferrer'
                  className='hover:text-gray-300'>
                    <FaMeta className='h-6 w-6'/>
                  </a>
                  <a href="https://www.facebook.com" target='_blank' rel='noopener noreferrer'
                  className='hover:text-gray-300'>
                    <FaInstagram className='h-6 w-6'/>
                  </a>
                  <a href="https://www.facebook.com" target='_blank' rel='noopener noreferrer'
                  className='hover:text-gray-300'>
                    <FaXTwitter className='h-6 w-6'/>
                  </a>
              </div>
              <p className='text-gray-500'>Call Us</p>
              <p><FaPhone className='inline-block mr-2'/>0123-456-789</p>
            </div>
        </div>
        <div className='container mx-auto mt-12 px-4 lg:px-0 border-t border-gray-200 pt-6'>
          <p className='text-center tracking-tighter text-sm text-gray-500'>@ 2025,Antony Luke. All Rights Reeserved</p>
        </div>
    </footer>
  )
}

export default Footer