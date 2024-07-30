import {
  faFileLines as faFileLinesRegular,
  faUser as faUserRegular,
} from '@fortawesome/free-regular-svg-icons';
import {
  faList,
  faShareNodes,
  faSliders,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className={`d-flex ${collapsed ? 'toggled' : ''}`}>
      {/* Sidebar */}
      <aside
        id='sidebar'
        className={`bg-primary text-light vh-100 p-3 ${collapsed ? 'collapsed' : ''} transition`}>
        <div className='d-flex align-items-center mb-4'>
          <a href='#' className='text-white fs-4 fw-bold text-decoration-none'>
            CodzSword
          </a>
        </div>
        {/* Sidebar Navigation */}
        <ul className='nav flex-column'>
          <li className='nav-item mb-2'>
            <span className='text-muted small'>Tools & Components</span>
          </li>
          <li className='nav-item'>
            <a
              href='#'
              className='nav-link text-white d-flex align-items-center'>
              <FontAwesomeIcon icon={faList} className='me-2' />
              Profile
            </a>
          </li>
          <li className='nav-item'>
            <a
              href='#'
              className='nav-link text-white'
              data-bs-toggle='collapse'
              data-bs-target='#pages'
              aria-expanded='false'
              aria-controls='pages'>
              <FontAwesomeIcon icon={faFileLinesRegular} className='me-2' />
              Pages
            </a>
            <ul id='pages' className='collapse ms-3'>
              <li className='nav-item'>
                <a href='#' className='nav-link text-white'>
                  Analytics
                </a>
              </li>
              <li className='nav-item'>
                <a href='#' className='nav-link text-white'>
                  Ecommerce
                </a>
              </li>
              <li className='nav-item'>
                <a href='#' className='nav-link text-white'>
                  Crypto
                </a>
              </li>
            </ul>
          </li>
          <li className='nav-item'>
            <a
              href='#'
              className='nav-link text-white'
              data-bs-toggle='collapse'
              data-bs-target='#dashboard'
              aria-expanded='false'
              aria-controls='dashboard'>
              <FontAwesomeIcon icon={faSliders} className='me-2' />
              Dashboard
            </a>
            <ul id='dashboard' className='collapse ms-3'>
              <li className='nav-item'>
                <a href='#' className='nav-link text-white'>
                  Dashboard Analytics
                </a>
              </li>
              <li className='nav-item'>
                <a href='#' className='nav-link text-white'>
                  Dashboard Ecommerce
                </a>
              </li>
            </ul>
          </li>
          <li className='nav-item'>
            <a
              href='#'
              className='nav-link text-white'
              data-bs-toggle='collapse'
              data-bs-target='#auth'
              aria-expanded='false'
              aria-controls='auth'>
              <FontAwesomeIcon icon={faUserRegular} className='me-2' />
              Auth
            </a>
            <ul id='auth' className='collapse ms-3'>
              <li className='nav-item'>
                <a href='#' className='nav-link text-white'>
                  Login
                </a>
              </li>
              <li className='nav-item'>
                <a href='#' className='nav-link text-white'>
                  Register
                </a>
              </li>
            </ul>
          </li>
          <li className='nav-item mt-4'>
            <span className='text-muted small'>Multi Level Nav</span>
          </li>
          <li className='nav-item'>
            <a
              href='#'
              className='nav-link text-white'
              data-bs-toggle='collapse'
              data-bs-target='#multi'
              aria-expanded='false'
              aria-controls='multi'>
              <FontAwesomeIcon icon={faShareNodes} className='me-2' />
              Multi Level
            </a>
            <ul id='multi' className='collapse ms-3'>
              <li className='nav-item'>
                <a
                  href='#'
                  className='nav-link text-white'
                  data-bs-toggle='collapse'
                  data-bs-target='#multi-two'
                  aria-expanded='false'
                  aria-controls='multi-two'>
                  Two Links
                </a>
                <ul id='multi-two' className='collapse ms-3'>
                  <li className='nav-item'>
                    <a href='#' className='nav-link text-white'>
                      Link 1
                    </a>
                  </li>
                  <li className='nav-item'>
                    <a href='#' className='nav-link text-white'>
                      Link 2
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </li>
        </ul>
      </aside>
    </div>
  );
};

export default Sidebar;
