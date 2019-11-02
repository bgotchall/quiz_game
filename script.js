// From scratch, build a timer-based quiz application that stores high scores client-side. Following the common templates for user stories, we can frame this challenge as follows:

// As a coding bootcamp student
// I want to take a timed quiz on JavaScript fundamentals that stores high scores
// so that I can gauge my progress compared to my peers
// How do you deliver this? Here are some guidelines:

// Play proceeds as follows:

// The user arrives at the landing page and is presented with a call-to-action to "Start Quiz." Also note the navigation option to "View Highscores" and the "Time" value set at 0.

// Clicking the "Start Quiz" button presents the user with a series of questions. The timer is initialized with a value and immediately begins countdown.

// Score is calculated by time remaining. Answering quickly and correctly results in a higher score. Answering incorrectly results in a time penalty (for example, 15 seconds are subtracted from time remaining).

// When time runs out and/or all questions are answered, the user is presented with their final score and asked to enter their initials. Their final score and initials are then stored in localStorage.

// Your application should also be responsive, ensuring that it adapts to multiple screen sizes.

// Refer to the animated GIF below for a demonstration of the application functionality.

var questions2 = [
  {
    title: "Commonly used data types DO NOT include:",
    choices: ["strings", "booleans", "alerts", "numbers"],
    answer: "alerts"
  },
  {
    title: "The condition in an if / else statement is enclosed within ____.",
    choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
    answer: "parentheses"
  },
  {
    title: "The shortest Month",
    choices: ["Febrary", "March", "July", "December"],
    answer: "Febrary"
  }
];

var high_scores_El = document.getElementById("hi_scores");
var time_remaining_El = document.getElementById("time_remaining");
var content_box_El = document.getElementById("boundary_box");
var answer1_El = document.getElementById("answer1");

var score= 75;
var q=0;
var running = false; //if the timer is running
var showing_result = 0;
time_remaining_El.textContent = "Time: " + score;

// $("#start_button").on("click", function() {
//   //start button just kicks off the timer and paints the first question since it
//   //is the first one without a previous answer.
//   running = true;
//   do_a_question();
// }); //start button

initialize_game(); //draw the start page

function start_game() {
  running = true;
  do_a_question();
}

function do_a_question() {
  $("#boundary_box").empty();
  var new_header = $("<h1></h1>");
  new_header.text(questions2[q].title);
  new_header.addClass("question");
  console.log("new header is", new_header);
  $("#boundary_box").append(new_header);

  for (i = 0; i < 4; i++) {
    var new_button = $("<button>");
    $(new_button).addClass(
      "btn btn-primary btn-sm button_show question_button"
    );
    $(new_button).text(i + ": " + questions2[q].choices[i]);
    $(new_button).attr("choice", questions2[q].choices[i]);
    $(new_button).on("click", check_answer);
    $("#boundary_box").append(new_button);
  }
} // do a question

high_scores_El.addEventListener("click", function() {
  draw_score_page();
});

interval = setInterval(function() {
  //this is the engine of the game.  the other functions set flags that affect this.
  if (running) {
    score--;
    renderTime();
    if (score == 0) {
      running = false;
    }
    if (showing_result > 0) {
      showing_result--;

      if (showing_result == 0) {
        //get rid of the result after 2 ticks
        $("#result_id").delete;
        $("#hr").delete;
        if (q == questions2.length) {
          all_done();
        } else {
          do_a_question();
        }
      } //if showing result
    } //if running
  }
}, 1000);

function renderTime() {
  time_remaining_El.textContent = "Time: " + score;
}

function all_done() {
  running = false;
  $("#boundary_box").empty();

  var new_header = $("<h1></h1>");
  new_header.text("All Done!");

  //new_header.addClass("question");
  //console.log("new header is", new_header);
  $("#boundary_box").append(new_header);

  var my_string = "<p>Your final score is " + score + "</p>";
  var new_p = $(my_string);
  console.log(my_string);
  $("#boundary_box").append(new_p);
  my_string = "<p>Enter initials</p>";
  var new_p = $(my_string);
  $("#boundary_box").append(new_p);

  var my_text_box = $(
    '<input id="text_box"  type="text" name="Initials"  ></input>'
  );
  $("#boundary_box").append(my_text_box);

  var new_button = $("<button>");
  $(new_button).addClass("btn btn-primary btn-sm button_show question_button");
  //$(new_button).addId("submit_button");
  $(new_button).text("submit");
  $(new_button).on("click", add_score);
  $("#boundary_box").append(new_button);
}

