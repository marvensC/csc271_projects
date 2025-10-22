var zodiacSign = "Sagittarius";
var birthmonth = "December";
var birthday = 10;
var luckynum = 10;
var horoscope = " What makes Sagittarius so unique is its dynamic blend of passion, curiosity, intensity, and adaptability Represented by the archer (a half-man, half-horse centaur), Sagittarius isn't afraid to use its bow and arrow to explore expansive terrain, seeking answers in places and spaces others wouldn't dare venture."
var belief = false;



document.getElementById("sign").innerHTML= zodiacSign;
document.getElementsByClassName("birthday")[0].innerHTML= "Birthday: " + birthday +  " "+ birthmonth;
document.getElementsByClassName("luckyNum")[0].innerHTML= "Lucky Number :" + luckynum;
document.getElementsByTagName("p")[0].innerHTML = "Horoscope: " + horoscope;
document.getElementsByTagName("p")[1].innerHTML += belief ? " I believe in astrology " :"I don't believe in astrology";


var moodrating_sagittarius = 5;
var moodrating_cancer = 4.6;
var moodrating_aries = 4.2;

var average = (moodrating_aries + moodrating_sagittarius + moodrating_cancer)/3;

document.getElementsByTagName("p")[2].innerHTML = "Today's mood rating for " + zodiacSign + ": " + moodrating_sagittarius + " out of 5. Average mood rating: " + average;



var signs = [ "Capricorn", "Aquarius", "Pisces", "Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo", "Libra", "Scorpio", "Sagittarius"];
var arr_my_sign = signs[11];
var partner1_sign = signs[3];
var partner2_sign = signs[6];

var horoscope_desc = [
"Today is a day for new beginnings. Embrace change and seize opportunities.", 
"Your determination will lead to success today. Stay focused on your goals.",
"Communication is key today. Express yourself clearly and listen to others." ,
"Trust your intuition. It will guide you in making the right decisions.",
"Your creativity shines today. Use it to inspire and lead others. ",
"Pay attention to the details. Your meticulous work will pay off.",
"Balance is essential. Find harmony in all aspects of your life.",
"Embrace transformation. Let go of what no longer serves you. ",
"Adventure awaits. Explore new horizons and expand your horizons.",
"Hard work leads to success. Keep pushing toward your goals.",
"Your unique perspective is an asset. Share your ideas with others.",
"Trust your emotions. They will guide you in making the right choices."

]

var my_desc= horoscope_desc[9];
var partner1_desc = horoscope_desc[4];
var partner2_desc = horoscope_desc[1];


document.getElementsByTagName("p")[3].innerHTML = " My zodiac sign is: "+ arr_my_sign + ". Emmanuel’s zodiac sign is: " + partner1_sign +". Brandon’s zodiac sign is: "+ partner2_sign +"."

document.getElementsByTagName("p")[4].innerHTML = arr_my_sign + " horoscope: " + my_desc + "\n" 
document.getElementsByTagName("p")[5].innerHTML =  partner1_sign + " horoscope : " + partner1_desc + "\n"  
document.getElementsByTagName("p")[6].innerHTML = partner2_sign + " horoscope : " + partner2_desc + "\n"  