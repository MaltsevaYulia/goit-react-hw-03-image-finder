export const ImageGalleryItem = ({url,tags}) => {
    return (
      <li className="gallery-item">
            <img src={url} alt={tags} width={240} />
      </li>
    );
}