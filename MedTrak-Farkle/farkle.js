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

      let points = 0;

      for (var i = 0; i < diceArr.length; i++) {
        const valueOfDiceIsOne = diceArr.find((val) => val === 1);
        const valueOfDiceIsFive = diceArr.find((val) => val === 5);
        const filterOnes = diceArr.filter((val) => val === 1);
        const filterFives = diceArr.filter((val) => val === 5);
        const isDuplicateNum = diceArr.filter((val) => val === diceArr[i]);
        const oneOfAKind = isDuplicateNum.length === 3;
        const twoThreeOfAKind =
          diceArr.filter((val) => val == diceArr[i]).length === 3;

        if (twoThreeOfAKind) {
          sortedArr = diceArr.sort((x, y) => x - y);
          const findOnes = sortedArr.filter((val) => val === 1);
          const findOtherValues = sortedArr.filter((val) => val !== 1);
          if (findOnes) {
            points = 1000 + findOtherValues * 100;
            document.getElementById("score").innerHTML = points;
          }
          points = sortedArr[0] * 100 + sortedArr[5] * 100;
          document.getElementById("score").innerHTML = points;
          document.getElementById("header-text").innerHTML =
            "Two three of a kinds!";
        }

        if (oneOfAKind) {
          if (isDuplicateNum[0] === 1) {
            document.getElementById("score").innerHTML = 1000;
          } else {
            points = isDuplicateNum[0] * 100;
            document.getElementById("score").innerHTML = points;
          }

          document.getElementById("header-text").innerHTML = "Three of a kind!";
        }

        // Scoring for rolling 1s (not three of a kind)
        if (valueOfDiceIsOne || valueOfDiceIsFive && (filterOnes.length !== 3) && (filterFives.length !==3)) {
         
            if(valueOfDiceIsOne && valueOfDiceIsFive){
              points = filterOnes.length * 100 + filterFives.length * 50;
            }else{
              valueOfDiceIsOne ? points += filterOnes.length * 100 : filterFives.length * 50;
            }
            
            document.getElementById("score").innerHTML = points;
            document.getElementById("header-text").innerHTML =
              "You earned points for rolling 1s and/or 5s, but not a three of a kind.";
        
        }
        //Scoring for rolling 5s (not three of a kind)
        // if (valueOfDiceIsFive && filterFives.length !== 3) {
        //   document.getElementById("header-text").innerHTML =
        //     "You rolled one or more 5s!";
        //   document.getElementById("score").innerHTML = filterFives.length * 50;
        // }
        //Scoring for rolling 1s and 5s (not three of a kind)

        // Scoring for rolling three of a kind
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
