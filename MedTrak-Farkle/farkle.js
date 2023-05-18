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
var diceArr = [];
function rollDice() {
  diceArr = [...Array(6)].map(() => Math.floor(Math.random() * 6) + 1);
  //Update dice images
  function updateDiceImages() {
    for (var i = 1; i <= 6; i++) {
      var imageElement = "die" + i;
      document
        .getElementById(imageElement)
        .setAttribute("src", "./images/" + diceArr[i - 1] + ".png");
    }
  }
  updateDiceImages();
  determineScore(diceArr);
}
// Note: My assumption throughout is that a three of a kind is defined as
// *exactly* three of a single number in a single roll and no more.
function determineScore() {
  var headerElement = document.getElementById("header-text");
  var scoreElement = document.getElementById("score");
  const isThreeOfAKind = arrThreeOfAKind(diceArr, 3);
  var points = 0;

  for (var i = 0; i < diceArr.length; i++) {
    const arrOfOnes = diceArr.filter((val) => val === 1);
    const arrOfFives = diceArr.filter((val) => val === 5);

    //Adds additional ones and fives after a three of a kind roll
    var addOnes = arrOfOnes.length * 100;
    var addFives = arrOfFives.length * 50;

    //Checks for all of the conditions that the dice could roll.
    //Starts with conditions if the array produces a three of a kind.
    if (isThreeOfAKind) {
      //Checks to see whether there are 2 three of a kinds
      if (arrThreeOfAKind(diceArr, 3).length === 2) {
        //Checks to see whether one of the two three of a kinds is all 1s
        if (arrThreeOfAKind(diceArr, 3).sort((x, y) => x - y)[0] === 1) {
          //Accounts for the 1s and calculates the value of a second third
          //of a kind, if present
          scoreElement.innerHTML =
            1000 + arrThreeOfAKind(diceArr, 3).sort((x, y) => x - y)[1] * 100;
          headerElement.innerHTML =
            "You rolled three 1s and have an additional three of a kind!";
          break;
        }
        scoreElement.innerHTML =
          arrThreeOfAKind(diceArr, 3).sort((x, y) => x - y)[0] * 100 +
          arrThreeOfAKind(diceArr, 3).sort((x, y) => x - y)[1] * 100;
        headerElement.innerHTML = "You rolled two three of a kinds!";
      }
      //Below conditions are if there is only one three of a kind
      if (arrThreeOfAKind(diceArr, 3).length === 1) {
        //Calculates score for a three of a kind of 1s,
        //and any additional 5s
        if (arrThreeOfAKind(diceArr, 3).sort((x, y) => x - y)[0] === 1) {
          scoreElement.innerHTML = 1000 + addFives;
          arrOfFives.length === 0
            ? (headerElement.innerHTML = "You rolled three 1s!")
            : (headerElement.innerHTML =
                "You rolled three 1s and one or more fives!");

          break;
        }
        //Calculates score for a three of a kind of 5s and any additional 1s
        if (arrThreeOfAKind(diceArr, 3).includes(5)) {
          scoreElement.innerHTML = 500 + addOnes;

          arrOfOnes.length > 0
            ? (headerElement.innerHTML =
                "You rolled a three of a kind and some 1s!")
            : (headerElement.innerHTML = "You rolled a three of a kind!");
          break;
        }
        //Adds 1s and 5s to the score if the three of a kind is not of those values
        if (
          (diceArr.includes(1) && arrOfOnes.length > 0 < 3) ||
          (diceArr.includes(5) && arrOfFives.length > 0 < 3)
        ) {
          scoreElement.innerHTML =
            arrThreeOfAKind(diceArr, 3).sort((x, y) => x - y)[0] * 100 +
            addOnes +
            addFives;
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
    // Checks to see whether there are 1s and 5s in a roll that aren't part of a three of a kind
    if (!isThreeOfAKind) {
      if (diceArr.includes(1) || diceArr.includes(5)) {
        points = arrOfOnes.length * 100 + arrOfFives.length * 50;
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
function bankScore() {
  if (
    confirm(
      "Your total score is: " +
        document.getElementById("score").innerHTML +
        ". By banking your score, you take home your points and end the game."
    ) === true
  ) {
    document.getElementById("score").innerHTML = 0;
    window.location.reload();
  }
}
