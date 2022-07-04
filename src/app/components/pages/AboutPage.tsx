import React, { Component } from 'react';
import PageFooter from '../PageFooter';
import PageHeader from '../PageHeader';

export default class AboutPage extends Component {
  render() {
    return (
      <div className="container">
        <PageHeader />
        <div>About</div>
        <PageFooter />
      </div>
    );
  }
}
