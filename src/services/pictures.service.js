import axios from 'axios';

const picturesService = axios.create({
  baseURL: 'https://pixabay.com/api/',
  params: {
    image_type: 'photo',
    orientation: 'horizontal',
    per_page: 12,
    key: '32626693-37bc96ab6bf8bfcf28c619d39',
  },
});

export const getPictures = async (q, page) => {
  const { data } = await picturesService.get('', {
    params: { q, page },
  });
  return data;
};
