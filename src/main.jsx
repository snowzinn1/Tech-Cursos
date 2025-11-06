import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import Cadastro from './pages/cadastro/index.jsx';
import Login from './pages/Login/index.jsx';
import ErrorPage from './pages/Error/index.jsx';
import ProgramacaoWeb from './pages/cursos/pw/index.jsx';
import LinguagensProgramacao from './pages/cursos/lp/index.jsx';
import BancoDeDados from './pages/cursos/bd/index.jsx';
import Informatica from './pages/cursos/info/index.jsx';
import Pagamento from './pages/Assinaturas/index.jsx';
import Sobre from './pages/sobre/index.jsx';
import CadastrarCurso from './components/CadastrarCurso/index.jsx';

// 🆕 importa o painel e a proteção
import DashboardAdmin from './pages/Admin/index.jsx';
import RotaProtegidaAdmin from './components/RotaProtegidaAdmin/index.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Toaster />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<ErrorPage />} />
        <Route path="/programacao-web" element={<ProgramacaoWeb />} />
        <Route path="/linguagens-de-programacao" element={<LinguagensProgramacao />} />
        <Route path="/banco-de-dados" element={<BancoDeDados />} />
        <Route path="/informatica" element={<Informatica />} />
        <Route path="/assinaturas" element={<Pagamento />} />
        <Route path="/sobre" element={<Sobre />} />
        <Route path="/cadastrar-curso" element={<CadastrarCurso />} />

        {/* 🆕 Rota protegida do admin */}
        <Route
          path="/admin/dashboard"
          element={
            <RotaProtegidaAdmin>
              <DashboardAdmin />
            </RotaProtegidaAdmin>
          }
        />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
