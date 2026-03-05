import React, { useContext } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Collection from './pages/Collection';
import Contact from './pages/Contact';
import Product from './pages/Product';
import Cart from './pages/Cart';
import Login from './pages/Login';
import PlaceOrder from './pages/PlaceOrder';
import Orders from './pages/Orders';
import Navbar from './components/Navbar';
import About from './pages/About';
import Footer from './components/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Verify from './pages/Verify';
import { ShopContext } from './context/ShopContext';

const App = () => {
  const { token } = useContext(ShopContext);
  const location = useLocation();

  const protect = (element) => (token ? element : <Navigate to='/login' replace />);

  return (
    <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
      <ToastContainer />
      {token && <Navbar />}

      <div key={location.pathname} className='page-transition'>
        <Routes>
          <Route path='/login' element={token ? <Navigate to='/' replace /> : <Login />} />
          <Route path='/' element={protect(<Home />)} />
          <Route path='/collection' element={protect(<Collection />)} />
          <Route path='/about' element={protect(<About />)} />
          <Route path='/contact' element={protect(<Contact />)} />
          <Route path='/product/:productId' element={protect(<Product />)} />
          <Route path='/cart' element={protect(<Cart />)} />
          <Route path='/place-order' element={protect(<PlaceOrder />)} />
          <Route path='/orders' element={protect(<Orders />)} />
          <Route path='/verify' element={protect(<Verify />)} />
          <Route path='*' element={<Navigate to={token ? '/' : '/login'} replace />} />
        </Routes>
      </div>

      {token && <Footer />}
    </div>
  );
};

export default App;
