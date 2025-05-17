import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Nav from '../components/nav';
import Inicio from '../components/inicio';
import Registro from '../components/registro';
import Login from '../components/login';
import Footer from '../components/Footer'
import Error from "../components/Error";
import Pilotos from '../components/Pilotos';
import Pistas from '../components/Pistas';
import Maximos from '../components/Maximos_ganadores';
import FormEditarPiloto from '../components/form.editar.piloto';
import FormEditarPista from '../components/form.editar.pistas';
import CrearPiloto from "../components/crearPiloto";
import CrearPista from "../components/crearPista";
import CrearMaximo from '../components/crearMaximos';
import FormEditarMaximos from '../components/form.editar.maximos';
import DetalleGanador from '../components/DetalleGanador';
import DetallePista from '../components/DetallePista';
import DetallePiloto from '../components/DetallePiloto';
import RutasPublicas from '../routes/RutasPublicas.jsx';
import RutasPrivadas from '../routes/RutasPrivadas.jsx';
import Rol from '../components/rol.jsx';
import EditarUsuario from '../components/form.editar.usuarios.jsx';

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<RutasPrivadas><Inicio /></RutasPrivadas>} />
        <Route path="/registro" element={<RutasPublicas><Registro /></RutasPublicas>} />
        <Route path="/login" element={<RutasPublicas><Login /></RutasPublicas>} />
        <Route path="/pistas" element={<RutasPrivadas><Pistas /></RutasPrivadas>} />
        <Route path="/pilotos" element={<RutasPrivadas><Pilotos /></RutasPrivadas>} />
        <Route path="/maximos_ganadores" element={<RutasPrivadas><Maximos /></RutasPrivadas>} />
        <Route path="*" element={<Error />} />
        <Route path="/pilotos/editar/:nombre" element={<RutasPrivadas><FormEditarPiloto /></RutasPrivadas>} />
        <Route path="/pistas/editar/:nombre" element={<RutasPrivadas><FormEditarPista /></RutasPrivadas>} />
        <Route path="/maximosGanadores/editar/:nombre" element={<RutasPrivadas><FormEditarMaximos /></RutasPrivadas>} />
        <Route path="/pilotos/crear" element={<RutasPrivadas><CrearPiloto /></RutasPrivadas>} />
        <Route path="/pistas/crear" element={<RutasPrivadas><CrearPista /></RutasPrivadas>} />
        <Route path="/maximosGanadores/crear" element={<RutasPrivadas><CrearMaximo /></RutasPrivadas>} />
        <Route path="/maximosGanadores/detalle/:nombre" element={<RutasPrivadas><DetalleGanador /></RutasPrivadas>} />
        <Route path="/pista/:nombre" element={<RutasPrivadas><DetallePista /></RutasPrivadas>} />
        <Route path="/piloto/:nombre" element={<RutasPrivadas><DetallePiloto /></RutasPrivadas>} />
        <Route path="/usuarios" element={<RutasPrivadas><Rol/></RutasPrivadas>} />
        <Route path="/usuarios/editar/:nombre" element={<RutasPrivadas><EditarUsuario/></RutasPrivadas>} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;