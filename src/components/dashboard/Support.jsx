import React from 'react'
import { IoIosArrowRoundBack } from 'react-icons/io'
import { useRestaurantsPathsContext } from '../../context/restaurantsPathsContext'
import { Link } from 'react-router-dom'

const Support = () => {
  const {selectedRestaurant} = useRestaurantsPathsContext()
  return (
    <section className='w-11/12 sm:w-5/6 mx-auto lg:w-1/2 mt-12 bg-gray-100 p-6 sm:p-12 rounded-lg'>
      <Link className="mb-4 flex items-center gap-1 text-sm" to={`/r/${selectedRestaurant}`}>
        <IoIosArrowRoundBack className="text-xl" />
        <span>Back</span>
      </Link>
      <h1 className='mb-4 text-xl xs:text-3xl font-bold'>Support</h1>
      <p>We do not answer calls. Please write us a message or leave a voice note.</p>

      <p className='my-3 flex gap-3'><span className='font-bold'>Whatsapp:</span> <a className='underline' href="tel:+9717437958">+971 743 7958</a></p>
      <p className='flex gap-3'><span className='font-bold'>Email:</span> <a className='underline' href="mailto:support@digidines.com">support@digidines.com</a></p>
    </section>
  )
}

export default Support
