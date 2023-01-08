window.onload = function () {
  startGame();
};

const rows = 3;
const cols = 3;
let deck = [5, 3, 1, 2, 9, 6, 4, 8, 7];
let board = [];

let currTile;
let otherTile;

let turns = 0;

function startGame() {
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      const img = deck.shift();
      let tile = document.createElement("img");
      tile.src = img + ".jpg";
      tile.id = i.toString() + "-" + j.toString();

      //DRAG FUNCTIONALITY
      tile.addEventListener("dragstart", dragStart); //click an image to drag
      tile.addEventListener("dragover", dragOver); //moving image around while clicked
      tile.addEventListener("dragenter", dragEnter); //dragging image onto another one
      tile.addEventListener("dragleave", dragLeave); //dragged image leaving anohter image
      tile.addEventListener("drop", dragDrop); //drag an image over another image, drop the image
      tile.addEventListener("dragend", dragEnd); //after drag drop, swap the two tiles

      document.getElementById("board").append(tile);
    }
  }
}

function dragStart() {
  currTile = this; //this refers to the img tile being dragged
}

function dragOver(e) {
  e.preventDefault();
}

function dragEnter(e) {
  e.preventDefault();
}

function dragLeave() {}

function dragDrop() {
  otherTile = this; //this refers to the img tile being dropped on
}

function dragEnd(e) {
  if (!otherTile.src.includes("3.jpg")) {
    return;
  }

  let currCoords = currTile.id.split("-");
  let r = parseInt(currCoords[0]);
  let c = parseInt(currCoords[1]);

  let otherCoords = otherTile.id.split("-");
  let r2 = parseInt(otherCoords[0]);
  let c2 = parseInt(otherCoords[1]);

  let moveLeft = r == r2 && c2 == c - 1;
  let moveRight = r == r2 && c2 == c + 1;

  let moveUp = c == c2 && r2 == r - 1;
  let moveDown = c == c2 && r2 == r + 1;

  let isAdjacent = moveLeft || moveRight || moveUp || moveDown;

  if (isAdjacent) {
    let currentSrc = currTile.src;
    let otherSrc = otherTile.src;
    currTile.src = otherSrc;
    otherTile.src = currentSrc;

    turns++;
    document.getElementById("turns").innerText = turns;
  }
}
