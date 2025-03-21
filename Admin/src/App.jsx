import React from 'react'
import Navbar from "./Components/Navbar/Navbar"
import Sidebar from "./Components/Sidebar/Sidebar"
import { Routes, Route } from 'react-router-dom'
import Add from './Pages/AddProduct/Add'
import List from './Pages/ListProduct/List'
import Orders from './Pages/Orders/Orders'
import { ToastContainer } from 'react-toastify';

const App = () => {
  const url = "http://localhost:4000"
  return (
    <div>
      <ToastContainer />
      <Navbar />
      <hr />
      <div className="app-content">
        <Sidebar />
        <Routes>
          <Route path='/add' element={<Add url={url}/>} />
          <Route path='/list' element={<List url={url}/>} />
          <Route path='/orders' element={<Orders url={url}/>} />
        </Routes>
      </div>
    </div>
  )
}

export default App