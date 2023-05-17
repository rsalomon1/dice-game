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

        function checkThreeOfAKind(array, count) {
          const resultArr = array.filter(
            (a, index) =>
              array.indexOf(a) === index &&
              array.reduce((acc, b) => +(a === b) + acc, 0) === count
          );

          if (resultArr.length > 0) {
            return resultArr;
          }
        }

        function isThreeOfAKind(array, count) {
          const resultArr = array.filter(
            (a, index) =>
              array.indexOf(a) === index &&
              array.reduce((acc, b) => +(a === b) + acc, 0) === count
          );

          if (resultArr.length > 0) {
            return true;
          }
          return false;
        }

        if (checkThreeOfAKind(diceArr, 3).length === 2) {
          if (checkThreeOfAKind(diceArr, 3).sort((x, y) => x - y)[0] === 1) {
            points =
              1000 +
              checkThreeOfAKind(diceArr, 3).sort((x, y) => x - y)[1] * 100;
          }
          points =
            checkThreeOfAKind(diceArr, 3).sort((x, y) => x - y)[0] * 100 +
            checkThreeOfAKind(diceArr, 3).sort((x, y) => x - y)[1] * 100;
        }
        if (
          checkThreeOfAKind(
            diceArr.sort((x, y) => x - y),
            3
          ).length === 1
        ) {
          if (checkThreeOfAKind(diceArr, 3).sort((x, y) => x - y)[0] === 1) {
            document.getElementById("score").innerHTML = 1000;
          }
          points = checkThreeOfAKind(diceArr, 3).sort((x, y) => x - y)[0] * 100;
          document.getElementById("score").innerHTML = points;

          document.getElementById("header-text").innerHTML =
            "You have one or more three of a kind!";
        }
        // Scoring for rolling 1s (not three of a kind)
        if (
          !isThreeOfAKind(diceArr, 3) &&
          (valueOfDiceIsOne || valueOfDiceIsFive)
        ) {
          valueOfDiceIsOne && points + 100;
          valueOfDiceIsFive && points + 50;

          document.getElementById("score").innerHTML = points;
          document.getElementById("header-text").innerHTML =
            "You earned points for rolling 1s and/or 5s, but not a three of a kind.";
        } //Farkle scoring
        if (
          !isThreeOfAKind(diceArr, 3) &&
          !valueOfDiceIsOne &&
          !valueOfDiceIsFive
        ) {
          document.getElementById("score").innerHTML = 0;
          document.getElementById("header-text").innerHTML =
            "Farkle! Your roll didn't produce any points.";
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
