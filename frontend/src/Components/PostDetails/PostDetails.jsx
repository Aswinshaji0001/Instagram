import React from 'react'
import './css/PostDetails.scss'
import img from './img/img.jpg';

const PostDetails = () => {
  return (
    <div>
      <div className="pcontainer">
        <div className="pc">
                <div className="leftp">
                    <div className="images">
                    <img src={img} alt="" />
                    </div>
                </div>
                <div className="rightp">
                        <h1>Username</h1>
                        <h1>Description</h1>
                        <h1>Posted Date</h1>
                </div>
        </div>
      </div>
    </div>
  )
}

export default PostDetails
