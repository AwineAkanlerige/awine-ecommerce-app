import React from 'react';
import React from 'react-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Badge from 'react-bootstrap/Badge';
import Container from 'react-bootstrap/Container';
import { LinkContainer } from 'react-router-bootstrap';
import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { Store } from '../Store';
import { NavDropdown } from 'react-bootstrap';

const Navbar = () => {

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
    <header>
      <Navbar bg="white" variant="white" expand="lg">
        <Container>

          <Navbar.Brand>Paku Limited</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav"/>

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
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto w-t00 justify-content-end">

        <ul>
          
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
        </Nav>
        </Navbar.Collapse>

        </Container>
      </Navbar>
    </header>
  )
}

export default Navbar
