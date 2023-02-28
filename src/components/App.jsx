import React, { Component } from 'react';
import { Modal } from './Modal/Modal';
import { Searchbar } from './Searchbar/Searchbar';
import API from '../services/api';

export class App extends Component {
  state = {
    query: '',
    totalPage: null,
    page: 1,
    items: [],
    showModal: false,
    error: false,
    status: 'igle',
  };

  componentDidMount() {}

  async componentDidUpdate(prevProps, prevState) {
    const { query, page } = this.state;
    if (prevState.page !== page || prevState.query !== query) {
      try {
        console.log('Fetch data');
        const images = await API.fetchImagesWithQuery(query, page);
        console.log(images);
        //  this.setState({ articles });
        this.setState({ status: 'resolved' });
      } catch (error) {
        this.setState({ error, status: 'rejected' });
      } finally {
        this.setState({ isLoading: false });
      }
    }
  }

  handleSubmit = query => {
    console.log(query);
    this.setState({ query });
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
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
