import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import PropTypes from 'prop-types';

export const ImageGallery = ({ images, onImageClick }) => {
  return (
    <ul className="imageGallery">
      {images.map(image => (
        <li className="imageGalleryItem" key={image.id}>
          <ImageGalleryItem image={image} onImageClick={onImageClick} />
        </li>
      ))}
    </ul>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webImgURL: PropTypes.string,
      lgImgURL: PropTypes.string,
      tags: PropTypes.string,
    })
  ).isRequired,
};
