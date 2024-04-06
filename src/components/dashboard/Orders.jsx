import React from 'react'
import { useRestaurantDetailsContext } from '../../context/restaurantDetailsContext'

const Orders = () => {
  const {showSection} = useRestaurantDetailsContext()
  return (
    <div className={`${showSection === 2 ? "block" : "hidden"}`}>
      orders
    </div>
  )
}

export default Orders
