import { Component } from 'react';
import PageFooter from '../PageFooter';
import PageHeader from '../PageHeader';
import { PopupsAndBanners } from '../PopupsAndBanners';

export default class AdminPage extends Component {
  render() {
    return (
      <div className="container">
        <PageHeader title="Admin" />
        <PopupsAndBanners />
        <div />
        <PageFooter />
      </div>
    );
  }
}
