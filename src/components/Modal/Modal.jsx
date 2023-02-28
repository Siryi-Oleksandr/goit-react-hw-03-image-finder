import React, { Component } from 'react';
import { createPortal } from 'react-dom';

const modalRoot = document.getElementById('modal-root');

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = evt => {
    if (evt.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleBackdropClick = evt => {
    if (evt.currentTarget === evt.target) {
      this.props.onClose();
    }
  };
  render() {
    return createPortal(
      <div className="overlay" onClick={this.handleBackdropClick}>
        <div className="modal">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officiis
            incidunt, eveniet iste consequatur dolore mollitia laudantium quasi
            hic quis sapiente, delectus corrupti sed dolorem itaque quas
            distinctio saepe porro id!
          </p>
          <img src="" alt="" />
          <button type="button" onClick={() => this.props.onClose()}>
            Close
          </button>
        </div>
      </div>,
      modalRoot
    );
  }
}
