import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';

export const ImageGallery = ({ photos }) => {
  return (
    <ul className="gallery">
      {photos.map(({ id, webformatURL, tags }) => {
        return <ImageGalleryItem key={id} url={webformatURL} tags={tags} />;
      })}
    </ul>
  );
};
