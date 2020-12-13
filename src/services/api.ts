import axios from 'axios';

const baseURL = 'http://167.71.26.220';
// const baseURL = 'http://192.168.0.102:3333';
const api = axios.create({
  baseURL,
});

export const image = (img: string) => {
  if (img?.startsWith(baseURL)) {
    return img;
  }

  return `${baseURL}/files/${img}.jpg`;
};

export default api;
