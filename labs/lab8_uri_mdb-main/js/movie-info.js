/* TO DO:

    - Create an array to hold the title of your favorite movie, URL for movie poster, your rating, and synopsis.

    - Select the movie image element.
    - Set its link to the movie poster link from the array. 
    - Set its alt text to the movie title from the array.

    - Select the movie name element.
    - Set its text to the movie title from the array.

    - Select the movie description element.
    - Set its text to the movie synopsis from the array.

    - Select the movie rating element.
    - Create a variable that will hold the filled and empty stars. 
    - Loop to generate star symbols based on the rating:
        - If current counter is less than your rating, then add "★".
        - Otherwise, add "☆".
    - Set the movie rating element's text to display the generated stars. 

*/


var movieinfo =[
 "Superman",
 "https://m.media-amazon.com/images/M/MV5BOGMwZGJiM2EtMzEwZC00YTYzLWIxNzYtMmJmZWNlZjgxZTMwXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
 5, 
 "Superman must reconcile his alien Kryptonian heritage with his human upbringing as reporter Clark Kent. As the embodiment of truth, justice and the human way he soon finds himself in a world that views these as old-fashioned"
]

document.querySelector("img.movie-image").src=movieinfo[1];
document.querySelector("img.movie-image").alt=movieinfo[0];
document.querySelector("h2.movie-name").innerHTML = movieinfo[0];
document.querySelector("p.description").innerHTML = movieinfo[3];


//stars
var stars="";
   
for(let j = 0; j < 5; j++){
    if(j < movieinfo[2]){
        stars+=("★");
    } else {
        stars+=("☆");
    }
}
document.querySelector("div.rating").innerHTML=stars;