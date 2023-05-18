//Produces the array from a three of a kind roll
function arrThreeOfAKind(array, count) {
  const result = array.filter(
    (a, index) =>
      array.indexOf(a) === index &&
      array.reduce((acc, b) => +(a === b) + acc, 0) === count
  );

  if (result.length > 0) {
    return result;
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

function rollDice() {
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

  // Note: My assumption throughout is that a three of a kind is defined as
  // *exactly* three of a single number in a single roll and no more.

  function determineScore() {
    var diceArr = [
      randomNumber1,
      randomNumber2,
      randomNumber3,
      randomNumber4,
      randomNumber5,
      randomNumber6,
    ];

    var headerElement = document.getElementById("header-text");
    var scoreElement = document.getElementById("score");
    var points = 0;

    for (var i = 0; i < diceArr.length; i++) {
      //Filters the array to include only 1s and 5s
      const onlyOnes = diceArr.filter((val) => val === 1);
      const onlyFives = diceArr.filter((val) => val === 5);
      //Adds additional ones and fives after a three of a kind roll
      var addOnes = onlyOnes.length * 100;
      var addFives = onlyFives.length * 50;
      //All conditions if roll contains a three of a kind
      if (isThreeOfAKind(diceArr, 3)) {
        //Checks to see whether there are 2 three of a kinds
        if (arrThreeOfAKind(diceArr, 3).length === 2) {
          //Checks to see whether one of the two three of a kinds is all 1s
          if (arrThreeOfAKind(diceArr, 3).sort((x, y) => x - y)[0] === 1) {
            scoreElement.innerHTML =
              1000 +
              arrThreeOfAKind(diceArr, 3).sort((x, y) => x - y)[1] * 100;
            headerElement.innerHTML =
              "You rolled three 1s and have an additional three of a kind!";
            break;
          }
          scoreElement.innerHTML =
            arrThreeOfAKind(diceArr, 3).sort((x, y) => x - y)[0] * 100 +
            arrThreeOfAKind(diceArr, 3).sort((x, y) => x - y)[1] * 100;
          headerElement.innerHTML = "You rolled two three of a kinds!";
        }
        //Checks to see if only one three of a kind exists
        if (
          arrThreeOfAKind(
            diceArr.sort((x, y) => x - y),
            3
          ).length === 1
        ) {
          //Checks to see whether the three of a kind is all 1s
          if (arrThreeOfAKind(diceArr, 3).sort((x, y) => x - y)[0] === 1) {
            //Points added if there are 5s as well (1s not included, because it would be four of a kind, not three)

            scoreElement.innerHTML = 1000 + addFives;
            onlyFives.length === 0
              ? (headerElement.innerHTML = "You rolled three 1s!")
              : (headerElement.innerHTML =
                  "You rolled three 1s and one or more fives!");

            break;
          }
          //Calculates score for a three of a kind of 5s,
          //and any additional 1s
          const isThreeOfAKindOfFives = arrThreeOfAKind(diceArr, 3).includes(
            5
          );
          if (isThreeOfAKindOfFives) {
            scoreElement.innerHTML = 500 + onlyOnes.length * 100;

            onlyOnes.length > 0
              ? (headerElement.innerHTML =
                  "You rolled a three of a kind and some 1s!")
              : (headerElement.innerHTML = "You rolled a three of a kind!");
            break;
          }
          //Adds 1s and 5s to the score if the three of a kind
          //is not of those values
          if (
            (diceArr.includes(1) && onlyOnes.length > 0 < 3) ||
            (diceArr.includes(5) && onlyFives.length > 0 < 3)
          ) {
            scoreElement.innerHTML =
              arrThreeOfAKind(diceArr, 3).sort((x, y) => x - y)[0] * 100 +
              onlyOnes.length * 100 +
              onlyFives.length * 50;
            headerElement.innerHTML =
              "You rolled a three of a kind and some 1s and/or 5s!";
            break;
          }
          //Scores a three of a kind and no additional points
          points = arrThreeOfAKind(diceArr, 3).sort((x, y) => x - y)[0] * 100;
          scoreElement.innerHTML = points;
          headerElement.innerHTML = "You rolled a three of a kind!";
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
          scoreElement.innerHTML = points;
          headerElement.innerHTML =
            "You earned points for rolling 1s and/or 5s, but not a three of a kind.";
        } //Checks to see if the roll is a Farkle
        if (!diceArr.includes(1) && !diceArr.includes(5)) {
          scoreElement.innerHTML = 0;
          headerElement.innerHTML =
            "Farkle! Your roll didn't produce any points.";
        }
      }
    }
  }
  determineScore();
}

function bankScore() {
  if (
    confirm(
      "Your total score is: " +
        scoreElement.innerHTML +
        ". By banking your score, you take home your points and end the game."
    ) === true
  ) {
    scoreElement.innerHTML = 0;
  }
}
