(function (root) {
  var Asteroids = root.Asteroids = (root.Asteroids || {});

  Function.prototype.inherits = function(superClass) {
    function Surrogate() {};
    Surrogate.prototype = superClass.prototype;
    this.prototype = new Surrogate();
  }

  var Ship = Asteroids.Ship = function () {
    var pos = [ Asteroids.Game.DIM_X / 2, Asteroids.Game.DIM_Y / 2 ];
    var vel = [0,-1];
    Asteroids.MovingObject.call(this, pos, vel, Ship.RADIUS, Ship.COLOR);
    this.direction = 180;
    this.speed = 0;
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
  
  Ship.prototype.rotate = function(degrees) {
    this.direction = (this.direction + degrees) % 360;
    this.vel[0] = Math.sin(this.direction * Asteroids.TO_RADIANS);
    this.vel[1] = Math.cos(this.direction * Asteroids.TO_RADIANS);
  }

  Ship.prototype.power = function(impulse) {
    this.speed += impulse;
    return true;      
  }
  
  Ship.prototype.move = function() {
    this.pos[0] += (this.vel[0] * this.speed);
    this.pos[1] += (this.vel[1] * this.speed);
  }

  Ship.prototype.fireBullet = function(game) {
    if ( this.vel == [0,0] ) {}
    else {
      var locX = this.pos[0];
      var locY = this.pos[1];
      var b = new Asteroids.Bullet( game, [locX, locY], this.bulletVel() );
      return b;
    }
  }

  Ship.prototype.bulletVel = function() {
    var v = this.vel;
    var speed = 10;
    // var speed = Math.sqrt( Math.pow(v[0], 2) + Math.pow(v[1], 2) );
    return [ (v[0] * Asteroids.Bullet.SPEED), (v[1] * Asteroids.Bullet.SPEED) ];
  }

})(this);