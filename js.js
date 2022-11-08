for (let i = 1; i <= 9; i++) {
  document.getElementById(
    "game"
  ).innerHTML += `<div class="block" number = ${i}></div>`;
}
let player = "X";
let stepCount = 0;
const message = document.getElementById("message");

const winCombinations = [
  ["1", "2", "3"],
  ["1", "4", "7"],
  ["1", "5", "9"],
  ["2", "5", "8"],
  ["3", "6", "9"],
  ["3", "5", "7"],
  ["4", "5", "6"],
  ["7", "8", "9"],
];
const dataX = [];
const dataO = [];
debugger;
document.getElementById("game").addEventListener("click", currentStep);

function currentStep(event) {
  let num = event.target.getAttribute("number");
  if (event.target.className == "block" && stepCount < 9) {
    if (!event.target.innerHTML) {
      event.target.innerHTML = player;
      player === "X" ? dataX.push(num) : dataO.push(num);
      const isOWin = checkWin(dataO, num);
      const isXWin = checkWin(dataX, num);

      if ((dataO.length > 2 || dataX.length > 2) && (isOWin || isXWin)) {
        document
          .getElementById("game")
          .removeEventListener("click", currentStep);

        return (message.innerText = "Победил игрок " + player);
      }

      changePlayer();
      stepCount++;
      stepCount === 9
        ? (message.innerText = "Ничья")
        : (message.innerText = "Ходит игрок " + player);
    }
  }
}

function changePlayer() {
  player === "X" ? (player = "O") : (player = "X");
}

function checkWin(arr, number) {
  for (let someWinArr of winCombinations) {
    count = 0;
    if (someWinArr.includes(number)) {
      for (let elem of someWinArr) {
        if (arr.includes(elem)) {
          count++;
          if (count === 3) {
            return true;
          }
        }
      }
      count = 0;
    }
  }
  return false;
}
