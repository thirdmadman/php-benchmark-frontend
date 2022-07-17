import React, { Component } from 'react';
import { LocalStorageProvider } from '../../services/LocalStorageProvider';
import PageFooter from '../PageFooter';
import PageHeader from '../PageHeader';
import { PopupsAndBanners } from '../PopupsAndBanners';

export default class ConfigsPage extends Component {
  handleSignOut() {
    LocalStorageProvider.destroy();
    history.go(0);
  }

  render() {
    return (
      <div className="container">
        <PageHeader title={'Configs'} />
        <PopupsAndBanners />
        {LocalStorageProvider.getData()?.authData ? (
          <div>
            <button type="button" className="btn btn-secondary" onClick={() => this.handleSignOut()}>
              Sign out
            </button>
          </div>
        ) : (
          ''
        )}

        <PageFooter />
      </div>
    );
  }
}
