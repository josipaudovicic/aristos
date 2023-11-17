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
            <Route path="process.env.REACT_APP_API_BASE_URL/" element={<Registration />} />
            <Route path="process.env.REACT_APP_API_BASE_URL/poruka" element={<Poruka />} />
            <Route path="process.env.REACT_APP_API_BASE_URL/welcome" element={<Welcome />} />
            <Route path="process.env.REACT_APP_API_BASE_URL/emailChecked" element={<EmailChecked />} />
            <Route path="process.env.REACT_APP_API_BASE_URL/user/:username" element={<Korisnik />} />
            <Route path="process.env.REACT_APP_API_BASE_URL/getUsers" element={<PregledSvihKorisnika />} />
            <Route path="process.env.REACT_APP_API_BASE_URL/requests" element={<Requests />} />
            <Route path="process.env.REACT_APP_API_BASE_URL/admin" element={<TwoButtonRedirectComponent />} />
        </Routes>
    </BrowserRouter>
);
}

export default App;
