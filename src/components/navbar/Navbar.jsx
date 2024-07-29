import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <>
      <nav className='navbar navbar-expand-lg navbar-light bg-light shadow-sm position-absolute top-0 start-0 end-0 mx-4 my-3 py-2 rounded'>
        <div className='container-fluid'>
          <a
            className='navbar-brand font-weight-bolder ms-lg-0 ms-3'
            href='#'>
            Material Dashboard 2
          </a>
          <button
            className='navbar-toggler shadow-none ms-2'
            type='button'
            data-bs-toggle='collapse'
            data-bs-target='#navigation'
            aria-controls='navigation'
            aria-expanded='false'
            aria-label='Toggle navigation'>
            <span className='navbar-toggler-icon'></span>
          </button>
          <div
            className='collapse navbar-collapse'
            id='navigation'>
            <ul className='navbar-nav mx-auto'>
              <li className='nav-item'>
                <Link
                  className='nav-link d-flex align-items-center me-2 active'
                  aria-current='page'
                  to='/dashboard'>
                  <i className='fa fa-chart-pie opacity-6 text-dark me-1'></i>
                  Dashboard
                </Link>
              </li>
              <li className='nav-item'>
                <Link
                  className='nav-link me-2'
                  to='/todo'>
                  <i className='fa fa-user opacity-6 text-dark me-1'></i>
                  To Do
                </Link>
              </li>
              <li className='nav-item'>
                <a
                  className='nav-link me-2'
                  href='#'>
                  <i className='fas fa-user-circle opacity-6 text-dark me-1'></i>
                  Sign Up
                </a>
              </li>
              <li className='nav-item'>
                <a
                  className='nav-link me-2'
                  href='#'>
                  <i className='fas fa-key opacity-6 text-dark me-1'></i>
                  Sign In
                </a>
              </li>
            </ul>
            <ul className='navbar-nav d-lg-flex d-none'>
              <li className='nav-item d-flex align-items-center'>
                <a
                  className='btn btn-outline-primary btn-sm mb-0 me-2'
                  target='_blank'
                  href='https://www.creative-tim.com/builder?ref=navbar-material-dashboard'>
                  Online Builder
                </a>
              </li>
              <li className='nav-item'>
                <a
                  href='https://www.creative-tim.com/product/material-dashboard'
                  className='btn btn-sm mb-0 me-1 bg-gradient-dark'>
                  Free download
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
