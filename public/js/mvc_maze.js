  //MODEL: ///////////////////////////////////////////////////////////////////
  var Cell = function() {
    this.visited = false;
    this.nodeLeft = null;
    this.nodeRight = null;
    this.nodeUp = null;
    this.nodeDown = null;
    this.borderLeft = true;
    this.borderRight = true;
    this.borderUp = true;
    this.borderDown = true;
  };

  Cell.prototype.visit = function() {
    this.visited = true;
  };

  Cell.prototype.removeBorderLeft = function() {
    this.borderLeft = false;
  };

  Cell.prototype.removeBorderRight = function() {
    this.borderRight = false;
  };

  Cell.prototype.removeBorderUp = function() {
    this.borderUp = false;
  };

  Cell.prototype.removeBorderDown = function() {
    this.borderDown = false;
  };

  Cell.prototype.assignLeft = function(neighborCell) {
    this.nodeLeft = neighborCell;
  };

  Cell.prototype.assignRight = function(neighborCell) {
    this.nodeRight = neighborCell;
  }

  Cell.prototype.assignUp = function(neighborCell) {
    this.nodeUp = neighborCell;
  }

  Cell.prototype.assignDown = function(neighborCell) {
    this.nodeDown = neighborCell;
  }

  Cell.prototype.getAllViablePaths = function() {
    var viablePaths = [];
    if (this.nodeLeft) {
      if (!this.nodeLeft.visited) {
          viablePaths.push(this.nodeLeft);
      }
    }

    if (this.nodeRight) {
      if (!this.nodeRight.visited) {
        viablePaths.push(this.nodeRight);
      }
    }

    if (this.nodeUp) {
      if (!this.nodeUp.visited) {
        viablePaths.push(this.nodeUp);
      }
    }

    if (this.nodeDown) {
      if (!this.nodeDown.visited) {
        viablePaths.push(this.nodeDown);
      }
    }

    return viablePaths.shuffle();
  };

  Cell.prototype.clearReference = function() {
    this.nodeLeft = null;
    this.nodeRight = null;
    this.nodeUp = null;
    this.nodeDown = null;
  }

  var Maze = function() {
    this.numberRowsColumns = 10;
    this.totalCells = (this.numberRowsColumns * this.numberRowsColumns);
    this.cellContainer = [];
  };

  Maze.prototype.initialize = function() {
    for (var index = 0; index < this.totalCells; index++) {
      this.cellContainer.push(new Cell());
    }
  };

  Maze.prototype.findDirection = function(currentPathCell, nextPathCell) {
    var direction;
    currentPathIndex = this.cellContainer.indexOf(currentPathCell);
    nextPathIndex = this.cellContainer.indexOf(nextPathCell);

    pathIndexDifference = nextPathIndex - currentPathIndex;

    if (pathIndexDifference === -1) {
      direction = 'left';
    } else if (pathIndexDifference === 1) {
      direction = 'right';
    } else if (pathIndexDifference === -10) {
      direction = 'up';
    } else if (pathIndexDifference === 10) {
      direction = 'down';
    }

    return direction;
  };

  Maze.prototype.modifyCells = function(previousOrStartCell, currentPathCell, direction) {
    var self = this;

    if (currentPathCell.visited) {
      return;
    }

    if (direction === 'left') {
      removeWallLeft(previousOrStartCell, currentPathCell);
    } else if (direction === 'right') {
      removeWallRight(previousOrStartCell, currentPathCell);
    } else if (direction === 'up') {
      removeWallUp(previousOrStartCell, currentPathCell);
    } else if (direction === 'down') {
      removeWallDown(previousOrStartCell, currentPathCell);
    }

    currentPathCell.visit();
    var viablePaths = currentPathCell.getAllViablePaths(); //should be already shuffled

    for (var pathIndex = 0; pathIndex < viablePaths.length; pathIndex++) {
      nextPathCell = viablePaths[pathIndex];
      direction = self.findDirection(currentPathCell, nextPathCell)
      self.modifyCells(currentPathCell, nextPathCell, direction)
    }

  };

  Maze.prototype.randomizeMaze = function() {
    var startCell = this.cellContainer[0];
    var randomNextPathCell = startCell.getAllViablePaths()[0];
    startCell.visit();
    // var randomNextPathCell = this.cellContainer[1]; //test
    var direction = this.findDirection(startCell, randomNextPathCell);
    this.modifyCells(startCell, randomNextPathCell, direction);
  };

  Maze.prototype.clearReferences = function() {
    for (var cellIndex = 0; cellIndex < this.cellContainer.length; cellIndex++) {
      this.cellContainer[cellIndex].clearReference();
    }
  }


//View: ////////////////////////////////////////////////////////
  var mazeView = function() {
  };

  mazeView.prototype.removeBorders = function(cell, currentCell) {
    if (!cell.borderLeft) {
      currentCell.css('border-left', 'none');
    }

    if (!cell.borderRight) {
      currentCell.css('border-right', 'none');
    }

    if (!cell.borderUp) {
      currentCell.css('border-top', 'none');
    }

    if (!cell.borderDown) {
      currentCell.css('border-bottom', 'none');
    }

  };

  mazeView.prototype.renderCells = function(cell, id, mazeCountId) {
    $('#' + mazeCountId+'.maze-container').append('<div class="cell" id='+ id +'></div>');
    $currentCell = $('#' + mazeCountId+'.maze-container').children().last();
    this.removeBorders(cell, $currentCell);
    if (id === 0) {
      $currentCell.addClass('start-point');
    } else if (id === 99) {  //99 is constant. need fixing if i want to expand maze
      $currentCell.addClass('end-point')
    }
  }


  //Controller: //////////////////////////////////////////////////

  var mazeController = function(model, view) {
    this.model = model;
    this.view = view;
  };

  mazeController.prototype.seedModel = function() {
    for (var currentCellIndex = 0; currentCellIndex < this.model.totalCells; currentCellIndex++) {
      var currentCell = this.model.cellContainer[currentCellIndex];

      var leftCellIndex = currentCellIndex - 1;
      if (currentCellIndex % this.model.numberRowsColumns !== 0) {
        currentCell.assignLeft(this.model.cellContainer[leftCellIndex]);
      }

      var rightCellIndex = currentCellIndex + 1;
      if (rightCellIndex % this.model.numberRowsColumns !== 0) {
        currentCell.assignRight(this.model.cellContainer[rightCellIndex]);
      }

      var upCellIndex = currentCellIndex - this.model.numberRowsColumns;
      if (upCellIndex >= 0) {
        currentCell.assignUp(this.model.cellContainer[upCellIndex]);
      }

      var downCellIndex = currentCellIndex + this.model.numberRowsColumns;
      if (downCellIndex < this.model.totalCells) {
        currentCell.assignDown(this.model.cellContainer[downCellIndex]);
      }
    }
  };

  mazeController.prototype.addPlayer = function() {
    $($('.maze-container').children()[0]).append('<div class="player"></div>');
  };

  mazeController.prototype.display = function(mazeCountId) {
    for (var cellIndex = 0; cellIndex < this.model.cellContainer.length; cellIndex++) {
      this.view.renderCells(this.model.cellContainer[cellIndex], cellIndex, mazeCountId);
    }

  };
