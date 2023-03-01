import React, { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { fetchImagesWithQuery, handleFetchData } from '../services/api';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
      this.setState({ status: 'pending' });
      try {
        const data = await fetchImagesWithQuery(query, 1);
        const handleImages = handleFetchData(data.images);
        this.setState({
          images: handleImages,
          status: 'resolved',
          totalPages: data.totalPages,
        });
      } catch (error) {
        this.setState({ error, status: 'rejected' });
      }
    }

    if (prevState.page !== page && page !== 1) {
      this.setState({ status: 'pending' });
      try {
        const data = await fetchImagesWithQuery(query, page);
        const handleImages = handleFetchData(data.images);
        this.setState(({ images }) => ({
          images: [...images, ...handleImages],
          status: 'resolved',
          totalPages: data.totalPages,
        }));
      } catch (error) {
        this.setState({ error, status: 'rejected' });
      } finally {
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
    const { query, images, status, page, totalPages } = this.state;
    const availablePages = totalPages > page;

    return (
      <div>
        <Searchbar onSubmit={this.handleSubmit} />
        {status === 'pending' && <Loader />}
        {status === 'resolved' && images.length > 0 && (
          <ImageGallery images={images} />
        )}
        {status === 'resolved' &&
          images.length === 0 &&
          toast.info(`${query} not found!`, {
            position: toast.POSITION.TOP_CENTER,
          })}
        {availablePages && status === 'resolved' && (
          <Button onLoadMore={this.loadMore} />
        )}
        {status === 'rejected' &&
          toast.error(`$Something went wrong`, {
            position: toast.POSITION.TOP_CENTER,
          })}
        <ToastContainer />
      </div>
    );
  }
}
