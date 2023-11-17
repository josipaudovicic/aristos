import React from "react";
import { BrowserRouter , Routes, Route } from "react-router-dom";
import Registration from "./registracija/Registration";
import Poruka from "./registracija/Poruka";
import Korisnik from "./administrator/Korisnik";
import PregledSvihKorisnika from "./administrator/PregledSvihKorisnika";
import Requests from "./administrator/Requests";
import TwoButtonRedirectComponent from "./administrator/TwoButtonRedirectComponent";
import Welcome from "./registracija/Welcome";
import EmailChecked from "./registracija/EmailChecked";

function App() {
  return(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Registration />} />
            <Route path="/poruka" element={<Poruka />} />
            <Route path="/welcome" element={<Welcome />} />
            <Route path="/emailChecked" element={<EmailChecked />} />
            <Route path="/user" element={<Korisnik />} />
            <Route path="/getUsers" element={<PregledSvihKorisnika />} />
            <Route path="/requests" element={<Requests />} />
            <Route path="/admin" element={<TwoButtonRedirectComponent />} />
        </Routes>
    </BrowserRouter>
);
}

export default App;