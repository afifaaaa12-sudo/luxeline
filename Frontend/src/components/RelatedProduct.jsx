import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'
import ProductItem from './ProductItem'

const RelatedProduct = ({ category, subCategory, currentProductId }) => {

  const { products } = useContext(ShopContext)
  const [related, setRelated] = useState([])

  useEffect(() => {

    // prevent running with invalid props
    if (!products.length || !category || !subCategory) {
      setRelated([])
      return
    }

    const filtered = products
      .filter(item =>
        item?.category?.toLowerCase() === category?.toLowerCase() &&
        item?.subCategory?.toLowerCase() === subCategory?.toLowerCase() &&
        item?._id !== currentProductId &&        // exclude current product
        item?.image                              // prevent image undefined crash
      )
      .slice(0, 5)

    setRelated(filtered)

  }, [products, category, subCategory, currentProductId])

  if (!related.length) return null

  return (
    <div className='my-24'>
      <div className='text-center text-xl py-2'>
        <Title text1={'RELATED'} text2={'PRODUCT'} />
      </div>

      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
        {related.map((item) => (
          <ProductItem
            key={item._id}
            id={item._id}
            name={item.name}
            price={item.price}
            image={item.image}
          />
        ))}
      </div>
    </div>
  )
}

export default RelatedProduct