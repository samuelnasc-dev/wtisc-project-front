import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './index.css';
import Home from './pages/Home.jsx';
import UserList from './pages/UserList.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<UserList />} />
        {/* Adicione outras rotas conforme necessário */}
      </Routes>
    </Router>
  </StrictMode>,
);
