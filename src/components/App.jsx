import React, { Component } from 'react';
import { Modal } from './Modal/Modal';
import { Searchbar } from './Searchbar/Searchbar';
import API from '../services/api';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';

export class App extends Component {
  state = {
    query: '',
    totalPages: 0,
    page: 1,
    images: [],
    error: false,
    status: 'idle',
  };

  async componentDidUpdate(prevProps, prevState) {
    const { query, page } = this.state;

    if (prevState.query !== query) {
      this.setState({ status: 'pending', page: 1 });
      try {
        const data = await API.fetchImagesWithQuery(query, page);
        const handleImages = API.handleFetchData(data.images);
        this.setState({
          images: handleImages,
          status: 'resolved',
          totalPages: data.totalPages,
        });
      } catch (error) {
        this.setState({ error, status: 'rejected' });
      }
    }

    if (prevState.page !== page) {
      this.setState({ status: 'pending' });
      try {
        const data = await API.fetchImagesWithQuery(query, page);
        const handleImages = API.handleFetchData(data.images);
        this.setState(({ images }) => ({
          images: [...images, ...handleImages],
          status: 'resolved',
          totalPages: data.totalPages,
        }));
      } catch (error) {
        this.setState({ error, status: 'rejected' });
      }
    }
  }

  handleSubmit = query => {
    this.setState({ query });
  };

  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  render() {
    const { images, status, page, totalPages } = this.state;
    const availablePages = totalPages > page;
    return (
      <div>
        <Searchbar onSubmit={this.handleSubmit} />
        {status === 'pending' && <Loader />}
        <ImageGallery images={images} />
        {availablePages && <Button onLoadMore={this.loadMore} />}
      </div>
    );
  }
}
