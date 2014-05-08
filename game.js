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
    console.log("Binding handlers");
    var bindings = [ ['up', function() { this.ship.power.call(this.ship, 5) } ],
                     ['space', this.ship.fireBullet] ];

    for (var i = 0; i < bindings.length; i++) {
      key( bindings[i][0], bindings[i][1] );
      console.log("Bound handler " + bindings[i]);
      console.log("THIS: " + this.ship.power(1));
    }
  }

  Game.prototype.fireBullet = function() {
    b = this.ship.fireBullet();
    this.bullets.push(b);
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
        alert("Sorry bro! Dead ship.")
      }
    })
  }

  // Game.prototype.checkOutOfBounds = function() {
  //   var game = this;
  //   this.asteroids.forEach(function (asteroid) {
  //     asteroid.checkOutOfBounds(Game.DIM_X, Game.DIM_Y);
  //   });
  //   this.ship.checkOutOfBounds(Game.DIM_X, Game.DIM_Y);
  // }

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
    this.bullets.forEach(function (bullet) {
      bullet.move();
      if ( bullet.isOutOfBounds(Game.DIM_X, Game.DIM_Y) ) {
        game.removeBullet(bullet);
      }
    });
  }

  Game.prototype.removeBullet = function(b) {
    for (var i = 0; i < this.bullets.length; i++) {
      if ( this.bullets[i] === b ) {
        this.bullets.delete[i];
      }
    }
  }

  Game.prototype.step = function() {
    this.move();
    // this.checkOutOfBounds();
    this.checkCollisions();
    this.draw();
  }

  Game.prototype.start = function() {
    this.bindKeyHandlers();
    timerId = setInterval(this.step.bind(this), 20);
  }

  Game.prototype.stop = function() {
    clearInterval(timerId);
  }


})(this);