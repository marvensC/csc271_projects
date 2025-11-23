// Movie object model
export class Movie {
  constructor({ id, title, year, genres, poster, trailer, rating, description }) {
    this.id = id;
    this.title = title;
    this.year = year;
    this.genres = genres;
    this.poster = poster;
    this.trailer = trailer;
    this.rating = rating;
    this.description = description;
  }

  showDetails() {
    if (typeof this.constructor.showMediaDetails === 'function') {
      this.constructor.showMediaDetails(this);
    } else {
      alert(`${this.title} (${this.year})\nGenres: ${this.genres.join(", ")}\nRating: ${this.rating}\n${this.description}`);
    }
  }
}

