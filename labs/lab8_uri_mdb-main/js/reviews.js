/* TO DO:

	- Create an array to hold three different usernames. 

	- Create an array with the dates of each review (i.e., 2024-10-30).

	- Create an array to hold the actual reviews. 

	- Create an array to hold three different ratings. 

*/

/* TO DO:

	- Select ALL review card elements and store in a variable.

	- Loop through each card to update its content with review information:
	  - Select the current review rating element.
	  - Create a variable that will hold the filled and empty stars. 
	  - Loop to generate star symbols based on the rating:
	    - If current counter is less than the rating, then add "★".
	    - Otherwise, add "☆".
	  - Set the review rating element's text to display the generated stars.
	  - Set the review rating element's attribute to current rating from the array. 

	  - Select the current review username element.
	  - Set its text to the username from the array and add a space to separate it from the date.

	  - Select the current review date element.
	  - Set its markup to the date from the array.

	  - Select the current review text element.
	  - Set its text to the review text from the array.
 
*/


var usernames=[
	"u1", "u2","u3"
];


let dates = ["2024-10-30","2025-10-09","2024-12-30"];

var reviews = [" good movie", "I liked the characters", " Good experience"];

let ratings = [4,5,5];

let cards =  document.querySelectorAll(".review-card");

for (var i=0; i <cards.length; i++){
	let ratings = cards[i].querySelector(".review-rating");

	//stars
var stars="";
   
for(let j = 0; j < 5; j++){
    if(j < movieinfo[2]){
        stars+=("★");
    } else {
        stars+=("☆");
    }
}


	ratings.innerHTML = stars;

	ratings.setAttribute("data-rating", ratings[i]);

	cards[i].querySelector("p.review-username").firstChild.nodeValue = usernames[i] +" ";

	cards[i].querySelector("span.review-date").innerHTML= dates[i];
	cards[i].querySelector("p.review-text").innerHTML = reviews[i];
}




// Get the dropdown element for filtering ratings by its ID
var filterDropdown = document.getElementById('rating-filter');

// Add an event listener to the dropdown that triggers when the selected option changes
filterDropdown.addEventListener('change', function() {
   	
   	// Store the currently selected rating from the dropdown
    var selected_rating = filterDropdown.value;


    /* TO DO:

		- Loop through each card:
		  - Select the current review rating element.
		  - Get its rating attribute value.

		  - Check if the selected rating is 'All' or matches the card's rating.
		  	- If it matches, display the card.
		  	- Otherwise, hide the card

	*/


	let allCards = document.querySelectorAll("div.review-card");

	for (let i =0; i < allCards.length; i++){
		let rating = cards[i].querySelector("div.review-rating");
		let curRating = rating.getAttribute("data-rating");

		if(selected_rating == 'All' || selected_rating == curRating){
            cards[i].style.display = "block";
        } else {
            cards[i].style.display = "none";
        }
    }


});


