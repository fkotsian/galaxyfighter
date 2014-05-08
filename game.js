(function (root) {
  var Asteroids = root.Asteroids = (root.Asteroids || {});

  var Game = Asteroids.Game = function(ctx) {
    this.ctx = ctx;
    this.ship = new Asteroids.Ship();
    this.asteroids = [];
    this.addAsteroids(10);
  }

  Game.DIM_X = 600;
  Game.DIM_Y = 400;
  Game.FPS = 30;

  Game.prototype.addAsteroids = function (numAsteroids) {
    for (var i = 0; i < numAsteroids; i++) {
      var asteroid = Asteroids.Asteroid.randomAsteroid(Game.DIM_X, Game.DIM_Y);
      this.asteroids.push(asteroid);
    }
  }

  Game.prototype.checkCollisions = function() {
    var game = this;
    this.asteroids.forEach(function (asteroid) {
      console.log("try ship: " + game.ship)
      if ( asteroid.isCollidedWith(game.ship) ) {
        game.stop();
        alert("Sorry bro! Dead ship.")
      }
    })
  }

  Game.prototype.draw = function () {
    this.ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);

    this.ship.draw(ctx)
    this.asteroids.forEach(function (asteroid) {
      asteroid.draw(ctx);
    });
  }

  Game.prototype.move = function() {
    this.ship.move();
    this.asteroids.forEach(function (asteroid) {
      asteroid.move();
    });
  }

  Game.prototype.step = function() {
    this.move();
    this.checkCollisions();
    this.draw();
  }

  Game.prototype.start = function() {
    timerId = setInterval(this.step.bind(this), 20);
  }

  Game.prototype.stop = function() {
    clearInterval(timerId);
  }


})(this);