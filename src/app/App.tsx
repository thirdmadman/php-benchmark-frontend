import { Component } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainPage from './components/pages/MainPage';
import './scss/style.scss';
import ConfigsPage from './components/pages/ConfigsPage';
import AboutPage from './components/pages/AboutPage';
import AdminPage from './components/pages/AdminPage';
import { GlobalConstants } from '../GlobalConstants';

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path={GlobalConstants.ROUTE_MAIN} element={<MainPage />} />
          <Route path={GlobalConstants.ROUTE_CONFIGS} element={<ConfigsPage />} />
          <Route path={GlobalConstants.ROUTE_ADMIN} element={<AdminPage />} />
          <Route path={GlobalConstants.ROUTE_ABOUT} element={<AboutPage />} />
          <Route path="*" element={<h1>NOT FOUND</h1>} />
        </Routes>
      </BrowserRouter>
    );
  }
}
