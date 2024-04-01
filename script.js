const keys = [
  "A",
  "Z",
  "E",
  "R",
  "T",
  "Y",
  "U",
  "I",
  "O",
  "P",
  "Q",
  "S",
  "D",
  "F",
  "G",
  "H",
  "J",
  "K",
  "L",
  "M",
  "W",
  "X",
  "C",
  "V",
  "B",
  "N",
];

const words = [
  {
    word: "Elephant",
    hint: "Animals",
  },
  {
    word: "Guitar",
    hint: "Musical Instruments",
  },
  {
    word: "Pineapple",
    hint: "Fruits",
  },
  {
    word: "Astronaut",
    hint: "Professions",
  },
  {
    word: "Bicycle",
    hint: "Transportation",
  },
  {
    word: "Rainbow",
    hint: "Weather",
  },
  {
    word: "Detective",
    hint: "Professions",
  },
  {
    word: "Watermelon",
    hint: "Fruits",
  },
  {
    word: "Dragonfly",
    hint: "Insects",
  },
  {
    word: "Football",
    hint: "Sports",
  },
  {
    word: "Octopus",
    hint: "Animals",
  },
  {
    word: "Piano",
    hint: "Musical Instruments",
  },
  {
    word: "Strawberry",
    hint: "Fruits",
  },
  {
    word: "Scientist",
    hint: "Professions",
  },
  {
    word: "Helicopter",
    hint: "Transportation",
  },
  {
    word: "Thunderstorm",
    hint: "Weather",
  },
  {
    word: "Butterfly",
    hint: "Insects",
  },
  {
    word: "Basketball",
    hint: "Sports",
  },
  {
    word: "Giraffe",
    hint: "Animals",
  },
  {
    word: "Saxophone",
    hint: "Musical Instruments",
  },
  {
    word: "Orange",
    hint: "Fruits",
  },
  {
    word: "Engineer",
    hint: "Professions",
  },
  {
    word: "Motorcycle",
    hint: "Transportation",
  },
  {
    word: "Blizzard",
    hint: "Weather",
  },
  {
    word: "Beetle",
    hint: "Insects",
  },
  {
    word: "Tennis",
    hint: "Sports",
  },
  {
    word: "Rhino",
    hint: "Animals",
  },
  {
    word: "Violin",
    hint: "Musical Instruments",
  },
  {
    word: "Mango",
    hint: "Fruits",
  },
  {
    word: "Doctor",
    hint: "Professions",
  },
];

// FUNCTION FOR DISPLAYING KEYBOARD
function displayKeyboard(keys) {
  const keyContainer = document.querySelector(".key-container");
  const gridKey = document.createElement("div");
  gridKey.classList.add("grid-key");
  gridKey.innerHTML = keys
    .map((key) => `<p class="grid-item">${key}</p>`)
    .join("");
  keyContainer.appendChild(gridKey);
}

// FUNCTION TO CHOOSE THE WORD/PUZZLE
function getRandomWord(wordList) {
  return wordList[Math.floor(Math.random() * wordList.length)];
}
const puzzle = getRandomWord(words);

// FUNCTION FOR DISPLAYING TILES
function displayTiles(myWord) {
  const gameContainer = document.querySelector(".game-container");
  const gridGame = document.createElement("div");
  gridGame.classList.add("grid-game");

  const displayCount = Math.ceil(myWord.word.length * 0.6);
  const displayIndices = [];

  while (displayIndices.length < displayCount) {
    const index = Math.floor(Math.random() * myWord.word.length);
    if (!displayIndices.includes(index)) {
      displayIndices.push(index);
    }
  }

  myWord.word.split("").forEach((char, i) => {
    const tile = document.createElement("p");
    tile.classList.add("tile");
    if (displayIndices.includes(i)) {
      tile.textContent = char;
    } else {
      tile.classList.add("hidden");
    }
    gridGame.appendChild(tile);
  });

  gameContainer.appendChild(gridGame);
}
displayTiles(puzzle);

// FUNCTION TO HANDLE HINT BUTTON
function toggleHint() {
  const hint = document.querySelector(".hint");
  hint.addEventListener("click", () => {
    const hintTooltip = document.querySelector(".hint-tooltip");
    if (hintTooltip) {
      hintTooltip.remove();
    } else {
      const hintTooltip = document.createElement("div");
      hintTooltip.classList.add("hint-tooltip");
      hintTooltip.textContent = puzzle.hint;
      const hintRect = hint.getBoundingClientRect();
      hintTooltip.style.top = `${hintRect.bottom}px`;
      hintTooltip.style.left = `${hintRect.left}px`;
      document.body.appendChild(hintTooltip);
    }
  });
}

// EVENT LISTENER FOR GRID-ITEMS
function handleGridItems() {
  const gridItems = document.querySelectorAll(".grid-item");
  gridItems.forEach((item) => {
    item.addEventListener("click", () => {
      const clickedLetter = item.textContent;
      const tiles = document.querySelectorAll(".tile");
      let letterAdded = false;

      for (let i = 0; i < puzzle.word.length; i++) {
        if (tiles[i].textContent === "" || tiles[i].textContent === " ") {
          if (puzzle.word[i].toLowerCase() === clickedLetter.toLowerCase()) {
            tiles[i].textContent = clickedLetter;
            letterAdded = true;
            break;
          }
        }
      }

      if (!letterAdded) {
        handleWrongAttempt();
      }

      if (checkTilesFilled()) {
        const popupContent = document.querySelector(".popup-content");
        popupContent.innerHTML =
          "<p>You win!</p><button onclick='restartGame()'>Play Again</button>";
        const popup = document.querySelector(".popup");
        popup.style.display = "block";
      }
    });
  });
}

const maxWrongAttempts = Math.floor(puzzle.word.length * 0.5);
let wrongAttempts = 0;

function updateHealthBar() {
  const healthBarInner = document.querySelector(".health-bar-inner");
  const health = Math.max(100 - wrongAttempts * (100 / maxWrongAttempts), 0);
  healthBarInner.style.width = health + "%";

  if (health <= 0) {
    const popup = document.querySelector(".popup");
    popup.style.display = "block";
  }
}

function restartGame() {
  window.location.reload();
}

function handleWrongAttempt() {
  wrongAttempts++;
  updateHealthBar();
}

function checkTilesFilled() {
  const tiles = document.querySelectorAll(".tile");
  for (let tile of tiles) {
    if (tile.textContent.trim() === "") {
      return false;
    }
  }
  return true;
}

displayKeyboard(keys);
toggleHint();
handleGridItems();
