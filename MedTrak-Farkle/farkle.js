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
        1, 2, 1, 2, 1, 2,
        // randomNumber1,
        // randomNumber2,
        // randomNumber3,
        // randomNumber4,
        // randomNumber5,
        // randomNumber6,
      ];

      let points = 0;

      for (var i = 0; i < diceArr.length; i++) {
        //Produces the array from a three of a kind roll
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
        //Boolean to check whether the array contains a three of a kind
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
        //All conditions if roll contains a three of a kind
        if (isThreeOfAKind(diceArr, 3)) {
          //Checks to see whether there are 2 three of a kinds
          if (checkThreeOfAKind(diceArr, 3).length === 2) {
            //Checks to see whether one of the two three of a kinds is all 1s
            if (checkThreeOfAKind(diceArr, 3).sort((x, y) => x - y)[0] === 1) {
              document.getElementById("score").innerHTML =
                1000 +
                checkThreeOfAKind(diceArr, 3).sort((x, y) => x - y)[1] * 100;
              document.getElementById("header-text").innerHTML =
                "You rolled three 1s and have an additional three of a kind!";
              break;
            }
            document.getElementById("score").innerHTML =
              checkThreeOfAKind(diceArr, 3).sort((x, y) => x - y)[0] * 100 +
              checkThreeOfAKind(diceArr, 3).sort((x, y) => x - y)[1] * 100;
            document.getElementById("header-text").innerHTML =
              "You rolled two three of a kinds!";
          }
          //Checks to see if only one three of a kind exists
          if (
            checkThreeOfAKind(
              diceArr.sort((x, y) => x - y),
              3
            ).length === 1
          ) {
            //Checks to see whether the three of a kind is all 1s
            if (checkThreeOfAKind(diceArr, 3).sort((x, y) => x - y)[0] === 1) {
              document.getElementById("score").innerHTML = 1000;

              document.getElementById("header-text").innerHTML =
                "You rolled three 1s!";
              break;
            }
            points =
              checkThreeOfAKind(diceArr, 3).sort((x, y) => x - y)[0] * 100;
            document.getElementById("score").innerHTML = points;

            document.getElementById("header-text").innerHTML =
              "You rolled a three of a kind!";
          }
        }
        // Checks to see whether there are 1s and 5s in a roll,
        //but that aren't part of a three of a kind
        if (!isThreeOfAKind(diceArr, 3)) {
          if (diceArr.includes(1) || diceArr.includes(5)) {
            const valueOfDiceIsOne = diceArr.filter((val) => val === 1);
            const valueOfDiceIsFive = diceArr.filter((val) => val === 5);
            points =
              valueOfDiceIsOne.length * 100 + valueOfDiceIsFive.length * 50;
            document.getElementById("score").innerHTML = points;
            document.getElementById("header-text").innerHTML =
              "You earned points for rolling 1s and/or 5s, but not a three of a kind.";
          } //Checks to see if the roll is a Farkle
          if (!diceArr.includes(1) && !diceArr.includes(5)) {
            document.getElementById("score").innerHTML = 0;
            document.getElementById("header-text").innerHTML =
              "Farkle! Your roll didn't produce any points.";
          }
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
