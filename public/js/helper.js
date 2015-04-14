
window.addEventListener("keydown", function(e) {
    // space and arrow keys
    if([37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
}, false);





//implements shuffle methods for all arrays

Array.prototype.shuffle = function () {
  var input = this;
  for (var i = input.length - 1; i > 0; i--) {
    var randomIndex = Math.floor(Math.random() * (i + 1));
    var itemAtIndex = input[randomIndex];
    input[randomIndex] = input[i];
    input[i] = itemAtIndex;
  }
  return input;
}


var removeWallLeft = function checkCellLeft(previousCell, currentCell) {
  previousCell.removeBorderLeft();
  currentCell.removeBorderRight();
};

var removeWallRight = function(previousCell, currentCell) {
  previousCell.removeBorderRight();
  currentCell.removeBorderLeft();
};

var removeWallUp = function(previousCell, currentCell) {
  previousCell.removeBorderUp();
  currentCell.removeBorderDown();
};

var removeWallDown = function(previousCell, currentCell) {
  previousCell.removeBorderDown();
  currentCell.removeBorderUp();
};

