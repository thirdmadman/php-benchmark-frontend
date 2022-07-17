import React, { Component } from 'react';
import { LocalStorageProvider } from '../services/LocalStorageProvider';

export default class AuthPopup extends Component {
  state = {
    isShown: true,
    apiKey: '',
  };

  hide() {
    this.setState({ isShown: false });
  }

  handleChange(apiKey: string) {
    this.setState({ apiKey });
  }

  handleSubmit(event: React.MouseEvent) {
    const config = LocalStorageProvider.getData();
    if (config) {
      config.authData = this.state.apiKey;
      LocalStorageProvider.setData(config);
      history.go(0);
    }
    event.preventDefault();
  }

  render() {
    return (
      <div
        className={'modal' + (this.state.isShown ? ' fade show' : '')}
        style={this.state.isShown ? { display: 'block' } : {}}
      >
        <div className="modal-dialog" style={{ zIndex: 1055 }}>
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">You are not signed in.</h5>
              {/* <button type="button" 
              className="btn-close" aria-label="Close" onClick={() => this.hide()}></button> */}
            </div>
            <div className="modal-body">
              <p>Please input API key:</p>
              <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">
                  key
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Your API key here"
                  aria-label="Your API key here"
                  aria-describedby="basic-addon1"
                  value={this.state.apiKey}
                  onChange={(e) => this.handleChange(e.target.value)}
                ></input>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-primary" onClick={(e) => this.handleSubmit(e)}>
                Save changes
                <i className="bi bi-lock"></i>
              </button>
              {/* <button type="button" className="btn btn-secondary" onClick={() => this.hide()}>
                Close
              </button> */}
            </div>
          </div>
        </div>
        <div className="modal-backdrop fade show"></div>
      </div>
    );
  }
}
