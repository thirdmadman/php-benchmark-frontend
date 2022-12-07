import { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { GlobalConstants } from '../../GlobalConstants';

export default class PageFooter extends Component {
  render() {
    return (
      <footer className="py-3 my-4">
        <ul className="nav justify-content-center border-bottom pb-3 mb-3">
          <li className="nav-item">
            <NavLink
              to={GlobalConstants.ROUTE_MAIN}
              className={({ isActive }) => `nav-link px-2${isActive ? ' active' : ' text-muted'}`}
            >
              Statistic
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to={GlobalConstants.ROUTE_CONFIGS}
              className={({ isActive }) => `nav-link px-2${isActive ? ' active' : ' text-muted'}`}
            >
              Configs
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to={GlobalConstants.ROUTE_ADMIN}
              className={({ isActive }) => `nav-link px-2${isActive ? ' active' : ' text-muted'}`}
            >
              Admin
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to={GlobalConstants.ROUTE_ABOUT}
              className={({ isActive }) => `nav-link px-2${isActive ? ' active' : ' text-muted'}`}
            >
              About
            </NavLink>
          </li>
        </ul>
        <p className="text-center text-muted">&copy; 2022 thirdmadman</p>
      </footer>
    );
  }
}
