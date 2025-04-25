import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';

import Navbar from './Components/Navbar/Navbar';
import Sidebar from './Components/Sidebar/Sidebar';
import Add from './Pages/AddProduct/Add';
import List from './Pages/ListProduct/List';
import Orders from './Pages/Orders/Orders';
import Welcome from './Pages/Welcome/Welcome';
import { ToastContainer } from 'react-toastify';

const App = () => {
  const { isSignedIn, user } = useUser();
  const url = "http://localhost:4000";

  const adminEmail = import.meta.env.VITE_ADMIN_EMAIL;
  const isAdmin = isSignedIn && user?.primaryEmailAddress?.emailAddress === adminEmail;
  console.log(isAdmin);

  return (
    <div>
      <ToastContainer />
      {isAdmin ? (
        <>
          <Navbar />
          <hr />
          <div className="app-content">
            <Sidebar />
            <Routes>
              <Route path="/add" element={<Add url={url} />} />
              <Route path="/list" element={<List url={url} />} />
              <Route path="/orders" element={<Orders url={url} />} />
              <Route path="*" element={<Navigate to="/add" />} />
            </Routes>
          </div>
        </>
      ) : (
        <Welcome isSignedIn={isSignedIn} user={user} adminEmail={adminEmail} />
      )}
    </div>
  );
};

export default App;
