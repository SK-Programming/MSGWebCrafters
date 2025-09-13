import { Routes, Route } from "react-router-dom";

import PetProfile from "./pages/petProfile";
import Shop from "./pages/shop";
import HealthRecords from "./pages/healthRecords";
import Profile from "./pages/profile";
import Messages from "./pages/messages";
import OwnerNav from "./layout/ownerNav";
import Dashboard from "./pages/dashboard";
import Appointments from "./pages/appointment";

function OwnerMain() {
  return (
    <OwnerNav>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/petprofile" element={<PetProfile />} />
        <Route path="/records" element={<HealthRecords />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/appointment" element={<Appointments />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/messages" element={<Messages />} />
      </Routes>
    </OwnerNav>
  );
}

export default OwnerMain;
