import axios from 'axios';

const API_KEY = '32551916-52acd45cb85fdadfb1e78d261';
const URL = `https://pixabay.com/api/`;
export const perPage = 12;

// https://pixabay.com/api/?q=cat&page=1&key=your_key&image_type=photo&orientation=horizontal&per_page=12

export const fetchImagesWithQuery = async (searchQuery, page = 1) => {
  const axiosParams = {
    key: API_KEY,
    q: searchQuery,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: perPage,
    page: page,
  };

  const response = await axios.get(URL, {
    params: axiosParams,
  });
  return response.data.hits;
};

export const handleFetchData = images => {
  return images.map(({ id, tags, webformatURL, largeImageURL }) => {
    return { id, tags, webImgURL: webformatURL, lgImgURL: largeImageURL };
  });
};

export default {
  fetchImagesWithQuery,
  handleFetchData,
};
