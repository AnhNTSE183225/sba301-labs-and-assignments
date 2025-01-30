import { BrowserRouter, Route, Routes } from 'react-router'
import { HomePage } from './pages/HomePage'
import { LoginPage } from './pages/LoginPage'
import { ProtectedRoutes } from './utils/ProtectedRoutes'
import { createContext, useEffect, useState } from 'react';
import { RegisterPage } from './pages/RegisterPage';
import { RememberPasswordPage } from './pages/RememberPasswordPage';
import { EmptyPage } from './pages/EmptyPage';
import { StockPage } from './pages/StockPage';
import { TransactionPage } from './pages/TransactionPage';

export const UserContext = createContext(null);

export function signOut(setUser) {
  localStorage.removeItem('user');
  setUser({ loggedIn: false });
}

function App() {

  const [user, setUser] = useState(() => {
    let user = localStorage.getItem('user');
    return user
      ? JSON.parse(user)
      : { loggedIn: false };
  });

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user));
  }, [user])

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/forgot-password' element={<RememberPasswordPage />} />
          <Route element={<ProtectedRoutes />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/profile" element={<EmptyPage />} />
            <Route path="/settings" element={<EmptyPage />} />
            <Route path="/feedback" element={<EmptyPage />} />
            <Route path="/stock-management" element={<StockPage />} />
            <Route path="/transaction-management" element={<TransactionPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  )
}

export default App
