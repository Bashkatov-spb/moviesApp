const apiKey = 'e3e2598535421797b16e6b080cd5b8a6';

export default class SwapiService {
  async getResource(url) {
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(res.status);
    }
    return await res.json();
  }

  guestSession = () => {
    return this.getResource(`https://api.themoviedb.org/3/authentication/guest_session/new?api_key=${apiKey}`);
  };

  getRatedFilms = (id) => {
    return this.getResource(
      `https://api.themoviedb.org/3/guest_session/${id}/rated/movies?api_key=${apiKey}&language=en-US&sort_by=created_at.asc`
    );
  };

  rateFilm = async (rate, sessionId, movieId) => {
    const vote = {
      value: rate,
    };
    await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/rating?api_key=${apiKey}&guest_session_id=${sessionId}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(vote),
      }
    );
  };

  getGenres = () => {
    return this.getResource(`https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US`);
  };

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
