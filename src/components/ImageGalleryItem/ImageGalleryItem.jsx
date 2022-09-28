import PropTypes from 'prop-types';
import { GalleryItem, GalleryImg } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ image, name, largeImg, onClick }) => {
  return (
    <GalleryItem onClick={() => onClick(largeImg)}>
      <GalleryImg src={image} alt={name} />
    </GalleryItem>
  );
};

ImageGalleryItem.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  largeImg: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
