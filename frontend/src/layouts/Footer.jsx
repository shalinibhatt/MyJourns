import React from 'react'
import { NavLink } from 'react-router-dom'

const Footer = () => {
  return (

    <footer className='bg-[#dddfe0] w-full'>
    <nav className='text-center'>
      <ul className='flex justify-between w-[90%] m-auto text-blue-800 font-bold py-2 text-lg'>
            <li><NavLink to="/">TodoFie</NavLink></li>
            <li>Aim Higher</li>
            <li>Complete your goals</li>
            <li>Your goals our responsibility</li>
        </ul>
        </nav>
    </footer>
    
  )
}

export default Footer