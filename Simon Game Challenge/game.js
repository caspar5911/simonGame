function startOver() {
    level = 0;
    toggle = false;
    gamePattern = [];
    userClickedPattern = [];
    $("#level-title").html("Game Over, Press Any Key to Restart");

}


function nextSequence() {
    //generate random color
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).animate({ "opacity": 0 }, 200).animate({ "opacity": 100 }, 200);
    playSound(randomChosenColour);

    //level of stages
    level++;
    $("#level-title").html("Level " + level);
}

//Color Sound
function playSound(name) {

    switch (name) {
        case "red":
            var audio = new Audio('sounds/red.mp3');
            audio.play();
            break;
        case "blue":
            var audio = new Audio("sounds/blue.mp3");
            audio.play();
            break;
        case "green":
            var audio = new Audio("sounds/green.mp3");
            audio.play();
            break;
        case "yellow":
            var audio = new Audio("sounds/yellow.mp3");
            audio.play();
            break;
        case "wrong":
            var audio = new Audio("sounds/wrong.mp3");
            audio.play();
            break;
        default:
            alert("error");
            break;
    }
}

//Animation when button pressed
function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColour).removeClass("pressed")
    }, 100);
}

function checkAnswer(currentLevel) {
    var count = 0;

    for (var i = 0; i < userClickedPattern.length; i++) {
        if (gamePattern[i] === userClickedPattern[i]) {
            count++;
        } else {
            startOver();
            playSound("wrong");
            $("body").addClass("game-over");
            setTimeout(function() {
                $("body").removeClass("game-over")
            }, 200);
            break;

        }

        if (count === currentLevel) {
            count = 0;
            userClickedPattern = [];
            setTimeout(function() { nextSequence(); }, 1000)
        }

    }
}



var gamePattern = [];
var userClickedPattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var toggle = false;
var level = 0;

//Initiate start of game
$(document).on("keydown", function() {
    if (toggle === false) {
        nextSequence();
        toggle = true;
    }
});

//user button select
var userChosenColour;
$(".btn").on("click", function(event) {
    userChosenColour = event.currentTarget.id;
    userClickedPattern.push(userChosenColour);
    checkAnswer(level);
    animatePress(userChosenColour);
    playSound(userChosenColour);
});