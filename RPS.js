let score = JSON.parse(localStorage.getItem("score")) || {
    wins: 0,
    losses: 0,
    ties: 0,
  };
  
  updateScoreElement();
  

  let isAutoPlaying=false;
  let intervalId;

  function autoPlay(){
    if(!isAutoPlaying){
      intervalId=setInterval(function(){
        const playerMove=pickComputerMove();
        playGame(playerMove);
      },1000);
      isAutoPlaying=true;
    }
    else{
      clearInterval(intervalId);
      isAutoPlaying=false;
    }
  }


  function playGame(playerMove) {
    const computerMove = pickComputerMove();
    let result = "";
    if (playerMove === "scissors") {
      if (computerMove === "rock") {
        result = "You Lose";
      } else if (computerMove === "paper") {
        result = " You Win";
      } else if (computerMove === "scissors") {
        result = "Tie";
      }
    } else if (playerMove === "paper") {
      if (computerMove === "rock") {
        result = "You Win";
      } else if (computerMove === "paper") {
        result = "Tie";
      } else if (computerMove === "scissors") {
        result = "You Lose";
      }
    } else if (playerMove === "rock") {
      if (computerMove === "rock") {
        result = "Tie";
      } else if (computerMove === "paper") {
        result = "You Lose";
      } else if (computerMove === "scissors") {
        result = "You Win";
      }
    }
    if (result === "You Win") {
      localStorage.setItem(
        "wins",
        parseInt(localStorage.getItem("wins") || "0") + 1
      );
    } else if (result === "You Lose") {
      localStorage.setItem(
        "lose",
        parseInt(localStorage.getItem("lose") || "0") + 1
      );
    } else if (result === "Tie") {
      localStorage.setItem(
        "tie",
        parseInt(localStorage.getItem("tie") || "0") + 1
      );
    }
    document.querySelector(".js-result").innerHTML = result;
    document.querySelector(".js-moves").classList.add("dis-flex");
    document.querySelector(".youimg").src = `images/${playerMove}-emoji.png`;
    document.querySelector(
      ".computerimg"
    ).src = `images/${computerMove}-emoji.png`;
    updateScoreElement();
  }
  
  function updateScoreElement() {
    document.querySelector(".js-score").innerHTML = `Wins: ${
      localStorage.getItem("wins") || 0
    }
       Losses: ${localStorage.getItem("lose") || 0}
       Ties: ${localStorage.getItem("tie") || 0}
      `;
  }
  
  function pickComputerMove() {
    const randomNumber = Math.random();
  
    let computerMove = "";
  
    if (randomNumber >= 0 && randomNumber < 1 / 3) {
      computerMove = "rock";
    } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
      computerMove = "paper";
    } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
      computerMove = "scissors";
    }
    return computerMove;
  }
  
  document.querySelector(".reset-score-button").addEventListener("click", () => {
    localStorage.removeItem("wins");
    localStorage.removeItem("tie");
    localStorage.removeItem("lose");
    window.location.reload();
  });
