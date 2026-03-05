import React from 'react'
import { assets } from '../assets/frontend_assets/assets';

const Footer = () => {
  return (
    <div className='mt-10'>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 text-sm'>

        {/* LEFT */}
        <div>
          <img src={assets.logo} className='mb-5 w-32' alt="logo" />
          <p className='w-full md:w-2/3 text-gray-600'>
            <b>LUXELINE</b> represents refined elegance and contemporary sophistication.
            Our collections are thoughtfully crafted using premium fabrics and precise
            tailoring to deliver timeless silhouettes with a modern edge. Designed for
            those who value quality, comfort, and understated luxury, each piece reflects
            effortless style for every occasion.
          </p>
        </div>

        {/* CENTER */}
        <div>
          <p className='text-xl font-medium mb-5'>COMPANY</p>
          <ul className='flex flex-col gap-1 text-gray-600'>
            <li className='cursor-pointer hover:text-black'>Home</li>
            <li className='cursor-pointer hover:text-black'>About Us</li>
            <li className='cursor-pointer hover:text-black'>Delivery</li>
            <li className='cursor-pointer hover:text-black'>Privacy Policy</li>
          </ul>
        </div>

        {/* RIGHT */}
        <div>
          <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
          <ul className='flex flex-col gap-1 text-gray-600'>
            <li>+110-939-999</li>
            <li>luxeline@gmail.com</li>
          </ul>
        </div>

      </div>

      {/* COPYRIGHT */}
      <div>
        <hr />
        <p className='py-5 text-sm text-center'>
          Copyright 2026 © luxeline.dev - All Rights Reserved
        </p>
      </div>
    </div>
  )
}

export default Footer;
