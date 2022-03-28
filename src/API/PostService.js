export default class SwapiService {
  async getResource(url) {
    const res = await fetch(url);

    return res.json();
  }

  async getGenres() {
    const res = await fetch(
      'https://api.themoviedb.org/3/genre/movie/list?api_key=e3e2598535421797b16e6b080cd5b8a6&language=en-US'
    );
    return await res.json();
  }

  async getFilmById(id) {
    return await this.getResource(
      `https://api.themoviedb.org/3/movie/${id}?api_key=e3e2598535421797b16e6b080cd5b8a6&language=en-US`
    );
  }

  async searchFilms(name, page) {
    return await this.getResource(
      `https://api.themoviedb.org/3/search/movie?api_key=e3e2598535421797b16e6b080cd5b8a6&language=en-US&query=${name}&page=${page}&include_adult=false`
    );
  }
}
