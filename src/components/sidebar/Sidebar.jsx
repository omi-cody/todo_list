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
import './Sidebar.css'; // Import your custom CSS here

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className={`wrapper ${collapsed ? 'collapsed' : ''}`}>
      {/* Sidebar */}
      <aside
        id='sidebar'
        className={`h-100 ${collapsed ? 'collapsed' : ''}`}>
        <div className='sidebar-logo'>
          <a href='#'>CodzSword</a>
        </div>
        {/* Sidebar Navigation */}
        <ul className='sidebar-nav'>
          <li className='sidebar-header'>Tools & Components</li>
          <li className='sidebar-item'>
            <a
              href='#'
              className='sidebar-link'>
              <FontAwesomeIcon
                icon={faList}
                className='pe-2'
              />
              Profile
            </a>
          </li>
          <li className='sidebar-item'>
            <a
              href='#'
              className='sidebar-link collapsed'
              data-bs-toggle='collapse'
              data-bs-target='#pages'
              aria-expanded='false'
              aria-controls='pages'>
              <FontAwesomeIcon
                icon={faFileLinesRegular}
                className='pe-2'
              />
              Pages
            </a>
            <ul
              id='pages'
              className='sidebar-dropdown list-unstyled collapse'
              data-bs-parent='#sidebar'>
              <li className='sidebar-item'>
                <a
                  href='#'
                  className='sidebar-link'>
                  Analytics
                </a>
              </li>
              <li className='sidebar-item'>
                <a
                  href='#'
                  className='sidebar-link'>
                  Ecommerce
                </a>
              </li>
              <li className='sidebar-item'>
                <a
                  href='#'
                  className='sidebar-link'>
                  Crypto
                </a>
              </li>
            </ul>
          </li>
          <li className='sidebar-item'>
            <a
              href='#'
              className='sidebar-link collapsed'
              data-bs-toggle='collapse'
              data-bs-target='#dashboard'
              aria-expanded='false'
              aria-controls='dashboard'>
              <FontAwesomeIcon
                icon={faSliders}
                className='pe-2'
              />
              Dashboard
            </a>
            <ul
              id='dashboard'
              className='sidebar-dropdown list-unstyled collapse'
              data-bs-parent='#sidebar'>
              <li className='sidebar-item'>
                <a
                  href='#'
                  className='sidebar-link'>
                  Dashboard Analytics
                </a>
              </li>
              <li className='sidebar-item'>
                <a
                  href='#'
                  className='sidebar-link'>
                  Dashboard Ecommerce
                </a>
              </li>
            </ul>
          </li>
          <li className='sidebar-item'>
            <a
              href='#'
              className='sidebar-link collapsed'
              data-bs-toggle='collapse'
              data-bs-target='#auth'
              aria-expanded='false'
              aria-controls='auth'>
              <FontAwesomeIcon
                icon={faUserRegular}
                className='pe-2'
              />
              Auth
            </a>
            <ul
              id='auth'
              className='sidebar-dropdown list-unstyled collapse'
              data-bs-parent='#sidebar'>
              <li className='sidebar-item'>
                <a
                  href='#'
                  className='sidebar-link'>
                  Login
                </a>
              </li>
              <li className='sidebar-item'>
                <a
                  href='#'
                  className='sidebar-link'>
                  Register
                </a>
              </li>
            </ul>
          </li>
          <li className='sidebar-header'>Multi Level Nav</li>
          <li className='sidebar-item'>
            <a
              href='#'
              className='sidebar-link collapsed'
              data-bs-toggle='collapse'
              data-bs-target='#multi'
              aria-expanded='false'
              aria-controls='multi'>
              <FontAwesomeIcon
                icon={faShareNodes}
                className='pe-2'
              />
              Multi Level
            </a>
            <ul
              id='multi'
              className='sidebar-dropdown list-unstyled collapse'
              data-bs-parent='#sidebar'>
              <li className='sidebar-item'>
                <a
                  href='#'
                  className='sidebar-link collapsed'
                  data-bs-toggle='collapse'
                  data-bs-target='#multi-two'
                  aria-expanded='false'
                  aria-controls='multi-two'>
                  Two Links
                </a>
                <ul
                  id='multi-two'
                  className='sidebar-dropdown list-unstyled collapse'>
                  <li className='sidebar-item'>
                    <a
                      href='#'
                      className='sidebar-link'>
                      Link 1
                    </a>
                  </li>
                  <li className='sidebar-item'>
                    <a
                      href='#'
                      className='sidebar-link'>
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
