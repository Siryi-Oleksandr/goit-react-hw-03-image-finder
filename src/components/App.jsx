import React, { Component } from 'react';
import { Modal } from './Modal/Modal';
import { Searchbar } from './Searchbar/Searchbar';
import API from '../services/api';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';

export class App extends Component {
  state = {
    query: '',
    totalPage: null,
    page: 1,
    images: [],
    showModal: false,
    error: false,
    status: 'idle',
    largeImage: null,
  };

  componentDidMount() {}

  async componentDidUpdate(prevProps, prevState) {
    const { query, page } = this.state;

    if (prevState.query !== query) {
      this.setState({ status: 'pending', page: 1 });
      try {
        const images = await API.fetchImagesWithQuery(query, page);
        const handleImages = API.handleFetchData(images);
        this.setState({
          images: handleImages,
          status: 'resolved',
        });
      } catch (error) {
        this.setState({ error, status: 'rejected' });
      }
    }

    if (prevState.page !== page) {
      this.setState({ status: 'pending' });
      try {
        const images = await API.fetchImagesWithQuery(query, page);
        const handleImages = API.handleFetchData(images);
        this.setState(({ images }) => ({
          images: [...images, ...handleImages],
          status: 'resolved',
        }));
      } catch (error) {
        this.setState({ error, status: 'rejected' });
      }
    }
  }

  handleSubmit = query => {
    this.setState({ query });
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  getLargeImage = id => {
    const image = this.state.images.find(elem => elem.id === id);
    this.setState({
      largeImage: { url: image.lgImgURL, alt: image.tags },
      showModal: true,
    });
  };

  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  render() {
    const { showModal, images, largeImage, status } = this.state;
    return (
      <div>
        <Searchbar onSubmit={this.handleSubmit} />
        <ImageGallery images={images} onImageClick={this.getLargeImage} />
        {showModal && (
          <Modal showImage={largeImage} onClose={this.toggleModal} />
        )}
        {status === 'resolved' && <Button onLoadMore={this.loadMore} />}
      </div>
    );
  }
}
