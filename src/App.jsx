import { Outlet } from 'react-router'
import './App.css'
import Navbar from './components/Navbar'

export default function App() {

  return (
    <>
      <Navbar />
      <Outlet />
    </>
  )
}