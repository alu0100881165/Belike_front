import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import IntranetPage from './pages/intranet/intranet';
import LoginPage from './pages/login/login';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/intranet/:id" element={<IntranetPage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
