import axios from 'axios';

const baseURL = 'http://167.71.26.220';
// const baseURL = 'http://192.168.0.120:3333';
const api = axios.create({
  baseURL,
});

export const image = (img?: string) => {
  if (!img) {
    return '';
  }

  if (img?.startsWith(baseURL)) {
    return img;
  }

  return `${baseURL}/files/${img}.jpg`;
};

export const flag = (img?: string) => {
  if (!img) {
    return '';
  }

  if (img?.startsWith(baseURL)) {
    return img;
  }

  return `${baseURL}/flags/${img}.png`;
};

export default api;
