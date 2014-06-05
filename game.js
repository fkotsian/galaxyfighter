(function (root) {
  var Asteroids = root.Asteroids = (root.Asteroids || {});

  var Game = Asteroids.Game = function(ctx) {
    this.ctx = ctx;
    this.ship = new Asteroids.Ship();
    this.asteroids = [];
    this.addAsteroids(10);
    this.bullets = [];
  }

  Game.DIM_X = 600;
  Game.DIM_Y = 400;
  Game.FPS = 30;

  Game.prototype.bindKeyHandlers = function() {
    var game = this;
    var bindings = [ ['w', function() { game.ship.power([0,-1]) } ],
                     ['s', function() { game.ship.power([0, 1]) } ],
                     ['a', function() { game.ship.power([-1,0]) } ],
                     ['d', function() { game.ship.power([ 1,0]) } ],
                     ['space', function() { game.fireBullet() } ] ];

    for (var i = 0; i < bindings.length; i++) {
      key( bindings[i][0], bindings[i][1] );
      console.log("Bound handler " + bindings[i]);
    }
  }

  Game.prototype.fireBullet = function() {
    b = this.ship.fireBullet(this);
    this.bullets.push(b);
    console.log("Bullet! " + this.bullets);
  }

  Game.prototype.addAsteroids = function (numAsteroids) {
    for (var i = 0; i < numAsteroids; i++) {
      var asteroid = Asteroids.Asteroid.randomAsteroid(Game.DIM_X, Game.DIM_Y);
      this.asteroids.push(asteroid);
    }
  }

  Game.prototype.checkCollisions = function() {
    var game = this;
    this.asteroids.forEach(function (asteroid) {
      if ( asteroid.isCollidedWith(game.ship) ) {
        game.stop();
        alert("Sorry bro! Dead ship.");
      } // implement BULLET#HITASTEROIDS below ::
      else {
        game.bullets.forEach(function (bullet) {
          if ( asteroid.isCollidedWith(bullet) ) {
            game.removeAsteroid(asteroid);
            game.removeBullet(bullet);
            return true;
          }
        });
      }
    });
  }

  Game.prototype.removeAsteroid = function(a){
    for (var i = 0; i < this.asteroids.length; i++) {
      if ( this.asteroids[i] === a ) {
        this.asteroids.splice(i,1);
      }
    }
  }

  Game.prototype.removeBullet = function(b) {
    for (var i = 0; i < this.bullets.length; i++) {
      if ( this.bullets[i] === b ) {
        this.bullets.splice(i,1);
      }
    }
  }


  Game.prototype.draw = function () {
    this.ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);

    this.ship.draw(ctx)
    this.asteroids.forEach(function (asteroid) {
      asteroid.draw(ctx);
    });
    this.bullets.forEach(function (bullet) {
      bullet.draw(ctx);
    });
  }

  Game.prototype.move = function() {
    this.ship.move();
    this.ship.checkOutOfBounds(Game.DIM_X, Game.DIM_Y);

    this.asteroids.forEach(function (asteroid) {
      asteroid.move();
      asteroid.checkOutOfBounds(Game.DIM_X, Game.DIM_Y);
    });
    var that = this;
    this.bullets.forEach(function (bullet) {
      bullet.move();
      bullet.checkOutOfBounds(Game.DIM_X, Game.DIM_Y);
      // if ( bullet.isOutOfBounds(Game.DIM_X, Game.DIM_Y) ) {
      //   this.removeBullet(bullet);
      // }
    });
  }

  // Game.prototype.checkOutOfBounds = function() {
  //   var game = this;
  //   this.asteroids.forEach(function (asteroid) {
  //     asteroid.checkOutOfBounds(Game.DIM_X, Game.DIM_Y);
  //   });
  //   this.ship.checkOutOfBounds(Game.DIM_X, Game.DIM_Y);
  // }

  Game.prototype.checkForWin = function() {
    if (this.asteroids.length === 0){
      clearInterval(gameTimerId)
      alert("You win! Refresh the page to play again!");
    }
  }

  Game.prototype.step = function() {
    this.move();
    // this.checkOutOfBounds();
    this.checkCollisions();
    this.draw();
    this.checkForWin();
  }

  Game.prototype.start = function() {
    this.bindKeyHandlers();
    alert("Use w,s,a,d to move and Space to fire!");
    gameTimerId = setInterval(this.step.bind(this), Game.FPS);
    // asteroidTimerId = setInterval(function() { this.addAsteroids(2) }, 2000);
  }

  Game.prototype.stop = function() {
    clearInterval(gameTimerId);
    // clearInterval(asteroidTimerId);
  }


})(this);