import React from 'react-dom';
import Navbar from 'react-bootstrap/Navbar';
//import Nav from 'react-bootstrap/Nav';
import Badge from 'react-bootstrap/Badge';
import Container from 'react-bootstrap/Container';
import { LinkContainer } from 'react-router-bootstrap';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Store } from '../Store';
import { NavDropdown } from 'react-bootstrap';

const Header = () => {
  function showSidebar() {
    const sidebar = document.querySelector('.sidebar');
    sidebar.style.display = 'flex';
  }

  function hideSidebar() {
    const sidebar = document.querySelector('.sidebar');
    sidebar.style.display = 'none';
  }
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;
  const signoutHandler = () =>{
    ctxDispatch({type: 'USER_SIGNOUT'});
    localStorage.removeItem('userInfo');
    localStorage.removeItem('shippingAddress');
    localStorage.removeItem('paymentMethod');
    window.location.href = '/signin';


  };
  return (
    <div className="header">
      <Navbar className="nav">
        <div className="nav-right">
          Paku Limited
          <Link to="/cart" className="nav-link" style={{ marginLeft: '-3px' }}>
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
              style={{ marginLeft: '-14px' }}
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
            <Link className="nav-link" to="/signin">
              Sign In
            </Link>
          )}
        </div>

        <ul
          className="sidebar"
          style={{
            justifyContent: 'flex-start',
            width: '180px',
            display: 'none',
          }}
        >
          <li onClick={hideSidebar} style={{ marginLeft: 'auto' }}>
            <a href="#">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24"
                viewBox="0 -960 960 960"
                width="24"
              >
                <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
              </svg>
            </a>
          </li>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="####">Products</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
        </ul>

        <ul>
          <li className="hideOnMobile">
            <Link to="/">Home</Link>
          </li>
          <li className="hideOnMobile">
            <Link to="####">Products</Link>
          </li>
          <li className="hideOnMobile">
            <Link to="/About">About</Link>
          </li>

          <li
            onClick={showSidebar}
            className="menu-button"
            style={{ marginLeft: 'auto' }}
          >
          
            <a href="#">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24"
                viewBox="0 -960 960 960"
                width="24"
              >
                <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" />
              </svg>
            </a>{' '}
          </li>
        </ul>
      </Navbar>
    </div>
  );
};

export default Header;

/*<ul className="sidebar">
  <li>
    <a href="HomeScreen.js">Home</a>
  </li>
  <li>
    <a href="####">Products</a>
  </li>
  <li>
    <a href="##">About</a>
  </li>
</ul>*/

/*<li>
  <a href="#">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="24"
      viewBox="0 -960 960 960"
      width="24"
    >
      <path 
d="M120-240v-80h720v80H120Zm0-200v-80
h720v80H120Zm0-200v-80h720v80H120Z" /
>
    </svg>
  </a>{' '}
</li>


<li onClick={showSidebar}>
  <a href="#">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="24"
      viewBox="0 -960 960 960"
      width="24"
    >
      <path
        d="M120-240v-80h720v80H120Zm0-200v-
80h720v80H120Zm0-200v-80h720v80H120
Z"
      />
    </svg>
  </a>{' '}
</li>*/

/* 
<div className="header">
  <Navbar className="navbar" expand="lg">
    <Container>
      <LinkContainer to="/">
        <Navbar.Brand>Paku Limited</Navbar.
Brand>
      </LinkContainer>
      <Link to="/cart" className="nav-link">
        Cart
        {cart.cartItems.length > 0 && (
          <Badge pill bg="danger">
            {cart.cartItems.reduce((a, c) => 
+ c.quantity, 0)}
          </Badge>
        )}
      </Link>
      <Navbar.Toggle 
aria-controls="basic-navbar-nav">
        <Navbar.Collapse id="basic-navbar-nav
          <Nav className="ms-auto">
            <ul>
              <li>
                <a href="HomeScreen.js">Home<
a>
              </li>
              <li>
                <a href="####">Products</a>
              </li>
              <li>
                <a href="##">About</a>
              </li>
            </ul>
          </Nav>
        </Navbar.Collapse>
      </Navbar.Toggle>
    </Container>
  </Navbar>
</div>
  );
*/
