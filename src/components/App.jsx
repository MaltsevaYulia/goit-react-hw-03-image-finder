import { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import SearchPhotos from '../api';

const searchPhotos = new SearchPhotos();
export class App extends Component {
  state = {
    photos: null,
    query: '',
  };

  search = async query => {
    searchPhotos.resetPage();
    try {
      const photos = await searchPhotos.fetchPhotos(query);
      this.updateState(photos.hits, query);
      // this.setState({ photos: photos.hits });
    } catch (e) {
      // this.setState({
      //   error: 'Упс, мы не смогли загрузить фото',
      // });
    }
  };

  updateState = (newPhotos, query) => {
    if (!this.state.photos || this.state.query !== query) {
      return this.setState({ photos: newPhotos, query });
    } else if (this.state.photos && this.state.query === query) {
      return this.setState(prevState => {
        const prevPhotos = prevState.photos;
        return { photos: [...prevPhotos, ...newPhotos] };
      });
    } 
  };

  loadMore = async () => {
    searchPhotos.incrementPage();
    const query=this.state.query
    try {
      const photos = await searchPhotos.fetchPhotos(query);
      this.updateState(photos.hits, query);
      // this.setState({ photos: photos.hits });
    } catch (e) {
    }
    // this.search(this.state.query);
  };

  render() {
    const { photos } = this.state;
    return (
      <>
        <Searchbar onSubmit={this.search} />
        {photos && (
          <>
            <ImageGallery photos={photos} />
            <Button loadMore={this.loadMore} />
          </>
        )}
      </>
    );
  }
}


