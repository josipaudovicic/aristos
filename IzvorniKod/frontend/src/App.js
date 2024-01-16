import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Registration from "./registracija/Registration";
import Poruka from "./registracija/Poruka";
import Welcome from "./registracija/Welcome";
import EmailChecked from "./registracija/EmailChecked";
import Confirmation from "./registracija/Confirmation";
import Login from "./prijava/Login";
import Profile from "./prijava/Profile";
import EditProfile from "./prijava/EditProfile";


import Korisnik from "./administrator/Korisnik";
import PregledSvihKorisnika from "./administrator/PregledSvihKorisnika";
import Requests from "./administrator/Requests";
import EditKorisnik from "./administrator/EditKorisnik";
import TwoButtonRedirectComponent from "./administrator/TwoButtonRedirectComponent";


import StationManager from "./voditelj/StationManager";
import OdabirAkcija from "./voditelj/OdabirAkcija";
import PregledSvihTragaca from "./voditelj/PregledSvihTragaca";
import PregledSvojihTragaca from "./voditelj/PregledSvojihTragaca";
import EditNacinaTransporta from "./voditelj/EditNacinaTransporta";
import NeaktivneAkcije from "./voditelj/NeaktivneAkcije";
import PregledZahtjeva from "./voditelj/PregledZahtjeva";
import PregledAktivnihAkcija from "./voditelj/AktivneAkcije";


//TODO: importati sve ostale stranice iz voditelja

import Explorer from "./istrazivac/Explorer";
import ListActions from "./istrazivac/ListActions";
import Species from "./istrazivac/Species";
import Individual from "./istrazivac/Individual";
import InfoAnimals from "./istrazivac/InfoAnimals";
import Map from "./istrazivac/Map";
import Info from "./istrazivac/Info";
import NewAction from "./istrazivac/NewAction";
import IzradaZahtjeva from "./istrazivac/IzradaZahtjeva";
import NoviZadatak from "./istrazivac/NoviZadatak";
import PopisZadataka from "./istrazivac/PopisZadataka";
import AnimalMap from "./istrazivac/AnimalMap"

import Tracker from "./tragac/Tracker";
import SpeciesT from "./tragac/SpeciesT";
import IndividualT from "./tragac/IndividualT";
import InfoAnimalsT from "./tragac/InfoAnimalsT";
import MapT from "./tragac/MapT";

function App() {
  return (
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
        <Route path="/manager/actions" element={<OdabirAkcija />} />
        <Route path="/manager/actions/inactiveActions" element={<NeaktivneAkcije />} />
        <Route path="/manager/actions/activeActions" element={<PregledAktivnihAkcija />} />
        <Route path="/manager/trackers" element={<PregledSvihTragaca />} />
        <Route path="/manager/mytrackers/:id" element={<EditNacinaTransporta />} />
        <Route path="/manager/mytrackers" element={<PregledSvojihTragaca />} />
        <Route path="/manager/requests" element={<PregledZahtjeva />} />
        <Route path="/register/confirm/" element={<Confirmation />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/explorer" element={<Explorer />} />
        <Route path="/explorer/actions" element={<ListActions />} />
        <Route path="/explorer/animals" element={<Species />} />
        <Route path="/explorer/animals/species" element={<Individual />} />
        <Route path="/explorer/animals/species/:id" element={<InfoAnimals />} />
        <Route path="/user/:username/edit" element={<EditKorisnik />} />
        <Route path="/explorer/action/:actionName" element={<Map />} />
        <Route path="/explorer/action/:actionName/info" element={<Info />} />
        <Route path="/explorer/action/newAction" element={<NewAction />} />
        <Route path="/tracker" element={<Tracker />} />
        <Route path="/tracker/animals" element={<SpeciesT />} />
        <Route path="/tracker/animals/species" element={<IndividualT />} />
        <Route path="/tracker/animals/species/:id" element={<InfoAnimalsT />} />
        <Route path="/tracker/animals/action" element={<MapT />} />
        <Route path="/explorer/action/info/tasks" element={<PopisZadataka />} />
        <Route path="/explorer/action/info/requests" element={<IzradaZahtjeva />} />
        <Route path="/explorer/action/info/tasks/newTask" element={<NoviZadatak />} />
        <Route path="/explorer/map" element={<AnimalMap />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
