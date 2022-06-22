import React, { Component } from 'react';

export default class PageHeader extends Component {
  render() {
    return (
      <header className="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom">
        <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-dark text-decoration-none">
          <span className="fs-4">Benchmark results</span>
        </a>

        <ul className="nav nav-pills">
          <li className="nav-item">
            <a href="/" className="nav-link active" aria-current="page">
              Statistic
            </a>
          </li>
          <li className="nav-item">
            <a href="/configs" className="nav-link">
              Configs
            </a>
          </li>
          <li className="nav-item">
            <a href="/admin" className="nav-link">
              Admin
            </a>
          </li>
          <li className="nav-item">
            <a href="/about" className="nav-link">
              About
            </a>
          </li>
        </ul>
      </header>
    );
  }
}
