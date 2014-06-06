(function (root) {
  var Asteroids = root.Asteroids = (root.Asteroids || {});

  Function.prototype.inherits = function(superClass) {
    function Surrogate() {};
    Surrogate.prototype = superClass.prototype;
    this.prototype = new Surrogate();
  }

  var Bullet = Asteroids.Bullet = function (game, pos, vel) {
    Asteroids.MovingObject.call(this, pos, vel, Bullet.RADIUS, Bullet.COLOR);
    this.game = game; 
  };

  Bullet.inherits(Asteroids.MovingObject);

  Bullet.COLOR = 'yellow';
  Bullet.RADIUS = 2;
  Bullet.SPEED = 10;
  
  Bullet.prototype.correctOutOfBounds = function(xBound, yBound) {
    this.game.removeBullet(this);
  }

})(this);