import React from 'react'

const Home = () => {
  const auth=sessionStorage.getItem('Auth');
  console.log(auth);

  return (
    <div>
      <h1>INSTAGRAM.COM</h1>
    </div>
  )
}

export default Home
