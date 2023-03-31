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
    isLoadMore: false,
    isModalShow: false,
    largeUrl: '',
  };

  search = async query => {
    searchPhotos.resetPage();
    this.setState({ isLoading: true });
    try {
      const photos = await searchPhotos.fetchPhotos(query);
      this.updateState(photos.hits, query);
    } catch (error) {
      console.log(error);
      alert('Упс, мы не смогли загрузить фото');
      // this.setState({
      //   error: 'Упс, мы не смогли загрузить фото',
      // });
    } finally {
      this.setState({ isLoading: false });
      this.setState({ isLoadMore: true });
    }
  };

  updateState = (newPhotos, query) => {
    // const { photos } = this.state;
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
    this.setState({ isLoading: true });
    try {
      const photos = await searchPhotos.fetchPhotos(query);
      this.updateState(photos.hits, query);
    } catch (error) {
      this.setState({ isLoadMore: false });
      alert("We're sorry, but you've reached the end of search results.");
    } finally {
      this.setState({ isLoading: false });
    }
  };

  toggleModal = () => {
    this.setState(prevState => {
      return { isModalShow: !prevState.isModalShow };
    });
  };

  getModalImg = imgId => {
    const larImgUrlEl = this.state.photos.find(el => el.id === Number(imgId));
    const largeUrl = larImgUrlEl.largeImageURL;
    this.setState({ largeUrl });
  };

  render() {
    const { photos, isLoading, isModalShow, largeUrl, isLoadMore } = this.state;
    return (
      <AppDiv>
        <Searchbar onSubmit={this.search} />
        {photos && (
          <>
            <ImageGallery
              photos={photos}
              getModalImg={this.getModalImg}
              openModal={this.toggleModal}
            />
            {/* {isLoading && <Loader />}
            {isLoadMore && <Button loadMore={this.loadMore} />} */}
          </>
        )}
        {isLoading && <Loader />}
        {photos&&isLoadMore && <Button loadMore={this.loadMore} />}
        {isModalShow && <Modal onClose={this.toggleModal} url={largeUrl} />}
      </AppDiv>
    );
  }
}
