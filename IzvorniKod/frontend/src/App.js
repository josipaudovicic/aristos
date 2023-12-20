import React from "react";
import { BrowserRouter , Routes, Route } from "react-router-dom";
import Login from "./prijava/Login";
import Registration from "./registracija/Registration";
import Poruka from "./registracija/Poruka";
import Korisnik from "./administrator/Korisnik";
import PregledSvihKorisnika from "./administrator/PregledSvihKorisnika";
import Requests from "./administrator/Requests";
import TwoButtonRedirectComponent from "./administrator/TwoButtonRedirectComponent";
import Welcome from "./registracija/Welcome";
import EmailChecked from "./registracija/EmailChecked";
import StationManager from "./voditelj/StationManager";

function App() {
  return(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="/poruka" element={<Poruka />} />
            <Route path="/welcome" element={<Welcome />} />
            <Route path="/emailChecked" element={<EmailChecked />} /> 
            <Route path="/user/:username" element={<Korisnik />} />
            <Route path="/getUsers" element={<PregledSvihKorisnika />} />
            <Route path="/requests" element={<Requests />} />
            <Route path="/admin" element={<TwoButtonRedirectComponent />} />
            <Route path="/manager" element={<StationManager />} />
        </Routes>
    </BrowserRouter>
);
}

export default App;