import React from 'react-dom';
import Header from './components/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import HomeScreen from './components/HomeScreen';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProductScreen from './components/ProductScreen';
import Footer from './components/Footer';
import Container from 'react-bootstrap/Container';
import CartScreen from './components/CartScreen';
import SigninScreen from './components/SigninScreen';
import ShippingAddressScreen from './components/ShippingAddressScreen';
import About from './components/About';
import SignupScreen from './components/SignupScreen';
import PaymentMethodScreen from './components/PaymentMethodScreen';
import PlaceOrderScreen from './components/PlaceOrderScreen';
import OrderScreen from './components/OrderScreen';
import OrderHistoryScreen from './components/orderHistoryScreen';
import ProfileScreen from './components/ProfileScreen';

//import { ToastContainer } from 'react-bootstrap';
//import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <header className="header">
          <Header />
        </header>
        <Container className="mt-3 mb-3">
          <Routes>
            <Route path="/product/:slug" element={<ProductScreen />} />
            <Route path="/cart" element={<CartScreen />} />
            <Route path="/signin" element={<SigninScreen />} />
            <Route path="/signup" element={<SignupScreen />} />
            <Route path="/profile" element={<ProfileScreen />} />
            <Route path="/shipping" element={<ShippingAddressScreen />}></Route>
            <Route path="/payment" element={<PaymentMethodScreen />}></Route>
            <Route path="/placeorder" element={<PlaceOrderScreen />}></Route>
            <Route path="/order/:id" element={<OrderScreen />}></Route>
            <Route
              path="/orderhistory"
              element={<OrderHistoryScreen />}
            ></Route>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/about" element={<About />}></Route>
          </Routes>
        </Container>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
