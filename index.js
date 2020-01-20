var y = Math.floor(Math.random()*100)+1;    
var guess = 1; 
let guessed;
document.getElementById("submitguess").onclick = function(){ 
    var x = document.getElementById("guessField").value; 
    if( guess <= 10){
        if(x > 100 || x < 1){
            document.querySelector('.result').textContent = "Enter number between 1 and 100"; 
        }else{
            document.querySelector('.turn').textContent = 10 - guess;
            if(x == y){     
                document.querySelector('.result').textContent = "CONGRATULATIONS ! YOU GOT IT RIGHT !";                   
                guess = 12;
            }else if(x > y){     
                guess++;
                document.querySelector('.result').textContent = "Last guess was too high !"; 
            }else{ 
                guess++; 
                document.querySelector('.result').textContent = "Last guess was too low !"; 
            } 
            if(guess == 2){
                guessed = x;
            }else{
                guessed += " , " + x;
            }
            document.querySelector('.history').textContent = guessed; 
        }                
    }
    if(guess == 11){
            document.querySelector('.result').textContent = "!!! GAME OVER !!!"; 
    }

}

