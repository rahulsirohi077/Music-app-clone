import React from 'react'
import AppLayout from '../components/layout/AppLayout'

const Home = () => {
  return (
    <div>Home</div>
  )
}

const WrappedHome = AppLayout(Home);
export default WrappedHome;