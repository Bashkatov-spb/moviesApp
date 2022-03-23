const API_KEY = 'api_key=e3e2598535421797b16e6b080cd5b8a6';
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&' + API_KEY

/* https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=e3e2598535421797b16e6b080cd5b8a6 */

export default class SwapiService {

  async getResource(url) {
    const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`Could not fetch ${url}, recivied ${res.status}`); 
  }
  return await res.json();
  }

  async getMostPopularMovies() {
    const res = await this.getResource(API_URL)
    return res.results;
  }
}
