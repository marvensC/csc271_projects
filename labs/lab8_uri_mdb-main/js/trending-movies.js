/* TO DO:

	- Create an array to hold the titles of your favorite movie *and* your partners' favorite movies.

	- Create an array with URLs for each movie poster. 
	  Note: Search Google Images for the movie title with "wiki" (i.e., "Mean Girls wiki") to find the official poster on Wikipedia.
	
	- Create an array with links to the HTML files for each movie page.
	  Note: Name each HTML file after the movie title (e.g., mean-girls.html). 
            Make sure your partners’ movie pages are live before adding links to their favorites.

	- Create an array to store each movie's rating (1 to 5). Try a different rating for each movie!

*/

var movies = [ "Twilight", "Superman", "Lord of the Rings"]
var movie_images = [ " https://m.media-amazon.com/images/M/MV5BMTQ2NzUxMTAxN15BMl5BanBnXkFtZTcwMzEyMTIwMg@@._V1_.jpg",
										"https://m.media-amazon.com/images/M/MV5BOGMwZGJiM2EtMzEwZC00YTYzLWIxNzYtMmJmZWNlZjgxZTMwXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
										"https://m.media-amazon.com/images/M/MV5BNzIxMDQ2YTctNDY4MC00ZTRhLTk4ODQtMTVlOWY4NTdiYmMwXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg"
]
var movie_links = [
	"superman.html",
	"twilight.html",
	"lotr.html"
]

var movie_rating = [
	3, 5, 5
]

/* TO DO:
	
	- Select ALL movie card elements in the index.html file and store in a variable.

	- Loop through each card to update its content with movie information:
	  - Select the current movie image element. 
	  - Set its link to the movie poster link from the array. 
	  - Set its alt text to the movie title from the array. 

	  - Select the current movie link element.
	  - Set its link to the HTML page for that movie from the array. 
	  - Set its text to the movie title from the array.

	  - Select the current movie rating element.
	  - Create a variable that will hold the filled and empty stars. 
	  - Loop to generate star symbols based on the rating:
	    - If current counter is less than the rating, then add "★".
	    - Otherwise, add "☆".
	  - Set the movie rating element's text to display the generated stars. 

*/

const movieCards = document.querySelectorAll(".movie-card");





for (var i =0 ; i < movieCards.length ; i++){

	let img = movieCards[i].querySelector(".movie-image");

	img.src =movie_images[i];
	img.alt = movies[i];


	let link = movieCards[i].querySelector(".movie-link");
	link.href = movie_links[i];

	link.innerHTML = movies[i];


	let ratings = movieCards[i].querySelector(".rating");


	var stars="";

	for (let j =1;  j < 5; j++) {

		if (j <= movie_rating[i]){
			stars +=("★");

		}else {
			stars += ("☆");
		}
	}


	ratings.innerHTML = stars;

}
