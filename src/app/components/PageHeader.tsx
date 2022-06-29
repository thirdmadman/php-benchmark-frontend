import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { GlobalConstants } from '../../GlobalConstants';

export default class PageHeader extends Component {
  render() {
    return (
      <header className="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom">
        <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-dark text-decoration-none">
          <span className="fs-4">Benchmark results</span>
        </a>

        <ul className="nav nav-pills">
          <li className="nav-item">
            <NavLink
              to={GlobalConstants.ROUTE_MAIN}
              className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')}
            >
              Statistic
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to={GlobalConstants.ROUTE_CONFIGS}
              className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')}
            >
              Configs
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to={GlobalConstants.ROUTE_ADMIN}
              className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')}
            >
              Admin
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to={GlobalConstants.ROUTE_ABOUT}
              className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')}
            >
              About
            </NavLink>
          </li>
        </ul>
      </header>
    );
  }
}
