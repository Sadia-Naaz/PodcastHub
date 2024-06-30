import React from 'react'
import "./style.css"
import { Link, useLocation } from 'react-router-dom'
const Header = () => {
  const location = useLocation();
  const currentpath = location.pathname;
  return (
    <div className='nav-bar'>
      <div className='links'>
        <div className='gradient'></div>
        <Link to="./" className={currentpath=="/"?"active":""}>Sign Up</Link>
        <Link to="./podcasts" className={currentpath=="/podcasts"?"active":""}>Podcasts</Link>
        <Link to ="./profile" className={currentpath=="/profile"?"active":""}>Profile</Link>
        <Link to="./create-podcast" className={currentpath=="/create-podcast"?"active":""}>Create New Podcast</Link>
      </div>
    </div>
  )
}

export default Header
