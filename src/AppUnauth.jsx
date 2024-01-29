import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

// Components
import Navbar from './components/navbarComponents/Navbar';
import LandingPage from './components/landingPageComponents/LandingPage';
import LoginPage from './components/accountMgmtComponents/LoginPage'; 
import RegisterPage from './components/accountMgmtComponents/RegistrationPage'; 
import ProvinciasPage from './components/adminComponents/Provincia/ProvinciasPage';
import CiudadesPage from './components/adminComponents/Ciudad/CiudadesPage';
import EspeciesPage from './components/adminComponents/Especie/EspeciesPage';
import RazasPage from './components/adminComponents/Raza/RazasPage';
import UsersPage from './components/adminComponents/User/UsersPage';
import CreatePost from './components/postsComponents/createPost';

import { useSelector } from 'react-redux';
import ResultsPage from './components/postsComponents/ResultsPage';
import PostsPage from './components/postsComponents/PostsPage';
import Reporte from './components/postsComponents/Reporte';
import FinancialGoalPage from './components/adminComponents/FinancialGoal/FinancialGoalPage';
import HolisticPage from './components/adminComponents/Holistic/HolisticPage';
import HealthPage from './components/adminComponents/Health/HealthPage';

const ProtectedRoute = ({ children }) => {
  const isLogged = useSelector(state => state.user.isLogged);

  if (!isLogged) {
    // Usuario no está autenticado, redirigir a la página de inicio de sesión
    return <Navigate to="/Ghabits/login" />;
  }

  // Usuario autenticado, renderizar el componente solicitado
  return children;
};


function AppUnauth() {

  return (
    <Router>
      <header className='root__header'>
        <Navbar/>
      </header>
      <main className='root__main'>
        <Routes>
          <Route path="/Ghabits/" element={<LandingPage />} />
          <Route path="/Ghabits/register" element={<RegisterPage />} />
          <Route path="/Ghabits/login" element={<LoginPage />} />
          <Route path="/Ghabits/provincias" element={<ProtectedRoute><ProvinciasPage /></ProtectedRoute>} />
          <Route path="/Ghabits/ciudades" element={<ProtectedRoute><CiudadesPage /></ProtectedRoute>} />
          <Route path="/Ghabits/especies" element={<ProtectedRoute><EspeciesPage /></ProtectedRoute>} />
          <Route path="/Ghabits/razas" element={<ProtectedRoute><RazasPage /></ProtectedRoute>} />
          <Route path="/Ghabits/users" element={<ProtectedRoute><UsersPage /></ProtectedRoute>} />
          <Route path="/Ghabits/create_post" element={<ProtectedRoute><CreatePost /></ProtectedRoute>} />
          <Route path="/Ghabits/post_results" element={<ProtectedRoute><ResultsPage /></ProtectedRoute>} />
          <Route path="/Ghabits/view_posts_page" element={<ProtectedRoute><PostsPage /></ProtectedRoute>} />
          <Route path="/Ghabits/finance" element={<ProtectedRoute><FinancialGoalPage /></ProtectedRoute>} />
          <Route path="/Ghabits/holistic" element={<ProtectedRoute><HolisticPage /></ProtectedRoute>} />
          <Route path="/Ghabits/health" element={<ProtectedRoute><HealthPage /></ProtectedRoute>} />
          <Route path="*" element={<Navigate to="/Ghabits/" />} />
        </Routes>
      </main>
    </Router>
  );
}

export default AppUnauth;
