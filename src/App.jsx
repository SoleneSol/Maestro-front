import Header from "./components/Header/Header.jsx";
import Footer from "./components/Footer/Footer.jsx";
import Admin from "./pages/admin/Admin.jsx";
import Composition from "./pages/composition/Compositions.jsx";
import Contact from "./pages/contact/Contact.jsx";
import Homepage from "./pages/homepage/Home.jsx";
import Login from "./pages/login/Login.jsx";
import SettingPage from "./pages/setting/SettingPage.jsx";
import User from "./pages/user/User.jsx";
import Legales from "./pages/legales/Legales.jsx";
import CGU from "./pages/cgu/CGU.jsx";
import Accessibility from "./pages/accessibility/Accessibility.jsx";
import NotFound from "./pages/notfound/NotFound.jsx"; 
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";

import { useState } from "react";
import UserContext from "./UserContext.jsx";
import { UserProvider } from "./UserProvider.jsx";

function App() {
    // il faudrait créer le contexte userIs (visiteur/client/admin)

    const [userIs, setUserIs] = useState("visitor");


  return (
    <UserProvider>
    <div className='App'>
      <BrowserRouter>
        
        <Header />
        <main>
            <Routes>
              <Route path="/admin" element={<Admin />}></Route>
              <Route path="/compositions" element={<Composition />}></Route>
              <Route path="/contact" element={<Contact />}></Route>
              <Route path="/" element={<Homepage />}></Route>
              <Route path="/login" element={<Login />}></Route>
              <Route path="/user/settings" element={<SettingPage />}></Route>
              <Route path="/user" element={<User />}></Route> 
              <Route path="/legales" element={<Legales />}></Route> 
              <Route path="/cgu" element={<CGU />}></Route> 
              <Route path="/accessibility" element={<Accessibility />}></Route> 
              <Route path="*" element={<NotFound/>}></Route> 
            </Routes>
        </main>
        <Footer />
        
      </BrowserRouter>
    </div>
    </UserProvider>
  );
}

export default App;
