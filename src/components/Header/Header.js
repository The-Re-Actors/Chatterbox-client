import React, { Fragment } from 'react'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { NavLink } from 'react-router-dom'
import { StyledHeader } from '../styles/Header.styled'

const authenticatedOptions = (
  <Fragment>
    <NavLink to='/profile' className='nav-link'>Profile</NavLink>
    <NavLink to='/chat' className='nav-link'>Chat</NavLink>
    <NavLink to='/change-password' className='nav-link'>Change Password</NavLink>
    <NavLink to='/sign-out' className='nav-link'>Sign Out</NavLink>
  </Fragment>
)

// const unauthenticatedOptions = (
//   <Fragment>
//     <NavLink to='/sign-up' className='nav-link'>Sign Up</NavLink>
//     <NavLink to='/sign-in' className='nav-link'>Sign In</NavLink>
//   </Fragment>
// )

// const alwaysOptions = (
//   <Fragment>
//     <NavLink exact to='/' className='nav-link'>Home</NavLink>
//   </Fragment>
// )

const Header = ({ user }) => (
  <Navbar expand='md' className="justify-content-center">
    <Navbar.Brand>

      <img src='images/logo_white.png' alt='logo' />

    </Navbar.Brand>
    <StyledHeader>
      <Navbar.Toggle aria-controls='basic-navbar-nav' />
      <Navbar.Collapse id='basic-navbar-nav'>
        <Nav className='ml-auto'>
          {user && (
            <span className='navbar-text mr-2'>Welcome, {user.email}</span>
          )}
          {/* {alwaysOptions} */}
          {/* {user ? authenticatedOptions : unauthenticatedOptions} */}
          {user ? authenticatedOptions : ''}
        </Nav>
      </Navbar.Collapse>
    </StyledHeader>
  </Navbar>
)

export default Header
