import React from 'react'
import './css/Nav.scss'
import img from './img/felix.avif'
import {Link} from 'react-router-dom'

const Nav = ({user,profile}) => {
  console.log(user);
  console.log(profile);
  return (
    <div>
      <nav>
        <div className="left">
          <h1 className='text'>Instagram</h1>
        </div>
        <div className="right">
          <img src={profile} alt="" />
          <Link to='/editprofile'><h2>{user}</h2></Link>
        </div>
      </nav>
    </div>
  )
}

export default Nav;
