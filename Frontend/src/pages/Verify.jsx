import React, { useContext, useEffect } from 'react'
import { ShopContext } from '../context/ShopContext'
import { useSearchParams } from 'react-router-dom'
import axios from 'axios'
import {toast} from 'react-toastify' 

const Verify = () => {

    const {navigate , token , setCartItem , backendUrl} = useContext(ShopContext)
    const [searchparams] = useSearchParams()

    const success = searchparams.get('success')
    const orderId = searchparams.get('orderId')

    const verifyPayment = async () => {
       try {
         if(!token){
            return null
        }
        let response
        try {
            response = await axios.post(backendUrl + '/api/order/verifyStripe' , {success , orderId}, {headers:{token}})
        } catch (err) {
            if (err?.response?.status === 404) {
                response = await axios.post(backendUrl + '/api/order/verify' , {success , orderId}, {headers:{token}})
            } else {
                throw err
            }
        }

        if(response.data.success){
            setCartItem({})
            navigate('/orders')
        }
        else{
            navigate('/cart')
        }
       } catch (error) {
        console.log(error);
        toast.error(error.message)
        
       }
    }

    useEffect(()=>{
        verifyPayment()
    },[token])

  return (
    <div>
      
    </div>
  )
}

export default Verify;
