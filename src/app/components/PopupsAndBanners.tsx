import { Component } from 'react';
import { LocalStorageProvider } from '../services/LocalStorageProvider';
import AuthPopup from './AuthPopup';

export class PopupsAndBanners extends Component {
  render() {
    return !LocalStorageProvider.getData()?.authData ? <AuthPopup /> : '';
  }
}
