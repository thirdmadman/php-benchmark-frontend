import React, { Component } from 'react';
import PageFooter from './PageFooter';
import PageHeader from './PageHeader';

export default class AdminPage extends Component {
  render() {
    return (
      <div className="container">
        <PageHeader />
        <div>Admin</div>
        <PageFooter />
      </div>
    );
  }
}
