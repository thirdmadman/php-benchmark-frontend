import React, { Component } from 'react';
import PageFooter from '../PageFooter';
import PageHeader from '../PageHeader';
import { PopupsAndBanners } from '../PopupsAndBanners';

export default class AboutPage extends Component {
  render() {
    return (
      <div className="container">
        <PageHeader title={'About'} />
        <PopupsAndBanners />
        <div></div>
        <PageFooter />
      </div>
    );
  }
}
