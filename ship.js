(function (root) {
  var Asteroids = root.Asteroids = (root.Asteroids || {});

  Function.prototype.inherits = function(superClass) {
    function Surrogate() {};
    Surrogate.prototype = superClass.prototype;
    this.prototype = new Surrogate();
  }

  var Ship = Asteroids.Ship = function () {
    var pos = [ Asteroids.Game.DIM_X / 2, Asteroids.Game.DIM_Y / 2 ];
    var vel = [.5,.5];
    Asteroids.MovingObject.call(this, pos, vel, Ship.RADIUS, Ship.COLOR);
  }
  Ship.inherits(Asteroids.MovingObject);

  Ship.RADIUS = 10;
  Ship.COLOR = 'black';

  Ship.prototype.power = function(impulse) {
    this.vel[0] += impulse;
    this.vel[1] += impulse;
    return true;
  }

  Ship.prototype.fireBullet = function(game) {
    var locX = this.pos[0];
    var locY = this.pos[1];
    var b = new Asteroids.Bullet( game, [locX, locY], this.bulletVel());
    return b;
  }

  Ship.prototype.bulletVel = function() {
    var v = this.vel;
    var speed = Math.sqrt( Math.pow(v[0], 2) + Math.pow(v[1], 2) );
    return [ (v[0] / speed * 10), (v[1] / speed * 10) ];
  }




})(this);