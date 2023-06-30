import axiosAtelier from '../../../axiosAtelier.js';

const baseURL = process.env.REACT_APP_API_BASE_URL;

class Cache {
  constructor() {
    this.cache = {};
  }

  get(url) {
    if (this.cache[url] && this.cache[url].expires > Date.now()) {
      return Promise.resolve(this.cache[url].data); // Return cached data
    }
    return null; // Cache miss
  }

  set(url, data, expiresInMinutes = 10) {
    this.cache[url] = {
      data: data,
      expires: Date.now() + expiresInMinutes * 60 * 1000 // Set expiration time
    };
  }
}

const cache = new Cache();

export function getProductDetails(str) {
  const url = baseURL + "products/" + str.toString();
  const cachedData = cache.get(url);

  if (cachedData) {
    return Promise.resolve(cachedData);
  }

  return axiosAtelier.get(url)
    .then(dataMap)
    .then(response => {
      cache.set(url, response);
      return response;
    });
}

export function getImages(obj) {
  const url = baseURL + "products/" + obj.id.toString() + "/styles";
  const cachedData = cache.get(url);

  if (cachedData) {
    return Promise.resolve(cachedData);
  }

  return axiosAtelier.get(url)
    .then(dataMap)
    .then(response => {
      cache.set(url, response);
      return response;
    });
}

export function getReviews(obj) {
  const url = baseURL + "reviews/meta/?product_id=" + obj.id.toString();
  const cachedData = cache.get(url);

  if (cachedData) {
    return Promise.resolve(cachedData);
  }

  return axiosAtelier.get(url)
    .then(dataMap)
    .then(response => {
      cache.set(url, response);
      return response;
    });
}

export function dataMap(response) {
  return response.data;
}

export function getRelated(str) {
  const url = baseURL + "products/" + str.toString() + "/related";
  const cachedData = cache.get(url);

  if (cachedData) {
    return Promise.resolve(cachedData);
  }

  return axiosAtelier.get(url)
    .then(dataMap)
    .then(response => {
      cache.set(url, response);
      return response;
    });
}
