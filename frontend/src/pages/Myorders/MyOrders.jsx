import React, { useContext, useEffect, useState } from 'react'
import './MyOrders.css'
import { StoreContext } from '../../Context/StoreContext';
import { headers } from 'next/headers';

const MyOrders = () => {

    const {url,token} = useContext(StoreContext)
    const [data, setdata] = useState([]);

    const fetchOrders = async () => {
        const response = await axios.post(url+"/api/order/userorders",{},{headers:{token}})
        setdata(response.data.data)
        console.log(response.data.data);
    }

    useEffect(()=>{
        if (token) {
            fetchOrders();
        }
    },[token])


  return (
    <div>MyOrders</div>
  )
}

export default MyOrders