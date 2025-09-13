import React from 'react'
import Box from '@mui/material/Box'
import Navbar from './Components/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import AdoptionPage from './Pages/AdoptionPage'
import AdoptPage from './Pages/AdoptPage'
import ProductsPage from './Pages/ProductsPage'
import ProductDetails from './Pages/ProductDetails'
import { CartProvider } from '../GlobalComponents/CartContext'
import PurchaseSuccess from './Pages/PurchaseSucess'
import CartPage from './Pages/CartPage'
import CareOptions from './Pages/CareOptions'
import Veterinarians from './Pages/Veterinarians'
import CareArticle from './Pages/CareArticle'
import VetProfiles from './Pages/VetProfile'
import About from './Pages/About'
import ContactUs from './Pages/ContactUs'

function UserMain() {
  return (
    <CartProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/adoption" element={<AdoptionPage />} />
        <Route path="/adopt/:id" element={<AdoptPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/article/:id" element={<CareArticle />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/purchase-success" element={<PurchaseSuccess />} />
        <Route path="/veterinarians" element={<Veterinarians />} />
        <Route path="/vet/:id" element={<VetProfiles />} />
        <Route path="/care-options" element={<CareOptions/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/contact" element={<ContactUs/>} />
      </Routes>
    </CartProvider>
  )
}

export default UserMain
