// src/App.tsx
import { Route, Routes } from 'react-router-dom';
import './App.css';
import LoginForm from './pages/LoginForm';
import RegisterForm from './pages/RegisterForm';
import RootLayout from './layout/RootLayout';
import DataPackages from './pages/DataPackages';
import TransactionHistory from './pages/TransactionHistory';
import Dashboard from './pages/Dashboard';
import Settings from './pages/Settings';

function App() {
  return (
    <Routes>
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="data-packages" element={<DataPackages />} />
        <Route path="transaction-history" element={<TransactionHistory />} />
        <Route path="settings" element={<Settings />} />
        <Route path="login" element={<LoginForm />} />
        <Route path="register" element={<RegisterForm />} />
      </Route>
    </Routes>
  );
}

export default App;