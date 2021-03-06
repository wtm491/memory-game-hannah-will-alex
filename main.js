//document ready jquery
$(() => {
    //variables declared/initialized 
    let totalSeconds = 0;
    let totalMinutes = 0;
    let interval, cardOne, cardTwo, selectedCardOne, selectedCardTwo, timeout;
    let clickCount = 0;
    let countDown = 5;
    let flag = false;
    let cardsMatched = 0;
    let gameWon = false;
    let gameChoice = null;

//this is called once user wins based on light or darkside choice
//this will also show the video based on side
    function displayEndVideo() {
        if (gameChoice === 'lightside') {
            $('.end-video2').css('display', 'flex');
            $('.dark-container').css('display', 'none');
            $('.light-container').css('display', 'none');
    

        } else if (gameChoice === 'darkside') {
            $('.end-video1').css('display', 'flex');
            $('.dark-container').css('display', 'none');
            $('.light-container').css('display', 'none');
          

        }
    }

    //displays timer in the DOM
    function domTimer() {
        $(`.timer`).text(`Timer: ${totalMinutes}:${totalSeconds}`);
    };

    //displays the count down timer in DOM
    function domCountDown() {
        $(`.timer`).text(`Game Begins in: ${countDown} Seconds`);
    }

    //Keeps track of time it takes user to complete game
    //called in the delayStart function to start clock
    function setTime() {
        //increments timer
        ++totalSeconds;
        //temporarily stops timer at 5 seconds for my sanity
        if (totalSeconds === 59) {
            totalMinutes += 1;
            totalSeconds = 0;
        }

        //stops timer when game is won
        if (gameWon === true) {
            return;
        }
        //calls function to display timer in DOM
        domTimer();
    };

    //function to start game after 30 seconds- gives user time to memorize cards before they flip
    function delayStart() {
        flag = true;
        clickCount = 0;

        //event listener to flip card animation on click
        $('.flip-card').click(function () {
            $(this).toggleClass('active');
        });

        //start in-game timer
        interval = setInterval(setTime, 1000);
        //flip cards back to hidden
        flipCards($('.flip-card'));
    };

    //function to decrement count down timer
    function countDownTimer() {
        if (countDown != 0) {
            --countDown;
        } else {
            //when timer hits 0, exits function (avoids infinite counting)
            return;
        }
        //calls function to insert countdown timer into DOM
        domCountDown();
    };

    //compares cards based on the src, finds correctly matching cards
    function compareCards(e) {
        //track number of clicks
        ++clickCount;
        //limit click count to 2
        while (clickCount > 2) {
            clickCount = 0;
            ++clickCount;
        }

    //flag checks if game has started
    if (flag === true) {

        //sets the first selected card to variable
    if (clickCount === 1) {
        console.log(e);
        cardOne = e.currentTarget.children[1].firstElementChild.attributes[1].nodeValue;
        console.log(cardOne);
        selectedCardOne = e.delegateTarget.offsetParent;
    //sets the second selected card to variable

    } else {
        cardTwo = e.currentTarget.children[1].firstElementChild.attributes[1].nodeValue;

        selectedCardTwo = e.delegateTarget.offsetParent;
    // selectedCardTwoAccurate = e.delegateTarget .offsetParent.className;

    }
    //checks cards for match, mismatch, or duplicate selection
    if (clickCount === 2) {
        if (selectedCardOne != selectedCardTwo) {   
            if (cardOne === cardTwo) {
            cardsMatched++;
            //Replace gifs with chekcs on match - LightSide
            if(cardOne === "yoda.gif"){
                $(".yodagif").attr("src", "check.jpg");
            }
            if(cardOne === "hangif.gif"){
                $(".hangif").attr("src", "check.jpg");
            }
            if(cardOne === "leia-gif.gif"){
                $(".leiagif").attr("src", "check.jpg");
            }
            if(cardOne === "lightsaber.gif"){
                $(".lightsabergif").attr("src", "check.jpg");
            }
            if(cardOne === "obi.gif") {
                $(".obigif").attr("src", "check.jpg");
            }
            //Replace gifs with checks on match - Darkside
            if(cardOne === "forseen.webp"){
                $(".forseengif").attr("src", "check.jpg");
            }
            if(cardOne === "trooper.gif") {
                $(".troopergif").attr("src", "check.jpg");
            }
            if(cardOne === "darthvader.gif"){
                $(".vadergif").attr("src", "check.jpg");
            }
            if(cardOne === "force.gif"){
                $(".forcegif").attr("src", "check.jpg");
            }
            if(cardOne === "starship.gif"){
                $(".starshipgif").attr("src", "check.jpg");
            }

    } else {
        //flips cards back to hidden after 1 second delay
        setTimeout(() => {
            flipCards(selectedCardOne);
            flipCards(selectedCardTwo);
        }, 1000);
    }
    } else {
    alert(`Can't select the same card!`);
    }
    }

    } else {
        console.log(`game has not started`);
    }
    //Check to see if the user has won the game
    if (cardsMatched === 5) {
        gameWon = true;
        console.log("You won the game!");
        displayEndVideo();
    }
        };

        //function to flip all cards at beginning
        function flipCards(target) {
            $(target).toggleClass('active');
        };


        //event listener to flip card animation on click
        $('.flip-card').click(function() {
            $(this).toggleClass('active');
        });


    
    // this is the function for the pop up & 
    // to decide either to be lightside or darkside
    // starts game

        var id = '#dialog';

        //Get the window height and width
        var winH = $(window).height();
        var winW = $(window).width();
            
        //Set the popup window to center of screen
        //refresh with difference in screen size
        //tried flexing in css, but ran into conflicts
        // with it not appearing as a popup
        $(id).css('top',  winH/2-$(id).height()/2);
        $(id).css('left', winW/2-$(id).width()/2);

        //transition effect
        $('#dialog').fadeIn(3000); 	

        
        

        //if lightside button is clicked
    $('#lightside').click(function (e) {
        gameChoice = 'lightside';
        var audio = document.getElementById("audio");
        audio.play();
        $('#popup').css('display', 'none');   
        $('#falcon').css('display', 'none');

        console.log(`Game Starting, 30 second delay started`); 
    
        $('.light-container').css('display', 'flex');
        $('.Start-Reset').css('display', 'flex');
        
        //function to delay start of game by 30 seconds
        setTimeout(delayStart, 5000);
        //Countdown 30 second timer before game start
        timeout = setInterval(countDownTimer, 1000);

        $('.card-container').css('display', 'flex');
        $('.end-video1').css('display', 'none');
        $('.end-video2').css('display', 'none');
        //flip cards to memorize
        flipCards($('.flip-card'));
        //prevents user from selecting cards before game starts
        $(`.flip-card`).unbind(`click`);
        //disables start button while game is running
        $(`#Start`).attr("disabled", true);
        //enables reset button
        $(`#Reset`).attr("disabled", false);
    });


    //if darkside button is clicked
    $('#darkside').click(function (e) {

        gameChoice = 'darkside';
        
        var audio2 = document.getElementById("audio2");
        audio2.play();

        $('#popup').css('display', 'none');
        $('#falcon').css('display', 'none');

        $('.dark-container').css('display', 'flex');
        $('.Start-Reset').css('display', 'flex');

        //function to delay start of game by 30 seconds
        setTimeout(delayStart, 5000);
        //Countdown 30 second timer before game start
        timeout = setInterval(countDownTimer, 1000);

        $('.card-container').css('display', 'flex');
        $('.end-video1').css('display', 'none');
        $('.end-video2').css('display', 'none');
        //flip cards to memorize
        flipCards($('.flip-card'));
        //prevents user from selecting cards before game starts
        $(`.flip-card`).unbind(`click`);
        //disables start button while game is running
        $(`#Start`).attr("disabled", true);
        //enables reset button
        $(`#Reset`).attr("disabled", false);
            

    });	



    //reset game event listener
    $(`#Reset`).on(`click`, (e) => {
        //pause timer
        clearInterval(interval);
        //pause countdown
        clearInterval(timeout);
        //reset timer
        totalSeconds = 0;
        totalMinutes = 0;
        cardsMatched = 0;
        //reset timer in dom
        domTimer();

         //flip the cards back
         flipCards($(`.flip-card.active`));

         //Reset gifs
        $(".yodagif").attr("src", "yoda.gif");
        $(".hangif").attr("src", "hangif.gif");
        $(".leiagif").attr("src", "leia-gif.gif");
        $(".lightsabergif").attr("src", "lightsaber.gif");
        $(".obigif").attr("src", "obi.gif");
        $(".forseengif").attr("src", "forseen.webp");
        $(".troopergif").attr("src", "trooper.gif");
        $(".vadergif").attr("src", "darthvader.gif");
        $(".forcegif").attr("src", "force.gif");
        $(".starshipgif").attr("src", "starship.gif");
    
        //reset count down
        countDown = 5;
        //re=displays countdown in dom
        domCountDown();
        //enables start button
        $(`#Start`).attr("disabled", false);
        //disableds reset button
        $(`#Reset`).attr("disabled", true);
        //brings up game choice for dark/light
        $('#popup').css('display', 'flex');
        //hides previous selected cards
        $('.dark-container').css('display', 'none');
        $('.light-container').css('display', 'none');
        $('.end-video1').css('display', 'none');
        $('.end-video2').css('display', 'none');  
        $('.Start-Reset').css('display', 'none');
  
        //resets game won to false
        gameWon = false;


        

    });
    //disableds reset button
    $(`#Reset`).attr("disabled", true);

    //event listener for user card selection
    $(`.flip-card-inner`).on(`click`, (e) => {
        //compare cards on click
        compareCards(e);

        //plays audio on click
        // var audio = document.getElementById("audio");
        // audio.play();
    });


    // this is the curser for the millenium falcon
    var div = document.getElementById('falcon');
        document.addEventListener('mousemove',function(e) {			
            div.style.left = e.pageX+"px";
            div.style.top = e.pageY+"px";
        });
        
    });



        // function shuffle(array) {
        //     let length = array.length;
        //     let random;
        //     let index;

        // // While there are elements in the array
        //     while (length > 0) {
        // // Pick a random index
        //         index = Math.floor(Math.random() * length);
        // // Decrease length by 1
        //         length--;
        // // Swap the array elements 
        //         random = array[length];
        //         array[length] = array[index];
        //         array[index] = random;
        //     }
        //     //Return a random element
        //     return random;
        // }

    // $(document).ready(function(){
    //     setTimeout(function(){
    //        PopUp();
    //     },5000); // 5000 to load it after 5 seconds from page load
        // });
