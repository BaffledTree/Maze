
  <% 100.times do |cell_counter| %>
    <div class="cell unvisited" id="<%= cell_counter %>"></div>
  <% end %>







  // var neighborHandlerList = [
  //   {
  //     direction: 'left',
  //     method: removeWallLeft
  //   },
  //   {
  //     direction: 'right',
  //     method: removeWallRight
  //   },
  //   {
  //     direction: 'up',
  //     method: removeWallUp
  //   },
  //   {
  //     direction: 'down',
  //     method: removeWallDown
  //   }
  // ];

  // var pickRandomNeighborCell = function(startCell) {
  //   var handler, neighborCell, len = neighborHandlerList.length, counter = 0;
  //   while (!neighborCell) {
  //     handler = neighborHandlerList[Math.floor(Math.random() * len)];
  //     neighborCell = startCell.get(handler.direction);
  //     if (neighborCell) {
  //       if (neighborCell.visited) {
  //         neighborCell = null;
  //       }
  //     }
  //     if (neighborCell) {
  //       handler.method(neighborCell, startCell)
  //     }
  //     if (counter > 3) {
  //       return;
  //     }
  //     counter++;
  //   }
  //   return neighborCell;

  // };

  // var modifyCells = function(startCell) {
  //   //startCell has many nodes/neighbors
  //   //pick a random neighbor
  //   var neighborCell = pickRandomNeighborCell(startCell);

  //   if (neighborCell) {
  //     startCell.visit();
  //     modifyCells(neighborCell);
  //   }
  // };

























//VIEW:

var mazeView = function() {

};

  //Controller: //////////////////////////////////////////////////

var mazeController = function(model, view) {
  this.model = model;
  this.view = view;
};


maze1 = new Maze();
view1 = new mazeView();
MazeGame = new mazeController(maze1, view1)






    //Recursion:
    //INPUT: currentCell
    //OUTPUT: a modified cellContainer

    //Base Cases:
      //Boundaries
      //Visited


      //PICK random neighbor (North/South/East/West)
      //IF neighbor is visited
        //PICK another neighbor
      //ELSE
        //REMOVE WALLS between currentCell and neighborCell
        //RECURSE(neighborCell)

    //PICK NEIGHBOR
      //RANDOMIZE order of checks
      //ITERATE through each of the checks
        //checkLeft
        //checkRight
        //checkUp
        //checkDown

    //removeWall
      //removes wall between currentCell and neighborCell






  //pickRandomNeighborCell NEEDS to check every direction
    //IF neighborCell has been visited
      //TRY another random direction

    //IF all directions have been tried

  //TWO OPTIONS:
    //OPTION ONE: Check all directions and return all possible routes. Then
    // pick a random one out of the possible routes
    //OPTION TWO: Pick a random direction, see if it's viable, then check
    //another one if it isn't

  //This has two jobs, checking and changing border values
  // var cellCheckLeft = function checkCellLeft(neighborCell, startCell) {
  //   if (neighborCell.visited) {
  //     return null;
  //   } else {
  //     startCell.toggleBorderLeft();
  //     neighborCell.toggleBorderRight();
  //   }
  // };

  var neighborHandlerList = [
    {
      direction: 'left',
      method: removeWallLeft
    },
    {
      direction: 'right',
      method: removeWallRight
    },
    {
      direction: 'up',
      method: removeWallUp
    },
    {
      direction: 'down',
      method: removeWallDown
    }
  ];

  var pickRandomNeighborCell = function(startCell) {
    var handler, neighborCell, len = neighborHandlerList.length, counter = 0;
    while (!neighborCell) {  //find a way to see if all possible paths are found
      handler = neighborHandlerList[Math.floor(Math.random() * len)],
      neighborCell = startCell.get(handler.direction);
      if (neighborCell)
        if (neighborCell.visited) {
          neighborCell = null;
        }
      }
      if (neighborCell) {
        handler.method(neighborCell, startCell)
      }
      if (counter > 3) {
        return;
      }
      counter++;
    }
    return neighborCell;
  };

  var modifyCells = function(startCell) {
    //startCell has many nodes/neighbors
    //pick a random neighbor
    var neighborCell = pickRandomNeighborCell(startCell);

    if (neighborCell) {
      //change borders here

      startCell.visit();
      modifyCells(neighborCell);
    }
  };

  Maze.prototype.randomizeMaze = function() {
    //this refers to the acting MazeGame
    var startCell = this.cellContainer[0];
    var endCell = this.cellContainer[99];
    modifyCells(startCell);
  };






































