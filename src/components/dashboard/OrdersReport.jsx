import React from 'react'
import { useRestaurantDetailsContext } from '../../context/restaurantDetailsContext'

const OrdersReport = () => {
  const {showSection} = useRestaurantDetailsContext()
  return (
    <div className={`${showSection === 3 ? "block" : "hidden"}`}>
      orders report
    </div>
  )
}

export default OrdersReport
