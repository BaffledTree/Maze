$(document).ready(function() {
  // This is called after the document has loaded in its entirety
  // This guarantees that any elements we bind to will exist on the page
  // when we try to bind to them

  // See: http://docs.jquery.com/Tutorials:Introducing_$(document).ready()

//arrowLeft = 37
//arrowRight = 39
//arrowUp = 38
//arrowDown = 40

//KeyW = 87
//KeyA = 65
//KeyS = 83
//KeyD = 68

  maze = new Maze();
  view = new mazeView();
  MazeGame = new mazeController(maze, view);
  MazeGame.model.initialize();
  MazeGame.seedModel();
  MazeGame.model.randomizeMaze();
  MazeGame.display(0);
  MazeGame.addPlayer();


  var Player = function() {
    this.currentIndex = 0;
    this.avatar = $('.player');
    this.active = true;
  }

  Player.prototype.checkLeft = function() {
    if (this.avatar.parent().css('border-left').match('none')) {
      return true;
    } else {
      return false;
    }
  };

  Player.prototype.checkRight = function() {
    if (this.avatar.parent().css('border-right').match('none')) {
      return true;
    } else {
      return false;
    }
  }

  Player.prototype.checkUp = function() {
    if (this.avatar.parent().css('border-top').match('none')) {
      return true;
    } else {
      return false;
    }
  };

  Player.prototype.checkDown = function() {
    if (this.avatar.parent().css('border-bottom').match('none')) {
      return true;
    } else {
      return false;
    }
  };

  Player.prototype.checkDirection = function(direction) {
    var clear;
    switch (direction) {
      case 'left':
        clear = this.checkLeft();
        return clear;
      case 'right':
        clear = this.checkRight();
        return clear;
      case 'up':
        clear = this.checkUp();
        return clear;
      case 'down':
        clear = this.checkDown();
        return clear;
    }
  };

  Player.prototype.changeCurrentIndex = function(direction) {
    switch (direction) {
      case 'left':
        this.currentIndex--;
        break;
      case 'right':
        this.currentIndex++;
        break;
      case 'up':
        this.currentIndex -= 10;
        break;
      case 'down':
        this.currentIndex += 10;
        break;
    }
  };

  Player.prototype.moveLeft = function(direction) {
    if (this.checkDirection(direction)) {
      this.changeCurrentIndex(direction);
      $destinationCell = $($('.maze-container').children()[this.currentIndex]);
      $destinationCell.append(this.avatar);
    }
  };

  Player.prototype.moveRight = function(direction) {
    if (this.checkDirection(direction)) {
      this.changeCurrentIndex(direction);
      $destinationCell = $($('.maze-container').children()[this.currentIndex]);
      $destinationCell.append(this.avatar);
    }
  };

  Player.prototype.moveUp = function(direction) {
    if (this.checkDirection(direction)) {
      this.changeCurrentIndex(direction);
      $destinationCell = $($('.maze-container').children()[this.currentIndex]);
      $destinationCell.append(this.avatar);
    }
  };

  Player.prototype.moveDown = function(direction) {
    if (this.checkDirection(direction)) {
      this.changeCurrentIndex(direction);
      $destinationCell = $($('.maze-container').children()[this.currentIndex]);
      $destinationCell.append(this.avatar);
    }
  };

  Player.prototype.moveDirection = function(direction) {
    if (this.active) {
      switch (direction) {
        case 'left':
          this.moveLeft(direction);
          break;
        case 'right':
          this.moveRight(direction);
          break;
        case 'up':
          this.moveUp(direction);
          break;
        case 'down':
          this.moveDown(direction);
          break;
      }
    }
  };

  Player.prototype.checkWin = function() {
    //if player wins, disable movement keys until new maze is created
    if (this.currentIndex === 99) {
      this.active = false;
    }
  };

  $(this).keydown(function(event) {
    var arrowLeft = 37;
    var arrowRight = 39;
    var arrowUp = 38;
    var arrowDown = 40;
    var direction;

    switch (event.keyCode) {
      case arrowLeft:
        direction = 'left';
        break;
      case arrowRight:
        direction = 'right';
        break;
      case arrowUp:
        direction = 'up';
        break;
      case arrowDown:
        direction = 'down';
        break;
    }

    player.moveDirection(direction);
    player.checkWin();
  });

  player = new Player();

  $('.save-game').on('click', function(event) {

    if ($('.all-mazes').children().length > 1) {
      $('.save-game').attr("disabled", "disabled");
      return;
    } else {
      $('.save-game').removeAttr("disabled");
    }

    saveMaze = MazeGame.model;
    saveMaze.clearReferences();
    saveMazeJson = JSON.stringify(saveMaze);

    user_id = $('.save-game').css('formaction');
    var url = '/users/'+ user_id +'/save';
    var ajaxSaveRequest = $.ajax({
      url: url,
      type: 'POST',

      data: {content: saveMazeJson},
    });

    ajaxSaveRequest.done(function() {
      // alert('Maze has been saved');
    });
  });

  $('.new-maze').on('click', function(event) {
    maze = new Maze();
    view = new mazeView();
    MazeGame = new mazeController(maze, view);
    MazeGame.model.initialize();
    MazeGame.seedModel();
    MazeGame.model.randomizeMaze();
    $('.maze-container').remove();
    $('.all-mazes').append('<div class="maze-container" id='+0+'></div>')

    MazeGame.display(0);
    MazeGame.addPlayer();

    player.currentIndex = 0;
    player.avatar = $('.player');
    player.active = true;
  });

  $('.my-mazes').on('click', function(event) {
    event.preventDefault();
    var user_id = $('.mazes').attr('form action');
    var url = '/users/'+user_id+'/mazes';
    $('#0').remove();

    $.ajax({
      url: url,
      type: 'GET',

    }).done(function(response) {
      console.log(response);
      response.mazes

      for (var mazesIndex = 0; mazesIndex < response.mazes.length; mazesIndex++) {
        var mazeCount = $('.all-mazes').children().length;
        $('.all-mazes').append('<div class="maze-container" id='+mazeCount+'></div>');
        view = new mazeView();
        maze = JSON.parse(response.mazes[mazesIndex]);
        mazeLayout = new mazeController(maze, view);
        mazeLayout.display(mazeCount);
      }

    });
  });





});