function check_answer() {
  if (showing_result == 0) {
    //if the answer is being shown, freeze out clicks
    var new_string = $(this).attr("choice");
    $("#boundary_box").append("<hr>");
    console.log(questions2[q].answer);
    console.log(new_string);
    console.log(q);

    if (questions2[q].answer === new_string) {
      console.log("correct");
      $("#boundary_box").append("<p >Correct</p>");
    } else {
      console.log("wrong");
      $("#boundary_box").append('<p id="result_id">Incorrect, sorry</p>');
      score = score - 15;
    }
    q++;
    showing_result = 2; //show the result for 2 ticks
  } //if showing answer
} //check_answer

function add_score() {
  var my_thing = document.getElementById("text_box");
  console.log(my_thing.value); //I couldn't get the jquery one to work
  // do local memory stuff and call and keep a list of high scores.
  var thing=localStorage.getItem
 
  var my_array_of_scores=[];    
  my_array_of_scores.push(  JSON.parse(localStorage.getItem("high_scores"))); //get the previous scores
  console.log("the existing list:"+ my_array_of_scores);    
  
  my_array_of_scores.push(my_thing.value);  //add the new score
  my_array_of_scores.push(score);
  console.log("the list with new things added:" +my_array_of_scores);
  my_array_of_scores=sort_array(my_array_of_scores);    //sort them highest to lowest
  //store the big array
  localStorage.setItem("high_scores", JSON.stringify(my_array_of_scores));
  draw_score_page();
}

function draw_score_page(){
  //draw the scores, add a clear button and a new game button
  var my_array_of_scores=[];
  my_array_of_scores.push(  JSON.parse(localStorage.getItem("high_scores"))); //get the previous scores
  $("#boundary_box").empty();

  console.log("in the draw page functin, here is the array I am working on:"+my_array_of_scores);
  //do one score to test:
  var new_thing=$("<p></p>");
  new_thing.text(my_array_of_scores[0]);
  $("#boundary_box").append(new_thing);
  new_thing=$("<p></p>");
  new_thing.text(my_array_of_scores[1]);
  $("#boundary_box").append(new_thing);
  new_thing = $('<button type="button" id="start_button" class="btn btn-primary btn-sm">Clear High Scores</button>' );
  new_thing.on("click", clear_high_scores);
  $("#boundary_box").append(new_thing);
  new_thing = $('<button type="button" id="start_button" class="btn btn-primary btn-sm">Go Back</button>' );
  new_thing.on("click", initialize_game);
  $("#boundary_box").append(new_thing);

}

function initialize_game() {
  //draw the instructions and the start button:
  //alert("initializing game.  at the very start and after entering initials");
  q=0;
  score=75;
  $("#boundary_box").empty();
  renderTime();
  

  var new_thing = $("<h1>Coding Quiz Challenge</h1>");
  $("#boundary_box").append(new_thing);
  new_thing = $( "<p>Try to answer the following code-related questions within the time limit.  Keep in mind that incorrect answers will penalize your score Time by ten seconds!</p>");
  $("#boundary_box").append(new_thing);
  new_thing = $('<button type="button" id="start_button" class="btn btn-primary btn-sm">Start Quiz</button>' );
  new_thing.on("click", start_game);
  $("#boundary_box").append(new_thing);
  //localStorage.clear();
}


function sort_array(my_array){
//take an array wich is a list of initials,score pairs and sort them from highest to lowest, return that sorted array.
  // var pair
  // for (var i=0;i<my_array.length-1;i=i+2){


  // }

  return my_array;      //for now just return the unsorted list
}

function clear_high_scores(){
localStorage.clear();
draw_score_page();

}