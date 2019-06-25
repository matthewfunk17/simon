gamePattern = [];

userClickedPattern = [];

var buttonColors = ["red", "blue", "green", "yellow"];

var started = false;

var level = 0


$(document).keypress(function() {
  if (!started) {
    nextSequence();
    started = true;
  }
});

function nextSequence() {
  $("h1").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);

  var randomChosenColor = buttonColors[randomNumber];

  gamePattern.push(randomChosenColor);

  $("#" + randomChosenColor).fadeOut(100).fadeIn(100);

  playSound(randomChosenColor);

  level = level + 1;
}

$(".btn").click(function(event) {
  var userChosenColor = $(event.target).attr("id");

  userClickedPattern.push(userChosenColor);

  checkAnswer(userClickedPattern.length - 1);

  playSound(userChosenColor);

  animatePress(userChosenColor);
});

function playSound(name) {

  var makeSound = new Audio("sounds/" + name + ".mp3");

  makeSound.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (gamePattern.length === userClickedPattern.length) {
      setTimeout(function() {
        nextSequence();
        userClickedPattern = [];
      }, 1000);
    }
  } else {
    var wrongAudio = new Audio("sounds/wrong.mp3");

    wrongAudio.play();

    $("body").addClass("game-over");

    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);

    $("h1").text("Game Over, Press Any Key to Restart");

    startOver();
  }
}

function startOver() {
  userClickedPattern = []
  level = 0;
  gamePattern = [];
  started = false;
}
