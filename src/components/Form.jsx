import React from 'react'
import formImage from "../assets/landing-page-images/form-image.png"

const Form = () => {
  return (
    <section className='w-11/12 mx-auto flex flex-col md:flex-row gap-12 py-16'>
        <img className='md:w-1/3 lg:w-1/2 object-cover' src={formImage} alt="" />
        <form className='flex flex-col gap-5'>
            <h1 className='text-xl font-bold mb-2'>Don't Hesitate To Send Your Message To Us</h1>
            <input className='px-2 py-3 border-2 border-hoverColor rounded-lg outline-none' type="text" placeholder='Name' />
            <input className='px-2 py-3 border-2 border-hoverColor rounded-lg outline-none' type="email" placeholder='Email' />
            <input className='px-2 py-3 border-2 border-hoverColor rounded-lg outline-none' type="text" placeholder='Company Name' />
            <input className='px-2 py-3 border-2 border-hoverColor rounded-lg outline-none' type="tel" placeholder='Phone Number' />
            <textarea className='px-2 py-3 outline-none border-2 border-hoverColor rounded-lg resize-none' cols="30" rows="4" placeholder='Message'></textarea>
            <button className='bg-mainColor text-gray-100 py-4 rounded-lg'>Submit</button>
        </form>
    </section>
  )
}

export default Form
