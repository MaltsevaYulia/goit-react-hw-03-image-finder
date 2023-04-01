import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import { Gallery } from './ImageGallery.styled';
import PropTypes from 'prop-types';

export const ImageGallery = ({ photos, openModal, getModalImg }) => {
  return (
    <Gallery>
      {photos.map(({ id, webformatURL, tags }) => {
        return (
          <ImageGalleryItem
            openModal={openModal}
            getModalImg={getModalImg}
            key={id}
            id={id}
            url={webformatURL}
            tags={tags}
          />
        );
      })}
    </Gallery>
  );
};

ImageGallery.protoType = {
  photos: PropTypes.arrayOf({
    id: PropTypes.number.isRequired,
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }),
  getModalImg:PropTypes.func.isRequired,
  openModal:PropTypes.func.isRequired,
};
