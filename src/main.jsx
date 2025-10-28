import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import Cadastro from './pages/cadastro/index.jsx';
import Login from './pages/Login/index.jsx';
import ErrorPage from './pages/Error/index.jsx';
import ProgramacaoWeb from './pages/cursos/pw/index.jsx';
import LinguagensProgramacao from './pages/cursos/lp/index.jsx';
import BancoDeDados from './pages/cursos/bd/index.jsx';
import Informatica from './pages/cursos/info/index.jsx';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <Toaster/>
    <Routes>
       <Route path="/" element={<App />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<ErrorPage />} />
        <Route path="/programacao-web" element={<ProgramacaoWeb />} />
        <Route path="/linguagens-de-programacao" element={<LinguagensProgramacao />} />
        <Route path="/banco-de-dados" element={<BancoDeDados />} />
        <Route path="/informatica" element={<Informatica />} />
    </Routes>
    </BrowserRouter>
  </StrictMode>,
)
