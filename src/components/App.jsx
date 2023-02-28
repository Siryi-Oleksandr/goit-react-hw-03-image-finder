import React, { Component } from 'react';
import { Modal } from './Modal/Modal';
import { Searchbar } from './Searchbar/Searchbar';

export class App extends Component {
  state = {
    search: '',
    showModal: false,
  };

  handleSubmit = search => {
    console.log(search);
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  render() {
    const { showModal } = this.state;
    return (
      <div>
        <Searchbar onSubmit={this.handleSubmit} />
        <button type="button" onClick={this.toggleModal}>
          Open modal
        </button>
        {showModal && <Modal onClose={this.toggleModal} />}
      </div>
    );
  }
}
