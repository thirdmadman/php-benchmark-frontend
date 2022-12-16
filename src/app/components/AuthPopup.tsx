import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { connect } from 'react-redux';
import { IAuthPopupState } from '../interfaces/IAuthPopupState';
import { handleChange, saveData, handleIsShown } from '../redux/auth-popup/authPopupSlice';
import { RootState } from '../redux/store';

interface DispatchProps {
  saveDataAction: typeof saveData;
  handleChangeAction: typeof handleChange;
  handleIsShownAction: typeof handleIsShown;
}

type Props = IAuthPopupState & DispatchProps;
class AuthPopup extends Component<Props> {
  handleSubmit(event: React.MouseEvent) {
    const { saveDataAction } = this.props;
    saveDataAction();
    event.preventDefault();
  }

  render() {
    const { apiKey, isShown, handleChangeAction, handleIsShownAction } = this.props;
    handleIsShownAction();
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
              onChange={(e) => handleChangeAction(e.target.value)}
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

const mapStateToProps = (state: RootState) => ({
  ...state.authPopup,
});

const mapDispatchToProps = {
  saveDataAction: saveData,
  handleChangeAction: handleChange,
  handleIsShownAction: handleIsShown,
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthPopup);
