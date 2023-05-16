function rollDice() {
  setTimeout(function () {
    var randomNumber1 = Math.floor(Math.random() * 6) + 1;
    var randomNumber2 = Math.floor(Math.random() * 6) + 1;
    var randomNumber3 = Math.floor(Math.random() * 6) + 1;
    var randomNumber4 = Math.floor(Math.random() * 6) + 1;
    var randomNumber5 = Math.floor(Math.random() * 6) + 1;
    var randomNumber6 = Math.floor(Math.random() * 6) + 1;

    document
      .getElementById("die1")
      .setAttribute("src", "./images/" + randomNumber1 + ".png");

    document
      .getElementById("die2")
      .setAttribute("src", "./images/" + randomNumber2 + ".png");
    document
      .getElementById("die3")
      .setAttribute("src", "./images/" + randomNumber3 + ".png");
    document
      .getElementById("die4")
      .setAttribute("src", "./images/" + randomNumber4 + ".png");
    document
      .getElementById("die5")
      .setAttribute("src", "./images/" + randomNumber5 + ".png");
    document
      .getElementById("die6")
      .setAttribute("src", "./images/" + randomNumber6 + ".png");

    function determineScore() {
      var diceArr = [
        randomNumber1,
        randomNumber2,
        randomNumber3,
        randomNumber4,
        randomNumber5,
        randomNumber6,
      ];
      for (var i = 0; i < diceArr.length; i++) {
        //Scoring for rolling 1s
        // const valueOfDiceIsOne = diceArr.filter((val) => val === 1);
        //   if(valueOfDiceIsOne){
        //     document.getElementById("header-text").innerHTML = "Y";
        //   }

        //Scoring for rolling three of a kind

        const isDuplicate = diceArr.filter((val) => val === diceArr[i]);
        if (isDuplicate.length === 3) {
          var valueOfDice = isDuplicate[0];
          document.getElementById("header-text").innerHTML = "Three of a kind!";
          document.getElementById("score").innerHTML = valueOfDice * 100;
        }
      }
    }
    determineScore();
  }, 100);
}

function bankScore() {
  if (
    confirm(
      "Your total score is: " +
        document.getElementById("score").innerHTML +
        ". By banking your score, you take home your points and end the game."
    ) === true
  ) {
    document.getElementById("score").innerHTML = 0;
  }
}
