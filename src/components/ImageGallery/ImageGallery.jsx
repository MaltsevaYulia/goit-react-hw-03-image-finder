import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import { Gallery } from './ImageGallery.styled';
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
