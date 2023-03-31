import { Component } from 'react';
import { Searchbar } from '../Searchbar/Searchbar';
import { ImageGallery } from '../ImageGallery/ImageGallery';
import { Button } from '../Button/Button';
import { Loader } from '../Loader/Loader';
import { Modal } from '../Modal/Modal';

import { AppDiv } from './App.styled';

import SearchPhotos from '../../api';

const searchPhotos = new SearchPhotos();
export class App extends Component {
  state = {
    photos: null,
    query: '',
    isLoading: false,
    isModalShow: false,
  };

  componentDidUpdate() {}

  // changeQuery = query => {
  //   this.setState({query})
  // };

  search = async query => {
    searchPhotos.resetPage();
    this.setState({ isLoading: true });
    try {
      const photos = await searchPhotos.fetchPhotos(query);
      this.updateState(photos.hits, query);
      // this.setState({ photos: photos.hits });
    } catch (e) {
      // this.setState({
      //   error: 'Упс, мы не смогли загрузить фото',
      // });
    } finally {
      this.setState({ isLoading: false });
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
    const query = this.state.query;
    try {
      const photos = await searchPhotos.fetchPhotos(query);
      this.updateState(photos.hits, query);
      // this.setState({ photos: photos.hits });
    } catch (e) {}
    // this.search(this.state.query);
  };

  render() {
    const { photos, isLoading, isModalShow } = this.state;
    return (
      <AppDiv>
        <Searchbar onSubmit={this.search} />

        {photos && (
          <>
            <ImageGallery photos={photos} />

            <Button loadMore={this.loadMore} />
          </>
        )}
        {isLoading && <Loader />}

        {isModalShow && (
          <Modal
            url={
              'https://pixabay.com/get/g05e6631b1e2a2d734c024b56289ade4d4a021ee09c2678f71720841292827a4f6bb1697c79bc3ba8d4822e627534f686_1280.jpg'
            }
          />
        )}
      </AppDiv>
    );
  }
}
