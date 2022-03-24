export default class SwapiService {
  async getResource(url) {
    const res = await fetch(url);

    return res.json();
  }

  async fetchTopRatedFilms(page) {
    return await this.getResource(
      `https://api.themoviedb.org/3/movie/top_rated?api_key=e3e2598535421797b16e6b080cd5b8a6&language=en-US&page=${page}`
    );
  }

  async searchFilms(name, page) {
    return await this.getResource(
      `https://api.themoviedb.org/3/search/movie?api_key=e3e2598535421797b16e6b080cd5b8a6&language=en-US&query=${name}&page=${page}&include_adult=false`
    );
  }
}
