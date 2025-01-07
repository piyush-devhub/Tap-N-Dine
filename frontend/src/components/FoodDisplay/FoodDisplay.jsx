import React, { useContext } from 'react'
import './FoodDisplay.css'
import { StoreContext } from '../../Context/StoreContext'
import FoodItem from '../FoodItem/FoodItem'

const FoodDisplay = ({category})=> {
    const {food_list} = useContext(StoreContext)

  return (
    <div className='food-display' id='food-display'>
        <h2>Best Seller Dishes</h2>
        <div className="Food-display-list">
          {food_list.map((item,index)=>{
            {console.log(category,item.category)}
            if (category==="All" || category===item.category){
              return <FoodItem key={index} id={item._id} name={item.name} description={item.description} price={item.price} image={item.image} prepTime={item.prepTime}/>
            }
            })
          }
        </div>
        
    </div>
  )
}

export default FoodDisplay