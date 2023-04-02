import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '33441417-95384e2574ef1faadfd151af8';

const options = {
  params: {
    key: API_KEY,
    image_type: 'photo',
    orientation: 'horizontal',
    per_page: 12,
  },
};
export default async function fetchPhotos(query, page) {
    const response = await axios.get(
        `${BASE_URL}?q=${query}&page=${page}`,
        options
      );
      console.log('🚀  response.data', response.data);

    if (response.data.hits.length===0) {
        throw new Error(response.status);
      }
      return response.data;
  }

