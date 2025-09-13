import React from 'react'
import NavbarLayout from "./layouts/NavbarLayout"
import { Route, Routes } from 'react-router-dom'

import PetOwner from './pages/PetOwner'
import Dashboard from './pages/Dashboard'
import Veterinarians from './pages/Veterinarians'
import AnimalShelter from './pages/AnimalShelter'
import Products from './pages/Products'
import Messages from './pages/Messages'
import Profile from './pages/Profile'
import Box from '@mui/material/Box'
import AdminLogin from './adminLogin'


const AdminMain = () => {
  return (
    <Box width={"100%"} overflow={'hidden'}>
      <Routes>
    
    

        
        <Route
          path="/*"
          element={
            
              <NavbarLayout>
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="dashboard" element={<Dashboard />} />
                  <Route path="pet-owner" element={<PetOwner />} />
                  <Route path="vets" element={<Veterinarians />} />
                  <Route path="shelter" element={<AnimalShelter />} />
                  <Route path="products" element={<Products />} />
                  <Route path="messages" element={<Messages />} />
                  <Route path="profile" element={<Profile />} />
                </Routes>
              </NavbarLayout>
          
          }
        />
      </Routes>
    </Box>
  )
}

export default AdminMain