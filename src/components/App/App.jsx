import { useState, useEffect } from 'react';
import axios from 'axios';
import { StyledApp } from './App.styled';
import { Searchbar } from '../Searchbar/Searchbar';
import { ImageGallery } from '../ImageGallery/ImageGallery';
import { Modal } from 'components/Modal/Modal';
import { Button } from 'components/Button/Button';
import { Loader } from 'components/Loader/Loader';

export const App = function () {
  const KEY = '20889141-879292f7de0589dc14ea8950f';

  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [name, setName] = useState('');
  const [page, setPage] = useState(1);
  const [modalContent, setModalContent] = useState('');

  useEffect(() => {
    if (name === '') {
      return;
    }
    fetchImages(name, page).then(response => {
      setImages(response);
      setPage(prev => {
        return prev + 1;
      });
    });
  }, [name]);

  const handleChangeState = name => {
    setName(name);
    setPage(1);
    setLoading(true);
  };

  const fetchImages = async (name, page) => {
    try {
      const response = await axios.get(
        `https://pixabay.com/api/?q=${name}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`
      );
      return response.data.hits;
    } catch (error) {
      setError(`Sorry, we have an error: ${error}`);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMoreBtn = () => {
    setLoading(true);
    fetchImages(name, page).then(response => {
      setImages(prev => {
        return [...prev, ...response];
      });
      setPage(prev => {
        return prev + 1;
      });
    });
  };

  const closeModal = () => {
    setModalContent('');
  };

  const openModal = largeImg => {
    setModalContent(largeImg);
  };

  return (
    <StyledApp>
      <Searchbar onSubmit={handleChangeState}></Searchbar>
      {error && <h2>{error}</h2>}
      <ImageGallery images={images} onClick={openModal}></ImageGallery>
      {loading && <Loader />}
      {images.length > 0 && <Button onClick={handleLoadMoreBtn} />}
      {modalContent && (
        <Modal onClose={closeModal}>
          <img src={modalContent} alt="" />
        </Modal>
      )}
    </StyledApp>
  );
};
