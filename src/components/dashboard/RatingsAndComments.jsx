import React from 'react'
import { useRestaurantDetailsContext } from '../../context/restaurantDetailsContext'

const RatingsAndComments = () => {
  const {showSection} = useRestaurantDetailsContext()
  return (
    <div className={`${showSection === 4 ? "block" : "hidden"}`}>
      ratings and comments
    </div>
  )
}

export default RatingsAndComments
