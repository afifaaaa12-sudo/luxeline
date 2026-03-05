import React from 'react'

const NewsletterBox = () => {

    const onSubmitHandler= (event)=>{
        event.preventDefault();
    }

  return (
    <div className='text-center px-4'>
        <p className='text-2xl font-medium text-gray-800'>Subscribe Now and get 20% off</p>
        <p className='text-gray-400 mt-3'>Discover refined fashion created with premium fabrics, elegant silhouettes, and meticulous attention to detail, delivering effortless style for every moment.</p>
      <form onSubmit={onSubmitHandler}  className='w-full sm:w-1/2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mx-auto my-6 border p-3'>
        <input className='w-full sm:flex-1 outline-none' required type="email" placeholder='Enter Your Email' />
        <button type='submit' className='bg-black text-white text-xs px-8 py-3 sm:py-4'>SUBSCRIBE</button>
      </form>
    </div>
  )
}

export default NewsletterBox
