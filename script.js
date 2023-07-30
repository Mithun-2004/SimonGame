const buttons = ["green", "red", "yellow", "blue"];
var gamePattern = [];
var userClickedPattern = [];

function nextSequence(){
    var randomNumber = Math.floor(Math.random()*4);
    var randomColor = buttons[randomNumber];
    gamePattern.push(randomColor);
    level = level + 1;
    $("h2").text("Level " + level);
    playSound(randomColor);
    $("#"+randomColor).fadeIn(100).fadeOut(100).fadeIn(100); 
    userClickedPattern = [];
}

function playSound(name){
    var audio = new Audio(`./sounds/${name}.mp3`);
    audio.play();
}

function checkAnswer(){
    flag = true;
    var i = 0;
    while (i < userClickedPattern.length){
        if (gamePattern[i] != userClickedPattern[i]){
            flag = false;
            break;
        }
        i++;
    }
    if (!flag){
        $("h2").text("Wrong. Press A Key To Restart");
        playSound("wrong");
        $("body").addClass("wrong");
        setTimeout(function(){
            $("body").removeClass("wrong");
        }, 250);
        started = false;
        level = 0;
        gamePattern = [];
    }else{
        if (i == level){
            setTimeout(function (){
                nextSequence()
            }, 500);
        }
    }
}

$(".box").click(function (){
    var colorPressed = this.id;
    playSound(colorPressed);
    userClickedPattern.push(colorPressed);
    $("#"+colorPressed).addClass("pressed");

    setTimeout(function(){
        $("#"+colorPressed).removeClass("pressed"); 
    },100);

    if (started){
        checkAnswer();
    }
});


var started = false;
var level = 0;
$(document).keypress(function(){
    if (!started){
        nextSequence();
        $("h2").text("Level " + level);
        started = true;
    }
})


