import React from 'react'
import MainBanner from '../components/MainBanner'
import Category from '../components/Category'
import BestSeller from '../components/BestSeller'

const Home = () => {
  return (
    <div className='mt-10'>
      <MainBanner/>
      <Category/>
      <BestSeller/>
    </div>
  )
}

export default Home