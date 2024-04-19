import React from 'react-dom';
//import Header from './components/Header';
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
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Badge from 'react-bootstrap/Badge';
//import Container from 'react-bootstrap/Container';
import { LinkContainer } from 'react-router-bootstrap';
import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Store } from './Store';
import { Button, NavDropdown } from 'react-bootstrap';
import axios from 'axios';
import { getError } from './utils';
import SearchBox from './components/SearchBox';
import SearchScreen from './components/SearchScreen';
import ProtectedRoute from './components/ProtectedRoute';
import DashboardScreen from './components/DashboardScreen';
import AdminRoute from './components/AdminRoute';
import ProductListScreen from './components/ProductListScreen';
import ProductEditScreen from './components/ProductEditScreen';
import OrderListScreen from './components/OrderListScreen';
import UserListScreen from './components/UserListScreen';
import UserEditScreen from './components/UserEditScreen';
import MapScreen from './components/MapScreen';
import Contact from './components/Contact';
import Condition from './components/Condition';

  

//import Header1 from './components/Header1';


//import { ToastContainer } from 'react-bootstrap';
//import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [isMobile, setIsMobile] = useState(false);
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { fullBox, cart, userInfo } = state;
  const signoutHandler = () =>{
    ctxDispatch({type: 'USER_SIGNOUT'});
    localStorage.removeItem('userInfo');
    localStorage.removeItem('shippingAddress');
    localStorage.removeItem('paymentMethod');
    window.location.href = '/signin';
  };

  const [sidebarIsOpen, setsidebarIsOpen] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const {data} = await axios.get(`/api/products/categories`);
        setCategories(data)
      }catch(err) {
        window.alert(getError(err));
      }
    };
    fetchCategories();

  }, []);

  return (
    <BrowserRouter>
      <div className="app">
      
      <div className={
      sidebarIsOpen 
      ? fullBox
              ? 'site-container active-cont d-flex flex-column full-box'
              : 'site-container active-cont d-flex flex-column'
            : fullBox
            ? 'site-container d-flex flex-column full-box'
            : 'site-container d-flex flex-column'
    }
    >
      

    <header className='header'>
      <Navbar  className='nav navbar-default' fixed="top">
        <Container style={{marginLeft: "4px"}}>
        
          
         <img src='./images/oval.jpg' alt='logo' style={{width:"40px", paddingRight: "4px", paddingLeft: "8px"}}/>
          <Navbar.Brand>Paku Limited</Navbar.Brand>
          <Link to="/cart" className="nav-link" 
          style={{marginLeft: "-13px", paddingRight: "7px"}}
          >
            Cart
            {cart.cartItems.length > 0 && (
              <Badge pill bg="danger">
                {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
              </Badge>
            )}
          </Link>
          {userInfo ? (
            <NavDropdown
              title={userInfo.name}
              id="basic-nav-dropdown"
              className="dropdown"
              style={{marginLeft: "-8px", color: 'blue'}}
            >
              <LinkContainer to="/profile">
                <NavDropdown.Item>User Profile</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to="/orderhistory">
                <NavDropdown.Item>Order History</NavDropdown.Item>
              </LinkContainer>
              <NavDropdown.Divider />
              <Link
                className="dropdown-item"
                to="/signout"
                onClick={signoutHandler}
              >
                Sign Out
              </Link>
            </NavDropdown>
          ) : (
            <Link className="nav-link" to="/signin" >
              Sign In
            </Link>
          )}

    
        
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav className='me-auto w-100 justify-content-end'>

        <ul className={isMobile ? "nav-links-mobile": "nav-links"}
        onClick={() => setIsMobile(false)}>
        
          <li>
            <Link to="/" >Home</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
          <li>
            <Link to="/about" >About</Link>
          </li>
          <li>
            <Link to="/condition">Terms & Conditions</Link>
          </li>
          
        </ul>
        <button variant='none' className='mobile-menu-icon' onClick={() => setIsMobile(!isMobile)}>
          {isMobile ? <i className='fas fa-times'></i> : <i className='fas fa-bars'></i>}
        </button>
        </Nav>
        </Navbar.Collapse>
        </Container>
      </Navbar>
      <div className={sidebarIsOpen ? 'active-nav side-navbar d-flex justify-content-between flex-wrap flex-column'
       :'side-navbar d-flex justify-content-between flex-wrap flex-column'} style={{marginTop: "100px"}}>
      <Nav className='navItem'>
        <Nav.Item><strong>Categories</strong></Nav.Item>
        {categories.map((category) => (
          <Nav.Item key={category} >
            <LinkContainer
                  to={{
                    pathname: "/search",
                    search: `?category=${category}`,
                  }}
                  onClick={() => setsidebarIsOpen(false)}
                >
                  <Nav.Link>{category}</Nav.Link>
              </LinkContainer>
          </Nav.Item>
        ))}
        
      </Nav>
    </div>
      </header>
      </div>
      <div className='nav2'>
      <Button variant='none'
      className='sidebar-icon' 
          onClick={() => setsidebarIsOpen(!sidebarIsOpen)}
          style={{color:"white", marginRight: "10px"}}
          >
            {sidebarIsOpen ? <i className='fas fa-times'></i> : <i className='fas fa-bars'></i>}
            </Button>
            <SearchBox/>
            {userInfo && userInfo.isAdmin && (
            <NavDropdown title="Admin" id="admin-nav-dropdown" className='admin-dropdown'>
              <LinkContainer to={"/admin/dashboard"}>
                <NavDropdown.Item>Dashboard</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to={"/admin/products"}>
                <NavDropdown.Item>Products</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to={"/admin/orders"}>
                <NavDropdown.Item>Orders</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to={"/admin/users"}>
                <NavDropdown.Item>Users</NavDropdown.Item>
              </LinkContainer>
            </NavDropdown>
          )}

            
      </div>
        <Container className="mt-3 mb-3">
          <Routes>
            <Route path="/product/:slug" element={<ProductScreen />} />
            <Route path="/cart" element={<CartScreen />} />
            <Route path="/search" element={<SearchScreen />} />
            <Route path="/signin" element={<SigninScreen />} />
            <Route path="/signup" element={<SignupScreen />} />
            <Route path="/profile" element={
            <ProtectedRoute>
              <ProfileScreen />
              </ProtectedRoute>} />
              <Route path="/map" element={
            <ProtectedRoute>
              <MapScreen />
              </ProtectedRoute>} />
            <Route path="/shipping" element={<ShippingAddressScreen />}></Route>
            <Route path="/payment" element={<PaymentMethodScreen />}></Route>
            <Route path="/placeorder" element={<PlaceOrderScreen />}></Route>
            <Route path="/order/:id" element={
            <ProtectedRoute>
              <OrderScreen />
            </ProtectedRoute>}></Route>
            <Route
              path="/orderhistory"
              element={
                <ProtectedRoute>
                  <OrderHistoryScreen />
                  </ProtectedRoute>}
            ></Route>
            <Route path="/" element={<HomeScreen />} />
            {/* Admin Routes */}
            <Route path='/admin/dashboard' element={<AdminRoute><DashboardScreen/></AdminRoute>}></Route>
            <Route path='/admin/orders' element={<AdminRoute><OrderListScreen/></AdminRoute>}></Route>
            <Route path='/admin/products' element={<AdminRoute><ProductListScreen/></AdminRoute>}></Route>
            {<Route path='/admin/users' element={<AdminRoute><UserListScreen/></AdminRoute>}></Route> }
            <Route path='/admin/product/:id' element={<AdminRoute><ProductEditScreen/></AdminRoute>}></Route>
            {<Route path='/admin/user/:id' element={<AdminRoute><UserEditScreen/></AdminRoute>}></Route> }
            <Route path="/about" element={<About />}></Route>
            <Route path="/contact" element={<Contact />}></Route>
            <Route path="/condition" element={<Condition />}></Route>
          </Routes>
        </Container>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
