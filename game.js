(function (root) {
  var Asteroids = root.Asteroids = (root.Asteroids || {});

  var Game = Asteroids.Game = function(ctx) {
    this.ctx = ctx;
    this.ship = new Asteroids.Ship();
    this.asteroids = [];
    this.addAsteroids(10);
    this.bullets = [];
    this.level = 1;
    
    this.img = new Image();
    this.img.src = 'background.jpg';
  }

  Game.DIM_X = 1440;
  Game.DIM_Y = 600;
  Asteroids.TO_RADIANS = (Math.PI / 180);
  Game.FPS = 30;

  Game.prototype.bindKeyHandlers = function() {
    var game = this;
    var bindings = [ ['w', function() { game.ship.power(2) } ],
                     ['s', function() { game.ship.power(-2) } ],
                     ['a', function() { game.ship.rotate(15) } ],
                     ['d', function() { game.ship.rotate(-15) } ],
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
    this.ctx.drawImage(this.img, 0, 0, Game.DIM_X, Game.DIM_Y);

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
    });
  }

  Game.prototype.checkForWin = function() {
    if (this.asteroids.length === 0){
      clearInterval(gameTimerId)
      alert("You win! Refresh the page to play again!");
    }
  }

  Game.prototype.step = function() {
    this.move();
    this.checkCollisions();
    this.draw();
    this.checkForWin();
  }

  Game.prototype.start = function() {
    this.bindKeyHandlers();
    alert("Get ready! Use w,s,a,d to move and Space to fire!");
    setTimeout(function(){}, 2000);
    gameTimerId = setInterval(this.step.bind(this), Game.FPS);
    var that = this;
    asteroidTimerId = setInterval(function() { that.addAsteroids(that.level) }, 2000);
    levelTimerId = setInterval(function() { 
      that.level += 1;
      alert("Level up! You are now level " + level + ". \nPrepare for more asteroids!");
    }, 60000);
  }

  Game.prototype.stop = function() {
    clearInterval(gameTimerId);
    clearInterval(asteroidTimerId);
    clearInterval(levelTimerId);
  }


})(this);