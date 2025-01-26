import { BrowserRouter, Route, Routes } from 'react-router'
import { HomePage } from './pages/HomePage'
import { LoginPage } from './pages/LoginPage'
import { ProtectedRoutes } from './utils/ProtectedRoutes'
import { createContext, useEffect, useState } from 'react';
import { RegisterPage } from './pages/RegisterPage';
import { RememberPasswordPage } from './pages/RememberPasswordPage';

export const UserContext = createContext(null);

function App() {

  const [user, setUser] = useState(() => {
    let user = localStorage.getItem('user');
    return user ? JSON.parse(user) : { email: '', password: '', loggedIn: false };
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
          </Route>
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  )
}

export default App
