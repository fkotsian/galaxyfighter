(function (root) {
  var Asteroids = root.Asteroids = (root.Asteroids || {});

  Function.prototype.inherits = function(superClass) {
    function Surrogate() {};
    Surrogate.prototype = superClass.prototype;
    this.prototype = new Surrogate();
  }

  var Ship = Asteroids.Ship = function () {
    var pos = [ Asteroids.Game.DIM_X / 2, Asteroids.Game.DIM_Y / 5 * 4 ];
    var vel = [0, 0];
    Asteroids.MovingObject.call(this, pos, vel, Ship.RADIUS, Ship.COLOR);
    this.direction = 180;
    this.speed = 5;
    this.powerups = {};
    this.resetPowerups();
    this.powerupLevel = 0;
    this.bulletType = 0;
    
    this.img = new Image();
    this.img.src = 'images/ships/spaceship.png';
  }
  Ship.inherits(Asteroids.MovingObject);

  Ship.RADIUS = 20;
  Ship.COLOR = 'black';
  
  Ship.prototype.draw = function(ctx) {
    ctx.save();
    ctx.translate(this.pos[0], this.pos[1]);
    ctx.rotate(-(this.direction + 180) * Asteroids.TO_RADIANS);
    ctx.drawImage(this.img, -this.radius, -this.radius);
    ctx.restore();
  }

  Ship.prototype.power = function(impulse) {
    this.vel[0] = impulse[0];
    this.vel[1] = impulse[1];
    return true;
  }
  
  Ship.prototype.move = function() {
    this.pos[0] += (this.vel[0] * this.speed);
    this.pos[1] += (this.vel[1] * this.speed);
  }
  
  Ship.prototype.resetPowerups = function() {
    ship = this;
    Asteroids.Powerup.COLORS.forEach(function(color) {
      ship.powerups[color] = 0;
    })
  }
  
  Ship.prototype.gainPowerup = function(powerupColor) {
    var currPowerups = this.powerups[powerupColor];
    this.resetPowerups();
    this.powerupLevel = this.powerups[powerupColor] = currPowerups + 1;
    this.bulletType = Asteroids.Powerup.COLORS.indexOf(powerupColor);
    console.log("Now powerup level: " + this.powerupLevel);
  }

  Ship.prototype.fireBullet = function(game) {
    var locX = this.pos[0];
    var locY = this.pos[1];
    
    // future: 3 different weapon types, based on 3 different powerups
    // switch (this.bulletType) {
    // case 0:
    //   break;
    // case 1:
    //   break;
    // case 2:
    //   break;
    // }

    switch (this.powerupLevel) {
    case 0:
      var b1 = new Asteroids.Bullet( game, [locX, locY], this.bulletVel() );
      var b = [b1];
      break;
    case 1:
      var b1 = new Asteroids.Bullet( game, [locX, locY], this.bulletVel() );
      var b2 = new Asteroids.Bullet( game, [locX, locY], this.bulletVel() );
      var b = [b1, b2];
      break;
    default:
      var b1 = new Asteroids.Bullet( game, [locX, locY], this.bulletVel() );
      var b = [b1];
      // should be fanciest case (if not 0 or 1)
    }
    return b;
  }

  Ship.prototype.bulletVel = function() {
    return [0, Asteroids.Bullet.SPEED * -1];
  }
  
  Ship.prototype.correctOutOfBounds = function(xBound, yBound) {
    if (this.pos[0] > xBound ) {
      this.pos[0] -= xBound;
    } else if (this.pos[0] < 0) {
      this.pos[0] += xBound;
    }
    if (this.pos[1] > yBound) {
      this.pos[1] = yBound - this.radius;
      this.vel[1] = 0;
    } else if (this.pos[1] < 0) {
      this.pos[1] = 0 + this.radius;
      this.vel[1] = 0;
    }
  }

})(this);