
// Show object model
export class Show {
       constructor({ id, title, year, seasons, genres, poster, trailer, rating, description }) {
	       this.id = id;
	       this.title = title;
	       this.year = year;
	       this.seasons = seasons;
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
				       alert(`${this.title} (${this.year})\nSeasons: ${this.seasons}\nGenres: ${this.genres.join(", ")}\nRating: ${this.rating}\n${this.description}`);
			       }
		       }
}


const demoShow1 = new Show({
	id: "the-mentalist",
	title: "The Mentalist",
	year: 2008,
	seasons: 7,
	genres: ["Drama"],
	poster: "images/the_mentalist_poster.webp",
	trailer: "https://www.youtube.com/embed/tCpWApgVqbc",
	rating: 8.2,
	description: "A former psychic uses his keen observation skills to solve crimes for the CBI."
});

const demoShow2 = new Show({
	id: "game-of-thrones",
	title: "Game of Thrones",
	year: 2011,
	seasons: 6,
	genres: ["Drama"],
	poster: "images/game_of_thrones_poster.webp",
	trailer: "https://www.youtube.com/embed/bjqEWgDVPe0",
	rating: 9.2,
	description: "Nine noble families fight for control over the lands of Westeros, while an ancient enemy returns."
});


