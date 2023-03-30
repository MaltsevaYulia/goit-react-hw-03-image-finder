import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '33441417-95384e2574ef1faadfd151af8';

const options = {
  params: {
    key: API_KEY,
    image_type: 'photo',
    orientation: 'horizontal',
    // safesearch: true,
    per_page: 12,
  },
};

export default class SearchPhotos {
  constructor() {
    this.page = 1;
    // this.q = '';
    // this.perPage = options.params.per_page;
  }
  async fetchPhotos(query) {
    try {
      const response = await axios.get(
        `${BASE_URL}?q=${query}&page=${this.page}`,
        options
      );
      console.log('🚀  response.data', response.data);

      if (!response.data.totalHits) {
        throw new Error(response.status);
      }

      // this.incrementPage();
      return response.data;
    } catch (error) {
      return error;
    }
  }
  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }
}
