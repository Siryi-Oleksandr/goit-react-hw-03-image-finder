import PropTypes from 'prop-types';

export const ImageGalleryItem = ({ image, onImageClick }) => {
  const { id, tags, webImgURL, lgImgURL } = image;
  return (
    <>
      <img
        className="imageGalleryItem-image"
        src={webImgURL}
        alt={tags}
        onClick={() => onImageClick(id)}
      />
    </>
  );
};

ImageGalleryItem.propTypes = {
  image: PropTypes.shape({
    id: PropTypes.number.isRequired,
    webImgURL: PropTypes.string,
    lgImgURL: PropTypes.string,
    tags: PropTypes.string,
  }).isRequired,
  onImageClick: PropTypes.func.isRequired,
};
