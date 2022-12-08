import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { LocalStorageProvider } from '../services/LocalStorageProvider';

export type AuthPopupState = {
  isShown: boolean;
  apiKey: string;
};

// eslint-disable-next-line @typescript-eslint/ban-types
export default class AuthPopup extends Component<{}, AuthPopupState> {
  // eslint-disable-next-line @typescript-eslint/ban-types
  constructor(pros: {}) {
    super(pros);
    this.state = {
      isShown: true,
      apiKey: '',
    };
  }

  handleChange(apiKey: string) {
    this.setState({ apiKey });
  }

  handleSubmit(event: React.MouseEvent) {
    const config = LocalStorageProvider.getData();
    const { apiKey } = this.state;
    if (config) {
      config.authData = apiKey;
      LocalStorageProvider.setData(config);
      window.history.go(0);
    }
    event.preventDefault();
  }

  render() {
    const { apiKey, isShown } = this.state;
    return (
      <Modal show={isShown} backdrop="static" keyboard={false}>
        <Modal.Header>
          <Modal.Title>You are not signed in.</Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
              value={apiKey}
              onChange={(e) => this.handleChange(e.target.value)}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={(e) => this.handleSubmit(e)}>
            Save changes
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
