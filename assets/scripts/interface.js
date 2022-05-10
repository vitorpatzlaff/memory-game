document.addEventListener("DOMContentLoaded", () => {
    initialize();
});

function initialize(){
    const stage = document.getElementById("stage");

    stage.innerHTML = "";
    stage.style.zIndex = "0";

    const cardPositions = genPositions();

    genCards(stage, cardPositions);
}

function genCards(stage, cardPositions){
    for(i = 0; i < cardPositions.length; i++){

        stage.innerHTML +=  `<div class="card" data-icon="${cardPositions[i]}">
                                <div class="card_front">
                                    <img class="icon" src="./assets/images/memoryImages/${cardPositions[i]}.png">
                                </div>
                                <div class="card_back">
                                    ${i + 1}
                                </div>
                            </div>`;
                            }

    checkClick(stage);
}

function checkClick(stage){
    const cards = document.querySelectorAll(".card");
    const score = document.getElementById("scoreboard");
    const timer = 1000;
    const flipAudio = new Audio("./assets/sounds/Card flip.mp3");
    const flipAudio1 = new Audio("./assets/sounds/Card flip.mp3");

    let pair = [], index = 0, checked;
    let nonPair = [], flipped = [], saveI = [];
    

    for(let i = 0; i < cards.length; i++){
        
        cards[i].addEventListener("click", () => {
            const card = cards[i];
            saveI.push(i);

            card.style.pointerEvents = "none";
            card.setAttribute("class", "card flip");

            flipSound(flipAudio, flipAudio1, index);

            nonPair[index] = card;
            
            checked = playGame(card, pair, index);
            
            if(checked == 0){
                resetMiss(nonPair, timer);
            } else if(checked == 1){
                for(let j = 0; j < nonPair.length; j++){
                    flipped[saveI[j]] = nonPair[j];
                }
            }
            
            noEvents(cards, flipped, timer, checked);
            
            if(index == 1) {
                scoreboard(score, checked);
                index = 0;
                pair = [];
                nonPair = [];
                saveI = [];
            } else {
                index++;
            }
            
            if(gameOver()){
                finishGame(stage);
            }           
        });
    };    
}

function flipSound(flipAudio, flipAudio1, index){
    flipAudio.volume = 0.2;
    flipAudio1.volume = 0.2;

    (index == 0) ? flipAudio.play() : flipAudio1.play();
}

function playGame(card, pair, index){
    const dataIcon = card.getAttribute("data-icon");
    let checked = 2;

    pair[index] = dataIcon;

    if(index == 1){
        checked = checkGame(pair);

        return checked;
    }
    return checked;
}

function noEvents(cards, flipped, timer, checked){
    if (checked == 1) {
        flipped.forEach((card) => {
            card.style.pointerEvents = "none";
        });
    } else if(checked == 0) {
        for(let i = 0; i < cards.length; i++){
            cards[i].style.pointerEvents = "none";

            setTimeout(() => {
                if(cards[i] != flipped[i]){
                    cards[i].style.pointerEvents = "auto";
                }
            }, timer + 500);
        }
    }
}

function resetMiss(nonPair, timer){
    nonPair.forEach((card) => {
        setTimeout(() => {
            card.setAttribute("class", "card");  
        }, timer);
    });
}

function scoreboard(score, checked){
    let string;

    if(checked == 0){
        if(!who){
            string = `<span>${player1}</span> X <span style="animation-direction: reverse">${player2}</span>`;
        } else {
            string = `<span style="animation-direction: reverse">${player1}</span> X <span>${player2}</span>`;
        }
    }

    if(checked == 1){
        if(!who){
            string = `<span style="animation-duration: 0ms; animation-delay: 0ms">${player1}</span> X ${player2}`;
        } else {
            string = `${player1} X <span style="animation-duration: 0ms; animation-delay: 0ms">${player2}</span>`;
        }
    }
    
    score.innerHTML = string;
}

function finishGame(stage){
    const endScreen = document.getElementById("gameOver");
    const modal = document.getElementById("modal");

    stage.style.zIndex = "-1";
    endScreen.setAttribute("class", "gameOver show");
    
    setTimeout(() => {
        modal.setAttribute("class", "modal modal-true");
        modalText(modal, endScreen);       
    }, 1750);
}

function modalText(modal, endScreen){
    let winner, finalScore, string;

    if(player1 != player2){
        if(!who){
            winner = "Player 1";
            finalScore = `${player1}-${player2}`;
        } else {
            winner = "Player 2";
            finalScore = `${player2}-${player1}`;
        }
        string = `<p class="text-true"><span style="animation-duration: 0ms; animation-delay: 0ms">${winner}</span> won 
        <span style="animation-duration: 0ms; animation-delay: 0ms">${finalScore}</span></p>`  
    } else {
        string = `<p class="text-true">There was a <span style="animation-duration: 0ms; animation-delay: 0ms;">draw</span></p>`
    }

    setTimeout(() => {
        modal.innerHTML = ` <h2 class="text-true">Game Over</h2>

                            ${string}
                            
                            <button class="text-true">Restart</button>`;
        
        restart(modal, endScreen);
    }, 1000);    
}

function restart(modal, endScreen){
    const btn = document.querySelector("button"); 
    const cards = document.querySelectorAll(".card");

    btn.addEventListener("click", () => {
        restartGame();

        for(let i = 0; i < 3; i++){
            modal.children[i].setAttribute("class", "text-false");
        }

        setTimeout(() => {
            modal.setAttribute("class", "modal modal-false");
            
            setTimeout(() => {
                modal.innerHTML = "";
                modal.setAttribute("class", "");
    
                endScreen.setAttribute("class", "gameOver");
                
                setTimeout(() => {
                    cards.forEach((card) => {
                        card.setAttribute("class", "card");
                    });
                    setTimeout(() => {
                        initialize();
                        document.getElementById("scoreboard").innerHTML = "<span>0</span> X 0";
                    }, 500);
                }, 1500);
            }, 750);
        }, 1000);
    });
}