import { useState } from 'react'
import './App.css'
import NavbarComponent from './components/Navbar'
import List from './components/List'
import ContainerExample from './components/ContainerExample'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <NavbarComponent />
      <List/>
      {/* <ContainerExample/> */}
    </>
  )
}

export default App
