let positions = [], positionedImages = [];
const images = [
    "Bootstrap",
    "CSS",
    "EJS",
    "express",
    "HTML5",
    "JavaScript",
    "jquery",
    "nodejs",
    "Python",
    "reactjs",
    "MySQL",
    "Java"
];
const quantity = 24;

let who = false, player1 = 0, player2 = 0, hit = 0;

function genPositions(){
    let done, position;

    for(let i = 0; i < quantity; i++){
        done = false;
        while (!done) {
            position = Math.floor(Math.random() * quantity);
                if(verifyPosition(position)){
                    positions.push(position);
                    done = true;
                }
        }
    }

    for(let i = 0; i < positions.length; i++){
        j = Math.floor(i / 2);
            
        positionedImages[positions[i]] = images[j];
    }

    return positionedImages;
}

function verifyPosition(position){
    for (let i = 0; i < positions.length; i++){
        if(positions[i] == position){
            return false;
        }
    }
    return true;
}

function checkGame(pair){
    if(pair[0] == pair[1]){
        hit++;

        if(!who){
            player1++;
        } else {
            player2++;
        }
        
        return 1;
    } else {
        who = (who) ? false : true;
        return 0;
    }
}

function gameOver(){
    return hit == quantity / 2;
}

function restartGame(){
    who = false; 
    player1 = 0; 
    player2 = 0; 
    hit = 0;
    positions = [];
    positionedImages = [];
}
