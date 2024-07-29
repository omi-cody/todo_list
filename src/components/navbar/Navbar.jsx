import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const[time,settime]=useState(new Date());

    useEffect(()=>{
        const intervalId=setInterval(() => {
            settime(new Date());
        },1000);

        return()=>{
            clearInterval(intervalId);
        };


    },[]);

    function formatClock(){
        let hours = time.getHours();
        const minutes = time.getMinutes();
        const seconds=time.getSeconds();
        const meridim = hours >=12? "PM":"AM";


        hours = hours % 12 || 12;

        return `${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)} ${meridim}`;

    }

    function padZero(number){
        return (number < 10 ? "0" : "") + number;

    }
  return (
    <>
      <nav className='navbar navbar-expand-lg navbar-light bg-light shadow-sm position-absolute top-0 start-0 end-0 mx-4 my-3 py-2 rounded'>
        <div className='container-fluid'>
          <Link
            className='navbar-brand font-weight-bolder ms-lg-0 ms-3'
            to='/Dashboard'>
            To-Do
          </Link>
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
                <Link
                  className='nav-link me-2'
                  to='/signIn'>
                  <i className='fas fa-key opacity-6 text-dark me-1'></i>
                  Sign In
                </Link>
              </li>
            </ul>
            <ul className='navbar-nav d-lg-flex d-none'>
              <li className='nav-item d-flex align-items-center'>
                <div className="clock-container">
                  <div className="clock">
                    <span>{formatClock()}</span>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
