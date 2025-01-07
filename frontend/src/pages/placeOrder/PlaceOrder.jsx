import React, { useContext } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../Context/StoreContext'

function PlaceOrder() {

  const {getTotalCartAmount} = useContext(StoreContext)

  return (
    <form className="place-order">
        <div className="place-order-left">
          <p className='title'>Customer Information</p>
            <div className="multiple-fields">
              <input type="text" placeholder='Enter Full Name' />
            </div>
            <div className="multiple-field1">
              <input type="text" placeholder='Enter Mobile Number' />
            </div>
            <div className="multiple-field2">
              <input type="text" placeholder='Enter Email Address' />
            </div>
          
        </div>
        <div className="place-order-right">
          <div className="cart-total">
            <h2>Cart Totals</h2>
            <div>
              <div className="cart-total-details">
                <b>Total</b>
                <b>${getTotalCartAmount()}</b>
              </div>
              <hr />
            </div>
            <button >PROCEED TO PAYMENT</button>
          </div>
        </div>
    </form>
  )
}

export default PlaceOrder