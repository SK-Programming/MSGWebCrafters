import React from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Header from '../Components/Header'
import Services from '../Components/Services'
import Wellness from '../Components/Wellness'
import Products from '../Components/Products'
import Faq from '../Components/Faq'
import Adoption from '../Components/Adoption'

function Home() {


  return (
   
    <>
      <Header />
      <Services />
      <Wellness />
   <Products/>
   <Adoption/>
   <Faq/>
      </>
  )
}

export default Home