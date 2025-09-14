import { Routes, Route } from "react-router-dom";
import VetDashboard from "./pages/vetDashboard";
import VetAppointments from "./pages/vetAppointments";
import VetMessages from "./pages/vetMessages";
import VetPateints from "./pages/vetPateints";
import VetProfiles from "./pages/vetProfiles";
import VetReviews from "./pages/vetReviews";
import VetNav from "./layout/vetNav"

function VetMain() {
  return (

   

      <VetNav>
        <Routes>
   
            <Route path="/dashboard" element={<VetDashboard />} />
            <Route path="/" element={<VetDashboard />} />
            <Route path="/appointments" element={<VetAppointments />} />
            <Route path="/messages" element={<VetMessages />} />
            <Route path="/patients" element={<VetPateints />} />
            <Route path="/profiles" element={<VetProfiles />} />
            <Route path="/reviews" element={<VetReviews />} />
       
        </Routes>
        </VetNav>
      
      );
}

      export default VetMain;
