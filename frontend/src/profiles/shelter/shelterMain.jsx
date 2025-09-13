import { Routes, Route } from "react-router-dom";

import AdoptionListing from "./pages/adoptionListing";
import AdoptionRequest from "./pages/adoptionRequest";
import CareLogs from "./pages/careLogs";
import Profile from "./pages/profile";
import Messages from "./pages/messages";
import ShelterNav from "./layout/shelterNav";
import Dashboard from "./pages/dashboard";

function ShelterMain() {
  return (
    <ShelterNav>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/listing" element={<AdoptionListing />} />
        <Route path="/request" element={<AdoptionRequest />} />
        <Route path="/logs" element={<CareLogs />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/messages" element={<Messages />} />
      </Routes>
    </ShelterNav>
  );
}

export default ShelterMain;
