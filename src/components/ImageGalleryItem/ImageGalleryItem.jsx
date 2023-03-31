import { Component } from "react";
import { Galleryitem, Galleryimage } from './ImageGalleryItem.styled';

export class ImageGalleryItem extends Component {
  handleClick=(e)=> {
    this.props.getModalImg(e.target.id);
    this.props.openModal();
  }

  render() {
    const { url, tags,id } = this.props;
    return (
      <Galleryitem>
        <Galleryimage
          id={id}
          src={url}
          alt={tags}
          onClick={this.handleClick}
        />
      </Galleryitem>
    );
  }
}

