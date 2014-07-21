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
    var px = this.pos[0];
    var py = this.pos[1];
    var position = [px,py];
    
    // future: 3 different weapon types, based on 3 different powerups
    // switch (this.bulletType) {
    // case 0:
    //   break;
    // case 1:
    //   break;
    // case 2:
    //   break;
    // }

    var b = [];
    switch (this.powerupLevel) {
    case 0:
      b.push(new Asteroids.Bullet(game, position, this.bulletVel()) );
      break; 
    case 1:
      var vels = this.splitVels();
      vels.forEach(function(vel) {
        b.push(new Asteroids.Bullet(game, position, vel));
        console.log("making new bullet");
      })
      break;
    default:
      b.push(new Asteroids.Bullet(game, position, this.bulletVel()) );
      // should be fanciest case (if not 0 or 1)
    }
    return b;
  }

  Ship.prototype.bulletVel = function() {
    return [0, Asteroids.Bullet.SPEED];
  }
  
  Ship.prototype.bomberVel = function() {
    return [0, Asteroids.Bullet.SPEED * -1];
  }
  
  Ship.prototype.splitVels = function() {
    var x_spd = Asteroids.Bullet.SPEED;
    var y_spd = Asteroids.Bullet.SPEED;
    var vels = [];
    vels.push([-1 * x_spd, y_spd]);
    vels.push([x_spd, y_spd]);

    return vels;
  }
  
  Ship.prototype.biggestBulletVels = function() {
    // var speed = Asteroids.Bullet.SPEED * -1;
    // divide 180 by numBullets and then take cos of each to get angle
    // generalize this method to spray an arc
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