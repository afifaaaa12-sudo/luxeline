import React, { useContext, useEffect, useState } from 'react'
import Title from './Title'
import { ShopContext } from '../context/ShopContext'
import ProductItem from './ProductItem'

const BestSeller = () => {
  const { products } = useContext(ShopContext)
  const [bestseller, setBestSeller] = useState([])

  useEffect(() => {
    const bestProduct = products.filter(item => item.bestseller)
    setBestSeller(bestProduct.slice(0, 5))
  }, [products])

  return (
    <>
      <hr className="my-6 border-gray-500" />

      <div className='my-10 px-4 sm:px-6 md:px-10'>
        {/* heading */}
        <div className='py-8 text-3xl text-center flex flex-col items-center'>
          <Title text1={'BEST'} text2={'SELLERS'} />

          <p className='max-w-xl mx-auto text-sm md:text-base text-gray-600 animate-fadeInUp'>
            Curated favorites that embody refined design, premium craftsmanship, and effortless sophistication.
          </p>
        </div>

        {/* grid */}
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
          {
            bestseller.map((item, index) => (
              <div
                key={item._id}   // fixed key
                className='opacity-0 animate-fadeInUp'
                style={{ animationDelay: `${index * 120}ms` }}
              >
                <ProductItem
                  _id={item._id}   // FIXED (must pass _id)
                  image={item.image}
                  name={item.name}
                  price={item.price}
                />
              </div>
            ))
          }
        </div>
      </div>
    </>
  )
}

export default BestSeller


