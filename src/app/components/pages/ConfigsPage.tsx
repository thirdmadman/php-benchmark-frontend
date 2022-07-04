import React, { Component } from 'react';
import PageFooter from '../PageFooter';
import PageHeader from '../PageHeader';

export default class ConfigsPage extends Component {
  render() {
    return (
      <div className="container">
        <PageHeader />
        <div>Configs</div>
        <PageFooter />
      </div>
    );
  }
}
