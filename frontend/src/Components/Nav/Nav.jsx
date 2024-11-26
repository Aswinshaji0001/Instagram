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
        <Link to='/'><h1 className='text'>Instagram</h1></Link>
        </div>
        <div className="right">
          <div className="imgs">
          <img src={profile} alt="" />
          </div>
          <Link to='/profile'><h2>{user}</h2></Link>
        </div>
      </nav>
    </div>
  )
}

export default Nav;
