(function (root) {
  var Asteroids = root.Asteroids = (root.Asteroids || {});

  Function.prototype.inherits = function(superClass) {
    function Surrogate() {};
    Surrogate.prototype = superClass.prototype;
    this.prototype = new Surrogate();
  }

  var Ship = Asteroids.Ship = function () {
    var pos = [ Asteroids.Game.DIM_X / 2, Asteroids.Game.DIM_Y / 2 ];
    var vel = [0,0];
    Asteroids.MovingObject.call(this, pos, vel, Ship.RADIUS, Ship.COLOR);
    this.img = new Image();
    this.img.src = 'spaceship.png';
  }
  Ship.inherits(Asteroids.MovingObject);

  Ship.RADIUS = 20;
  Ship.COLOR = 'black';
  
  Ship.prototype.draw = function(ctx) {
    ctx.drawImage(this.img, this.pos[0], this.pos[1]);
  }

  Ship.prototype.power = function(impulse) {
    this.vel[0] += impulse[0];
    this.vel[1] += impulse[1];
    return true;
  }

  Ship.prototype.fireBullet = function(game) {
    if ( this. vel == [0,0] ) {}
    else {
      var locX = this.pos[0];
      var locY = this.pos[1];
      var b = new Asteroids.Bullet( game, [locX, locY], this.bulletVel() );
      return b;
    }
  }

  Ship.prototype.bulletVel = function() {
    var v = this.vel;
    var speed = Math.sqrt( Math.pow(v[0], 2) + Math.pow(v[1], 2) );
    return [ (v[0] / speed * 10), (v[1] / speed * 10) ];
  }

})(this);