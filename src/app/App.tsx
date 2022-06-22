import React from 'react';
import { Component } from 'react';
import MainPage from './components/MainPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './scss/style.scss';

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="configs" element={<h1>configs</h1>} />
          <Route path="admin" element={<h1>admin</h1>} />
          <Route path="about" element={<h1>about</h1>} />
          <Route path="*" element={<h1>NOT FOUND</h1>} />
        </Routes>
      </BrowserRouter>
    );
  }
}
