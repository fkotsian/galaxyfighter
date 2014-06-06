(function (root) {
  var Asteroids = root.Asteroids = (root.Asteroids || {});

  var Game = Asteroids.Game = function(ctx) {
    this.ctx = ctx;
    this.ship = new Asteroids.Ship();
    this.asteroids = [];
    this.addAsteroids(10);
    this.bullets = [];
    this.level = 1;
    this.lives = 3;
    this.points = 0;
    
    this.img = new Image();
    this.img.src = 'images/backgrounds/background.jpg';
  }

  Game.DIM_X = Asteroids.DIM_X = 1440;
  Game.DIM_Y = Asteroids.DIM_Y =  600;
  Asteroids.TO_RADIANS = (Math.PI / 180);
  Game.FPS = 30;

  Game.prototype.bindKeyHandlers = function() {
    var game = this;
    var bindings = [ ['w', function() { game.ship.power(1) } ],
                     ['s', function() { game.ship.power(-1) } ],
                     ['a', function() { game.ship.rotate(7.5) } ],
                     ['d', function() { game.ship.rotate(-7.5) } ],
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
        if (game.lives > 0) {
          game.lives -= 1;
          game.removeAsteroid(asteroid);
          alert("Sorry bro! Dead ship.\nLives left: " + game.lives);
          game.ship = new Asteroids.Ship();
        } else {
          game.stop();
          alert("Game over! :(\nYour score: " + game.points + "\nRefresh to play again!");
        }
      } // implement BULLET#HITASTEROIDS below ::
      else {
        game.bullets.forEach(function (bullet) {
          if ( asteroid.isCollidedWith(bullet) ) {
            game.givePoints(asteroid.radius);
            game.removeAsteroid(asteroid);
            game.removeBullet(bullet);
            return true;
          }
        });
      }
    });
  }
  
  Game.prototype.givePoints = function(asterRad) {
    this.points += (this.level * Math.round(100/ asterRad) * 5);
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
    this.drawLives();
    this.drawLevel();
    this.drawPoints();
  }
  
  Game.prototype.drawLives = function() {    
    for (var i = 0; i < this.lives; i++) {
      this.ctx.drawImage(this.ship.img, (0 + 45*i), 0)      
    }
  }
  
  Game.prototype.drawLevel = function() {
    this.ctx.fillText("Level " + this.level, 0, 65);    
  }
  
  Game.prototype.drawPoints = function() {
    this.ctx.fillText("SCORE: " + this.points, 0, 90);
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
  
  Game.prototype.checkLevelUp = function() {
    var shipCheck = this.level % 8;
    var bgCheck = this.level % 6;
    if (shipCheck === 0) {
      var shipNum = this.level / 8;
      switch (shipNum) {
      case 1:
        alert("New ship!")
        this.ship.img.src = 'images/ships/spaceship2.png';
        break;
      case 2:
        this.ship.img.src = 'images/ships/spaceship3.png';
        break;        
      case 3:
        this.ship.img.src = 'images/ships/spaceship4.png';
        break;        
      case 4:
        this.ship.img.src = 'images/ships/spaceship8.png';
        break;                
      default: 
        this.ship.img.src = 'images/ships/spaceship3.png';
      }
    }
    if (bgCheck === 0) {
      var bgNum = this.level / 6;
      switch (bgNum) {
      case 1:
        this.img.src = 'images/backgrounds/background2.jpg';
        break;
      case 2:
        this.img.src = 'images/backgrounds/background3.jpg';
        break;        
      case 3:
        this.img.src = 'images/backgrounds/background4.jpg';
        break;        
      case 4:
        this.img.src = 'images/backgrounds/background5.jpg';
        break;                
      case 5:
        this.img.src = 'images/backgrounds/background6.jpg';
        break;                
      case 6:
        this.img.src = 'images/backgrounds/background7.jpg';
        break;                
      case 7:
        this.img.src = 'images/backgrounds/background8.jpg';
        break;                
      default: 
        this.img.src = 'images/backgrounds/background.jpg';
      }
    }
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
      alert("Level up! You are now level " + that.level + ". \nPrepare for more asteroids!");
      that.checkLevelUp();
    }, 60000);
  }

  Game.prototype.stop = function() {
    clearInterval(gameTimerId);
    clearInterval(asteroidTimerId);
    clearInterval(levelTimerId);
  }


})(this);