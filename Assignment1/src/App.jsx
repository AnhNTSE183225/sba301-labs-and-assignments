import { BrowserRouter, Route, Routes } from 'react-router'
import { HomePage } from './pages/HomePage'
import { LoginPage } from './pages/LoginPage'
import { ProtectedRoutes } from './utils/ProtectedRoutes'
import { createContext, useState } from 'react';

export const UserContext = createContext(null);

function App() {

  const [user, setUser] = useState(
    {
      email: null,
      password: null,
      accessToken: null,
      loggedIn: false
    }
  );

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<LoginPage />} />
          <Route element={<ProtectedRoutes />}>
            <Route path="/" element={<HomePage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  )
}

export default App
