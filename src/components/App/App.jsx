import { Component } from 'react';
import { Searchbar } from '../Searchbar/Searchbar';
import { ImageGallery } from '../ImageGallery/ImageGallery';
import { Button } from '../Button/Button';
import { Loader } from '../Loader/Loader';
import { Modal } from '../Modal/Modal';
import { AppDiv } from './App.styled';
import SearchPhotos from '../../api/api';

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

  componentDidUpdate(prevProps, prevState) {
    // Если изменилось query, ищем фото
    const prevQuery = prevState.query;
    const { query } = this.state;
    if (prevQuery !== query) {
      this.search(query);
    }
  }

  search = async query => {
    searchPhotos.resetPage();
    this.setState({ isLoading: true });
    try {
      const photos = await searchPhotos.fetchPhotos(query);
      this.setState({ photos: photos.hits });
    } catch (error) {
      console.log(error);
      alert(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    } finally {
      this.setState({ isLoading: false });
      this.setState({ isLoadMore: true });
    }
  };

  getQuery = query => {
    if (this.state.query !== query) {
      return this.setState({ query });
    }
  };

  loadMore = async () => {
    searchPhotos.incrementPage();
    const query = this.state.query;
    this.setState({ isLoading: true });
    try {
      const photos = await searchPhotos.fetchPhotos(query);
      this.setState(prevState => {
        const prevPhotos = prevState.photos;
        return { photos: [...prevPhotos, ...photos.hits] };
      });
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
        <Searchbar onSubmit={this.getQuery} />
        {photos && (
          <ImageGallery
            photos={photos}
            getModalImg={this.getModalImg}
            openModal={this.toggleModal}
          />
        )}
        {isLoading && <Loader />}
        {photos && isLoadMore && <Button loadMore={this.loadMore} />}
        {isModalShow && <Modal onClose={this.toggleModal} url={largeUrl} />}
      </AppDiv>
    );
  }
}
