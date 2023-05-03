import { Component } from 'react';
import { LocalStorageProvider } from '../../services/LocalStorageProvider';
import PageFooter from '../PageFooter';
import PageHeader from '../PageHeader';
import { PopupsAndBanners } from '../PopupsAndBanners';

export default class ConfigsPage extends Component {
  render() {
    const handleSignOut = () => {
      LocalStorageProvider.destroy();
      window.history.go(0);
    };

    return (
      <div className="container">
        <PageHeader />
        <PopupsAndBanners />
        {LocalStorageProvider.getData()?.authData ? (
          <div>
            <button type="button" className="btn btn-secondary" onClick={() => handleSignOut()}>
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
