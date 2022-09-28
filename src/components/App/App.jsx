import { Component } from 'react';
import axios from 'axios';
// import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import { StyledApp } from './App.styled';
import { Searchbar } from '../Searchbar/Searchbar';
import { ImageGallery } from '../ImageGallery/ImageGallery';
import { Modal } from 'components/Modal/Modal';
import { Button } from 'components/Button/Button';
import { Loader } from 'components/Loader/Loader';

export class App extends Component {
  KEY = '20889141-879292f7de0589dc14ea8950f';

  state = {
    images: [],
    loading: false,
    error: null,
    name: '',
    page: 1,
    modalContent: '',
  };

  componentDidUpdate(prevProps, prevState) {
    const prevName = prevState.name;
    const { name, page } = this.state;
    if (prevName !== name) {
      this.fetchImages(name, page).then(response => {
        this.setState({ images: response, page: page + 1, loading: false });
      });
    }
  }

  handleChangeState = ({ name }) => {
    this.setState({ name: name, page: 1, loading: true });
  };

  fetchImages = async (name, page) => {
    try {
      const response = await axios.get(
        `https://pixabay.com/api/?q=${name}&page=${page}&key=${this.KEY}&image_type=photo&orientation=horizontal&per_page=12`
      );
      return response.data.hits;
    } catch (error) {
      this.setState({ error: `Sorry, we have an error: ${error}` });
      console.error(error);
    } finally {
      this.setState({ loading: false });
    }
  };

  handleLoadMoreBtn = () => {
    const { name, page } = this.state;
    this.setState({ loading: true });
    this.fetchImages(name, page).then(response => {
      this.setState(prevState => ({
        images: [...prevState.images, ...response],
        page: prevState.page + 1,
      }));
    });
  };

  closeModal = () => {
    this.setState({
      modalContent: '',
    });
  };

  openModal = largeImg => {
    this.setState({
      modalContent: largeImg,
    });
  };

  render() {
    const { images, loading, error, modalContent } = this.state;
    return (
      <StyledApp>
        <Searchbar onSubmit={this.handleChangeState}></Searchbar>
        {error && <h2>{error}</h2>}
        <ImageGallery images={images} onClick={this.openModal}></ImageGallery>
        {loading && <Loader />}
        {images.length > 0 && <Button onClick={this.handleLoadMoreBtn} />}
        {modalContent && (
          <Modal onClose={this.closeModal}>
            <img src={modalContent} alt="" />
          </Modal>
        )}
      </StyledApp>
    );
  }
}
