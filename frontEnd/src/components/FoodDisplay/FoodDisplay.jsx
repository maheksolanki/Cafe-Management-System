import React, { useContext } from 'react'
import "./FoodDisplay.css";
import { StoreContext } from '../../context/storeContex';
import FoodItem from '../FoodItem/FoodItem';

const FoodDisplay = ({category}) => {
  //we use the context api to filter our foodlist item
  const {food_list} = useContext(StoreContext);
  return (
    <div className='food-display' id='food-display'>
      <h2>Top dishes near you</h2>
      <div className='food-display-list'>
        {
          food_list.map((item,index)=>{
            //this condition for filter the items.
            //and category set in the explore menu component if click item is not equal to previus item then current item name is set in category and if prev value and current item are same so that it set all and display all item.
            if(category === "All" || category === item.category){
              return <FoodItem key={index} id={item._id} name={item.name} description={item.description} price={item.price} image={item.image} />
            }
          })
        }
      </div>
    </div>
  )
}

export default FoodDisplay
